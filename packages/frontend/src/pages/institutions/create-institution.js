import { useRef, useState } from "react";
import { Header, Sidebar } from '../../components';
import { Form } from "@unform/web";
import { Input } from "../../components/form";
import {
    institutionCreationFormValidationSchema,
    setErrorsFromForm,
    validateForm,
  } from "../../validations";
import * as fireToast from '../../utils/fire-toast';
import api from '../../services/api';
import messages from "../../misc/messages";
import { useNavigate } from "react-router-dom";
import httpStatus from "../../misc/http-status";
import { useParams } from "react-router-dom";

const CreateInstitution = () => {
    const navigate = useNavigate();
    const institutionCreationFormRef = useRef(null);
    const [backEndError, setBackEndError] = useState(null);

    const handleInstitutionCreationSubmit = (data) => {
        setBackEndError(null);
        validateForm({ 
          data, 
          formRef: institutionCreationFormRef, 
          schema:  institutionCreationFormValidationSchema,
        })
        .then(result => {
          api.post('/institutions', data)
            .then(response => {
              fireToast.success(messages.api.institutions.create_institution);
              navigate(`/institutions/${response.data.id}/list-users`);
            })
            .catch(error => {
              if(error.response.status === httpStatus.BAD_REQUEST) {
                setBackEndError(error.response.data.message);
              }
            })
        })
         .catch(error => {
          setErrorsFromForm({ errors: error, formRef: institutionCreationFormRef });
        })
    }

    return (
      <>
        <Header/>
        <Sidebar/>
        <div id="page" className="ml-52 mt-10 h-screen flex justify-center items-center">
            <div className="w-full max-w-sm">
                <Form className="shadow-md bg-white rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleInstitutionCreationSubmit} ref={institutionCreationFormRef}>
                    <div className="mb-4">
                        <Input name="name" label="Nome" placeholder="Nome"/>
                    </div>
                    <div className="mb-4">
                        <Input name="cnpj" label="CNPJ" placeholder="CNPJ"/>
                    </div>
                    <div className="mb-4">
                        <Input name="phone" label="Celular" placeholder="Celular"/>
                    </div>
                    {
                        backEndError &&
                        <small className="error text-red-400">{`*${backEndError}`}</small>
                    }
                    <div className="flex items-center justify-end">
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
  
  export default CreateInstitution;
  