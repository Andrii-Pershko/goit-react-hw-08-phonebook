import { Route, Routes } from 'react-router-dom';
import { SignUp } from '../pages/SingUp/SignUp';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Home } from '../pages/Home/Home';
import { Login } from 'pages/Login/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from 'redux/operations';
import { Contacts } from 'pages/Contacts/Contacts';

export const App = () => {
  const dispatch = useDispatch();
  const isrefresh = useSelector(state => state.auth.isRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isrefresh === undefined) {
    return <div>Liading</div>;
  } else {
    return (
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/registration" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/contacts" element={<Contacts />}></Route>
        </Route>
      </Routes>
    );
  }
};
