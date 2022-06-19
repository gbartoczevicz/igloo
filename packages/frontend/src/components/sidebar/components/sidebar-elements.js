import { Institution, Course, Project, Discipline, Home } from "../../icons/index";
import { IconContext } from "react-icons";

const sidebarElementsList = [
    {
      url: '/home',
      text: 'Home Page',
      icon:  
      <>
        <IconContext.Provider value={{ size: "17" }}>
          <Home/>
        </IconContext.Provider>
      </>
    },
    {
      url: '/institutions',
      text: 'Instituições',
      icon: 
      <>
        <IconContext.Provider value={{ size: "17" }}>
          <Institution/>
        </IconContext.Provider>
      </>
    },
    {
      url: '/courses',
      text: 'Cursos',
      icon:  
      <>
        <IconContext.Provider value={{ size: "17" }}>
          <Course/>
        </IconContext.Provider>
      </>
    },
    {
      url: '/disciplines',
      text: 'Matéria',
      icon: 
      <>
        <IconContext.Provider value={{ size: "17" }}>
          <Discipline/>
        </IconContext.Provider>
      </>
    },
    {
      url: '/projects',
      text: 'Projects',
      icon: 
      <>
        <IconContext.Provider value={{ size: "17" }}>
          <Project/>
        </IconContext.Provider>
      </>
    }
  ];

export default sidebarElementsList;