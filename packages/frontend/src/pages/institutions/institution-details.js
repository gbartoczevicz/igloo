import { useEffect, useState } from 'react';
import { Header, Sidebar } from '../../components';
import { useParams } from "react-router-dom";
import api from '../../services/api';
import { Link } from "react-router-dom";

const InstitutionDetails = () => {
    let params = useParams();
    const [loading, setLoading] = useState(true);

    const [institutionDetails, setInstitutionDetails] = useState(null);
    
    useEffect(() => {
        getInstitutionDetails();
        getAdminVerification();
    }, []);

    const getInstitutionDetails = () => {
        api.get(`/institutions/${params.id}`)
            .then(response => {
                setInstitutionDetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const getAdminVerification = () => {
        
    };

    return (
      <div>
        <Header />
        <Sidebar/>
        {
            !loading && (
                <div id="page" className="ml-52 mt-10 h-screen">
                    <h1>{institutionDetails.name}</h1>
                    <Link to={`/institutions/${institutionDetails.id}/list-users`}>LISTAR USERS</Link>
                </div>
            )
        }
      </div>
    );
}
  
export default InstitutionDetails;
  