import { Institutions, Courses, Logout, Projects, Disciplines, Home } from "../../icons/index";

const sidebarElementsList = [
    {
      url: '/home',
      text: 'Home Page',
      icon: <Home/>
    },
    {
      url: '/institutions',
      text: 'Instituições',
      icon: <Institutions/>
    },
    {
      url: '/courses',
      text: 'Cursos',
      icon: <Courses/>
    },
    {
      url: '/disciplines',
      text: 'Matéria',
      icon: <Disciplines/>
    },
    {
      url: '/projects',
      text: 'Projects',
      icon: <Projects/>
    },
    {
      url: '/',
      text: 'Logout',
      icon: <Logout/>
    },
  ];

export default sidebarElementsList;