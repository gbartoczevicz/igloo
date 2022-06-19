import SidebarHeader from './components/sidebar-header';
import SidebarBody from './components/sidebar-body';
import SidebarFooter from './components/sidebar-footer';

const Sidebar = () => {
  return (
    <>
      <div className="top-0 left-0 w-64 bg-neutral-800 p-5 text-white fixed h-full">
        <div className='py-5'> 
          <SidebarHeader/>
        </div>
        <div className="flex-grow border-t border-gray-500"/>
        <div className='py-5'>
          <SidebarBody/>
        </div>
        <div className='py-5 absolute bottom-0'>
          <SidebarFooter/>
        </div>
      </div>
    </>
  );
};

export default Sidebar;