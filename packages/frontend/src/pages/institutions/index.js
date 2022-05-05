import { useEffect, useState } from 'react';
import { Header, Sidebar } from '../../components';
import api from '../../services/api';
import * as fireToast from '../../utils/fire-toast';

const Institutions = () => {
  const [institutions, setInstitutions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInstitutions();
  }, []);

  const getInstitutions = () => {
    api.get('/institutions')
      .then(response => {
        console.log("RESPONSE: ", response)
        setInstitutions(response.data);
        setLoading(false);
      })
      .catch(error => {
        fireToast.success(error);
      })
  }

  const createInstitution = () => {
    return (
      <div className='bg-gray-700 h-36' key={0}>
        <div id="institution-info" className="p-3">
          <span>Criar instituição</span>
        </div>
      </div>
      )
  }

  const renderInstitutions = () => {
    let renderedInstitutions = institutions?.map((inst, index) => {
      return (       
        <div className='bg-gray-700 h-36' key={inst.id}>
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
      <div className='bg-gray-500 p-5 grid grid-cols-4 gap-4'>
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
          <div id="page" className='ml-52 mt-10 h-100'>
            {renderInstitutions()}
          </div>
        )
      }
    </div>
    );
  }
  
  export default Institutions;
  