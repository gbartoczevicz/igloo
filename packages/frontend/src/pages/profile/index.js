import { useEffect, useState } from 'react';
import  PageLayout  from '../../components/page-layout';

const Projects = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  /* const getProfile = () => {
      api.
  } */

  return (
      <PageLayout>
        { loading ? <></> : "PROFILE"}
      </PageLayout>
  );
  }
  
  export default Projects;
  