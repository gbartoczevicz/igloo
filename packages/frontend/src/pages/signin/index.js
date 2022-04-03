import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "@unform/web";
import { Input } from "../../components/form";
import {
  loginFormValidationSchema,
  setErrorsFromForm,
  validateForm,
} from "../../validations";
import * as fireToast from '../../utils/fireToast';
import api from '../../services/api';

const Signin = () => {
  const navigate = useNavigate();
  const loginFormRef = useRef(null);

  const handleLogin = (data) => {
    validateForm({ 
      data, 
      formRef: loginFormRef, 
      schema:  loginFormValidationSchema,
    })
    .then(result => {
      console.log("DATA: ", data)
      api.post('/sessions', data)
        .then(response => {
          console.log("Sucesso")
          fireToast.success('Bateria criada com sucesso!');
        })
        .catch(errors => {
          console.log("Erro backend")
          // set back end errors
        })
    })
     .catch(error => {
      console.log("Erro frontend: ", error)
      setErrorsFromForm({ errors: error, formRef: loginFormRef });
    })
  }

  return (
    <>
      <div className="flex flex-wrap justify-center mt-20">
        <div className="w-full max-w-sm">
          <Form onSubmit={handleLogin} ref={loginFormRef} className="shadow-md bg-white rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <Input name="email" /*type="email"*/ label="Email" placeholder="Email"/>
            </div>
            <div className="mb-6">
              <Input name="password" type="password" label="Senha" placeholder="Senha"/>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" /* onClick={() => navigate('/courses')} */>
                Sign In
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700" href="/forgot-password">
                Esqueceu a senha?
              </a>
            </div>
          </Form>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700" href="/signup">
            Crie uma nova conta
          </a>
        </div>
	    </div>
    </>
  );
}

export default Signin;
