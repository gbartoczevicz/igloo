import { Link } from "react-router-dom";
import sidebarElements from "./sidebar-elements";

const SidebarBody = () => {
    let sidebarElementsLinks = sidebarElements.map((el, index) => { 
      return (
        <li className="relative" key={`${index}-${el.url}`}>
           <Link to={el.url}>
            <span className="flex items-center text-sm py-5 px-5 h-9 m-0 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-black hover:bg-blue-50 transition duration-300 ease-in-out">
                {el.icon}
                <span className="px-3 text-base">
                {el.text}
                </span>
            </span>
          </Link>
        </li>
      )
    })

    return (
      <>
        {
          <ul className="relative">
            {sidebarElementsLinks}
          </ul>
        }
      </>
    )
  };

  export default SidebarBody;