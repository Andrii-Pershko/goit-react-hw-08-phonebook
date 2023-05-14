import { Route, Routes, useNavigate } from 'react-router-dom';
import { SignUp } from '../pages/SingUp/SignUp';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Home } from '../pages/Home/Home';
import { Login } from 'pages/Login/Login';

export const App = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate('/');
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/registration" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Route>
    </Routes>
  );
};
