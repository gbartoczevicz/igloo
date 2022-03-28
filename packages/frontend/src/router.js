import {
  ForgotPassword,
  Signin,
  Signup,
  Courses,
  Projects
} from './pages'

import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';

const Router = () => (
  <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/courses" element={<Courses />} />
        <Route exact path="/projects" element={<Projects />} />
    </Routes>
  </BrowserRouter>
);

export default Router;