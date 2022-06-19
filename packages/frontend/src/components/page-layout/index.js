import { Header, Sidebar } from '../';

const PageLayout = ({ children }) => {
  return (
    <div>
      <Header/>
      <Sidebar/>
      <div id="page" className='ml-64 mt-10 h-screen'>
          {children}
      </div>
    </div>
  );
  }
  
  export default PageLayout;
  