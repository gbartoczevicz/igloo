import { useEffect, useState } from 'react';
import  PageLayout  from '../../components/page-layout';
import api from '../../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfileInfo();
    setLoading(false);
  }, []);

  const getProfileInfo = () => {
    api.get('/profile')
      .then(response => {
        return setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
      <PageLayout>
        { loading ? 
          <></> : 
          <div>
            <ul>
              <li>{user ? user.name : ""}</li>
              <li>{user ? user.email : ""}</li>
            </ul>
          </div>
        }
      </PageLayout>
  );
};
  
export default Profile;
  