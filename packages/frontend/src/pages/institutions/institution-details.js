import { useEffect, useState } from 'react';
import { Header, Sidebar } from '../../components';
import { useParams } from "react-router-dom";
import api from '../../services/api';
import * as fireToast from '../../utils/fire-toast';

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
                fireToast.success(error);
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
                </div>
            )
        }
      </div>
    );
}
  
export default InstitutionDetails;
  