import { Institution, Course, Logout, Project, Discipline, Home } from "../../icons/index";

const sidebarElementsList = [
    {
      url: '/home',
      text: 'Home Page',
      icon: <Home/>
    },
    {
      url: '/institutions',
      text: 'Instituições',
      icon: <Institution/>
    },
    {
      url: '/courses',
      text: 'Cursos',
      icon: <Course/>
    },
    {
      url: '/disciplines',
      text: 'Matéria',
      icon: <Discipline/>
    },
    {
      url: '/projects',
      text: 'Projects',
      icon: <Project/>
    },
    {
      url: '/',
      text: 'Logout',
      icon: <Logout/>
    },
  ];

export default sidebarElementsList;