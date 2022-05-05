import { useEffect, useState } from 'react';
import { Header, Sidebar } from '../../components';
import api from '../../services/api';
import * as fireToast from '../../utils/fire-toast';
import { Link } from "react-router-dom";

const Institutions = () => {
  const [institutions, setInstitutions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInstitutions();
  }, []);

  const getInstitutions = () => {
    api.get('/institutions')
      .then(response => {
        setInstitutions(response.data);
        setLoading(false);
      })
      .catch(error => {
        fireToast.success(error);
      })
  }

  const createInstitution = () => {
    return (
      <div className='bg-gray-400 h-24 rounded-md' key={0}>
        <div id="institution-info" className="p-3">
          <Link to="/institutions/create">Criar instituição</Link>
        </div>
      </div>
      )
  }

  const renderInstitutions = () => {
    let renderedInstitutions = institutions?.map((inst, index) => {
      return (       
        <div className='bg-gray-400 h-24 rounded-md' key={inst.id}>
          <div id="institution-info" className="p-3">
            <ul>
              <li>{inst.name}</li>
              <li>CNPJ: {inst.cnpj}</li>
              <li>Telefone: {inst.phone}</li>
            </ul>
          </div>
        </div>
      )
    });

    return (
      <div className='p-5 grid grid-cols-4 gap-4'>
        {createInstitution()}
        {renderedInstitutions}
      </div>
    )
  }

  return (
    <div>
      <Header/>
      <Sidebar/>
      {
        !loading && (
          <div id="page" className='ml-52 mt-10 h-screen'>
            {renderInstitutions()}
          </div>
        )
      }
    </div>
    );
  }
  
  export default Institutions;
  