import { Link, useNavigate } from 'react-router-dom';
import css from './Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from 'redux/selectors';
import { logOut } from 'redux/operations';

export const Home = () => {
  const navigate = useNavigate();
  const isLogin = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const nameUser = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());

    console.log(isLogin);
  };

  if (isLogin) {
    return (
      <section className={css.sectionHome}>
        <div className={css.homeBox}>
          <h1>{nameUser.name} are authorized!</h1>
          <p>you can</p>
          <div className={css.buttonBox}>
            <button className={css.button}>Go to Contacts</button>
            <p className={css.pusher}>or</p>
            <button
              className={`${css.button} ${css.buttonOut}`}
              onClick={handleLogout}
            >
              LogOut
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className={css.sectionHome}>
        <div className={css.homeBox}>
          <h1>Welcome to contact book app</h1>
          <p>you can</p>
          <div className={css.buttonBox}>
            <button
              className={css.button}
              onClick={() => navigate('/registration', { replace: true })}
            >
              Sign Up
            </button>
            <p className={css.pusher}>or</p>
            <button
              className={css.button}
              onClick={() => navigate('/login', { replace: true })}
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
