import { useRef, useState } from "react";
import { Form } from "@unform/web";
import { Input } from "../../components/form";
import {
  signinFormValidationSchema,
  setErrorsFromForm,
  validateForm,
} from "../../validations";
import api from '../../services/api';
import { useAuth } from "../../store/auth";
import httpStatus from "../../misc/http-status";
import { useNavigate } from 'react-router-dom';
import loginImage from '../../images/young-man-taking-notes.png';
import igloo from '../../images/iglooText.png';


const Signin = () => {
  const signinFormRef = useRef(null);
  const [backEndError, setBackEndError] = useState(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

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
          signIn(response.data);
          navigate('/home');
          //getUser(response.data.userId);
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
      <div className="flex flex-wrap justify-center my-auto h-screen">
        <div className="flex-none scale-75 my-auto">
          <img src={loginImage} />
        </div>
        <div className="w-full max-w-sm my-auto">
          <img className="mx-auto" src={igloo} />
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
              <button className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                Sign In
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-teal-600 hover:text-teal-800" href="/forgot-password">
                Esqueceu a senha?
              </a>
            </div>
          </Form>
          <a className="inline-block align-baseline font-bold text-sm text-teal-600 hover:text-teal-800" href="/signup">
            Crie uma nova conta
          </a>
        </div>
	    </div>
    </>
  );
}

export default Signin;
