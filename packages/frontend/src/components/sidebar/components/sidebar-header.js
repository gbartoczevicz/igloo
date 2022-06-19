import { Link } from "react-router-dom";
import { useAuth } from "../../../store/auth";

const SidebarHeader = () => {
    const { username } = useAuth();

    return (
      <>
        <div className="pt-4 pb-2 px-1">
          <Link to="/profile">
            <div className="flex items-center">
              <div className="shrink-0">
                <img className="rounded-full w-12" src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"/>
              </div>
              <div className="grow ml-3">
                <p className="text-sm font-semibold">{username ? username : localStorage.getItem('username')}</p>
              </div>
            </div>
          </Link>
        </div>
      </>
    )
  };

  export default SidebarHeader;