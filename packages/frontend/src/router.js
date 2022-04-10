import Signin from './pages/signin';
import Signup from './pages/signup';
import ForgotPassword from './pages/forgot-password';
import Courses from './pages/courses';
import Projects from './pages/projects';
import Institutions from './pages/institutions';
import CreateInstitution from './pages/institutions/create-institution';

import { useAuth } from './store/auth';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

const PrivateOutlet = () => {
  const { token } = useAuth();
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
          <Route path="/institutions" element={<Institutions />} />
          <Route path="/institutions/create" element={<CreateInstitution />} />
          <Route path="/projects" element={<Projects />} />
          <Route exact path="/courses" element={<Courses />} />
        </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;