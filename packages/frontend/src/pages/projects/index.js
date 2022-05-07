import { useState } from 'react';
import { Header, Sidebar } from '../../components';

const Projects = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Header/>
      <Sidebar/>
      {
        !loading && (
          <div id="page" className='ml-52 mt-10 h-screen'>
          </div>
        )
      }
    </div>
  );
  }
  
  export default Projects;
  