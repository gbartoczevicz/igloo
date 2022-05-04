import { Link } from "react-router-dom";
import sidebarElementsList from "./sidebar-elements-list";

const SidebarElements = () => {
    let sidebarElementsLinks = sidebarElementsList.map((el, index) => {
      return (
        <li className="relative" key={`${index}-${el.url}`}>
           <Link to={el.url}>
            <span className="flex items-center text-sm py-5 px-6 h-9 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-black hover:bg-blue-50 transition duration-300 ease-in-out">
                {el.icon}
                <span className="px-2">
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
          <ul className="relative px-1">
            {sidebarElementsLinks}
          </ul>
        }
      </>
    )
  };

  export default SidebarElements;