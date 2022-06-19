import { Link } from "react-router-dom";
import { Logout } from "../../icons/index";
import { IconContext } from "react-icons";

const SidebarFooter = () => {
    const clearLocalStorage = () => {
        localStorage.clear();
    }

    return (
        <>
            <div>
                <Link to='/' onClick={() => clearLocalStorage()}>
                    <span className="flex items-center text-sm py-5 px-5 h-9 m-0 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-black hover:bg-blue-50 transition duration-300 ease-in-out">
                        <IconContext.Provider value={{ size: "17" }}>
                            <Logout />
                        </IconContext.Provider>
                        <span className="px-3 text-base">
                            Logout
                        </span>
                    </span>
                </Link>
            </div>
        </>
    )
};

export default SidebarFooter;