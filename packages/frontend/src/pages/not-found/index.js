import { Header, Sidebar } from '../../components';
import penguin from '../../images/penguin.png';

const NotFound = () => {
  return (
    <div>
      <Header/>
      <Sidebar/>
        <div id="page" className='ml-52 mt-10 h-screen'>
            <div className='flex flex-wrap justify-center mt-20'>
                <img src={penguin} />
            </div>
        </div>
    </div>
  );
  }
  
  export default NotFound;
  