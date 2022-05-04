import { Link } from "react-router-dom";
import { Institutions, Courses, Logout, Projects, Disciplines } from "../../icons/index"

const sidebarElementsList = [
    {
      url: '/institutions',
      text: 'Instituições',
      icon: < Institutions/>
    },
    {
      url: '/courses',
      text: 'Cursos',
      icon: < Courses/>
    },
    {
      url: '/discipline',
      text: 'Matéria',
      icon: < Disciplines/>
    },
    {
      url: '/projects',
      text: 'Projects',
      icon: < Projects/>
    },
    {
      url: '/',
      text: 'Logout',
      icon: < Logout/>
    },
  ];

const SidebarElements = () => {
    let sidebarElementsLinks = sidebarElementsList.map((el, index) => {
      return (
        <li className="relative" key={`${index}-${el.url}`}>
           <Link to={el.url}>
            <span className="flex items-center text-sm py-4 px-6 h-9 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-black hover:bg-blue-50 transition duration-300 ease-in-out">
                {el.icon}
                <span className="px-1">
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