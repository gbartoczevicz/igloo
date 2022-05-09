import { useEffect, useRef, useState } from 'react';
import PageLayout from '../../components/page-layout';
import { Input } from "../../components/form";
import { Form } from "@unform/web";
import * as fireToast from '../../utils/fire-toast';
import messages from '../../misc/messages';
import api from '../../services/api';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Projects = () => {
    const [loading, setLoading] = useState(true);
    const [backEndError, setBackEndError] = useState(false);
    const [user, setUser] = useState(null);
    const { setName } = useAuth();
    const profileEditionRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        getProfileInfo();
    },[]);

    const getProfileInfo = () => {
        api.get('/profile')
          .then(response => {
            profileEditionRef.current.setData(response.data);
            return setUser(response.data);
          })
          .catch(error => {
            console.log(error);
          })
    }

    const handleProfileEditionSubmit = (data) => {
        api.put('/profile', data)
            .then(response => {
              setName(`${data.name}${data.surname ? ` ${data.surname}` : ''}`);
              navigate('/profile');
              return fireToast.success(messages.api.account.edit_account);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <PageLayout>
            <div className='flex justify-center items-center'>
                <div className="w-full max-w-sm">
                    <Form className="shadow-md bg-white rounded px-8 pt-6 pb-8 mb-4"
                        onSubmit={handleProfileEditionSubmit} ref={profileEditionRef}>
                        <div className="mb-4">
                            <Input name="name" label="Nome" placeholder="Nome" />
                        </div>
                        <div className="mb-4">
                            <Input name="surname" label="Sobrenome" placeholder="Sobrenome" />
                        </div>
                        <div className="mb-4">
                            <Input name="phone" label="Celular" placeholder="Celular" />
                        </div>
                        <div className="mb-4">
                            <Input name="email" label="Email" placeholder="Email" />
                        </div>
                        <div className="mb-4">
                            <Input type="password" name="password" label="Senha" placeholder="Senha" />
                        </div>
                        <div className="mb-4">
                            <Input type="password" name="confirmPassword" label="Confirmar senha" placeholder="Senha" />
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
        </PageLayout>
    );
}

export default Projects;
