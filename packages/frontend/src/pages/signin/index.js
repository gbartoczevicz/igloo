import { useRef, useState } from "react";
import { Form } from "@unform/web";
import { Input } from "../../components/form";
import {
  signinFormValidationSchema,
  setErrorsFromForm,
  validateForm,
} from "../../validations";
import api from '../../services/api';
import * as fireToast from '../../utils/fire-toast';
import { useAuth } from "../../store/auth";
import httpStatus from "../../misc/http-status";

const Signin = () => {
  const signinFormRef = useRef(null);
  const [backEndError, setBackEndError] = useState(null);

  const { signIn } = useAuth();

  const handleSigninSubmit = (data) => {
    setBackEndError("");
    validateForm({ 
      data, 
      formRef: signinFormRef, 
      schema:  signinFormValidationSchema,
    })
    .then(result => {
      api.post('/sessions', data)
        .then(response => {
          fireToast.success('Bem vindo! ', response.data);
          signIn(response.data);
        })
        .catch(error => {
          if(error.response.status === httpStatus.UNAUTHORIZED) {
            setBackEndError("Email ou senha inválidos.");
          }
        })
    })
     .catch(error => {
      setErrorsFromForm({ errors: error, formRef: signinFormRef });
    })
  }

  return (
    <>
      <div className="flex flex-wrap justify-center mt-20">
        <div className="w-full max-w-sm">
          <Form className="shadow-md bg-white rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSigninSubmit} ref={signinFormRef} >
            <div className="mb-4">
              <Input name="email" /*type="email"*/ label="Email" placeholder="Email"/>
            </div>
            <div className="mb-6">
              <Input name="password" type="password" label="Senha" placeholder="Senha"/>
            </div>
            {
              backEndError &&
              <small className="error text-red-400">{`*${backEndError}`}</small>
            }
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
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
