import {
  ForgotPassword,
  Signin,
  Signup,
} from './pages'

import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';

const Router = () => (
  <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  </BrowserRouter>
);

export default Router;