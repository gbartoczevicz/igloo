import SidebarHeader from './components/sidebar-header';
import SidebarElements from './components/sidebar-elements';

const Sidebar = () => {
  return (
    <>
      <div className="top-0 left-0 w-52 bg-neutral-800 p-5 text-white fixed h-full">
        <div className='py-5'> 
          {SidebarHeader()}
        </div>
        <div className='py-5'>
          {SidebarElements()}
        </div>
      </div>
    </>
  );
};

export default Sidebar;