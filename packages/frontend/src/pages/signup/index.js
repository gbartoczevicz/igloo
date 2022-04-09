import { useRef, useState } from "react";
import { Form } from "@unform/web";
import { Input } from "../../components/form";
import {
  signupFormValidationSchema,
  setErrorsFromForm,
  validateForm,
} from "../../validations";
import * as fireToast from '../../utils/fire-toast';
import api from '../../services/api';
import messages from "../../misc/messages";
import { useNavigate } from "react-router-dom";
import httpStatus from "../../misc/http-status";

const Signup = () => {
  const navigate = useNavigate();
  const signupFormRef = useRef(null);
  const [backEndError, setBackEndError] = useState(null);

  const handleSignupSubmit = (data) => {
    setBackEndError(null);
    validateForm({ 
      data, 
      formRef: signupFormRef, 
      schema:  signupFormValidationSchema,
    })
    .then(result => {
      api.post('/users', data)
        .then(response => {
          fireToast.success(messages.api.success.signup);
          navigate('/');
        })
        .catch(error => {
          if(error.response.status === httpStatus.BAD_REQUEST) {
            setBackEndError(error.response.data.message);
          }
        })
    })
     .catch(error => {
      setErrorsFromForm({ errors: error, formRef: signupFormRef });
    })
  }

  return (
    <>
      <div className="flex flex-wrap justify-center mt-20">
        <div className="w-full max-w-sm">
          <Form className="shadow-md bg-white rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSignupSubmit} ref={signupFormRef}>
            <div className="mb-4">
              <Input name="name" label="Nome" placeholder="Nome"/>
            </div>
			      <div className="mb-4">
              <Input name="surname" label="Sobrenome" placeholder="Sobrenome"/>
            </div>
            <div className="mb-4">
              <Input name="phone" label="Celular" placeholder="Celular"/>
            </div>
            <div className="mb-4">
              <Input name="email" label="Email" placeholder="Email"/>
            </div>
            <div className="mb-4">
              <Input type="password" name="password" label="Senha" placeholder="Senha"/>
            </div>
            <div className="mb-4">
              <Input type="password" name="confirmPassword" label="Confirmar senha" placeholder="Senha"/>
            </div>
            {
              backEndError &&
              <small className="error text-red-400">{`*${backEndError}`}</small>
            }
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Enviar
              </button>
            </div>
          </Form>
        </div>
	    </div>
    </>
);
}

export default Signup;
