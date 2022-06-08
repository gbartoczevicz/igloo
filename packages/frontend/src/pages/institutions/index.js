import { useEffect, useState } from 'react';
import { Header, Sidebar } from '../../components';
import api from '../../services/api';
import { Link } from "react-router-dom";
import PageLayout from '../../components/page-layout';

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
        console.log("INSTITUIÇõES: ", response.data)
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const createInstitution = () => {
    return (
      <div className='bg-gray-400 h-24 rounded-md' key={0}>
        <Link to="/institutions/create">
          <div id="institution-info" className="p-3 h-full">
            Criar instituição
          </div>
        </Link>
      </div>
      )
  }

  const AuthenticatedLink = ({children, isAdmin, id}) => {
    if(isAdmin) {
      return <Link to={`/institutions/${id}`} >{children}</Link>;
    }

    return <>{children}</>;
  }

  const renderInstitutions = () => {
    let renderedInstitutions = institutions?.map((inst) => {
      const { userRole, name, id } = inst;
      let roleTitle =  "";
      let isAdmin = false;
      switch (userRole) {
        case 'professor':
          roleTitle = "Professor";
          break;
        case 'student':
          roleTitle = "Estudante";
          break;
        default:
          roleTitle = "Administrador";
          isAdmin = true;
          break;
      }

      return (       
        <div className='bg-gray-400 h-24 rounded-md' key={id}>
          <AuthenticatedLink isAdmin={isAdmin} id={id}>
            <div id="institution-info" className="p-3 h-full">
              <ul>
                <li>{name}</li>
                <li>{roleTitle}</li>
              </ul>
            </div>
          </AuthenticatedLink>
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
    <PageLayout>
      {!loading && renderInstitutions()}
    </PageLayout>
    );
  }
  
  export default Institutions;
  