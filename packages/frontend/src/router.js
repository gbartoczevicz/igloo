import Signin from './pages/signin';
import Signup from './pages/signup';
import ForgotPassword from './pages/forgot-password';
import NotFound from './pages/not-found';
import Courses from './pages/courses';
import Projects from './pages/projects';
import Institutions from './pages/institutions';
import CreateInstitution from './pages/institutions/create-institution';
import InstitutionDetails from './pages/institutions/institution-details';
import ListUsers from './pages/institutions/list-users';
import Disciplines from './pages/disciplines';
import Home from './pages/home';
import Profile from './pages/profile';
import EditProfile from './pages/profile/edit-profile';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

/* import { useAuth } from './store/auth'; */
const PrivateOutlet = () => {
  /* const { token } = useAuth(); */
  /* TODO: não está funcionando utilizando o token direto, pq? */
  /* return token ? <Outlet /> : <Navigate to="/" />; */  
  return localStorage.getItem('@userToken') ? <Outlet /> : <Navigate to="/" />;
}

const Router = () => (
  <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<PrivateOutlet />}>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/institutions" element={<Institutions />} />
          <Route exact path="/institutions/create" element={<CreateInstitution />} />
          <Route exact path="/institutions/:id" element={<InstitutionDetails />} />
          <Route exact path="/institutions/:id/list-users" element={<ListUsers />} />
          <Route exact path="/projects" element={<Projects />} />
          <Route exact path="/courses" element={<Courses />} />
          <Route exact path="/disciplines" element={<Disciplines />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/profile/edit" element={<EditProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;