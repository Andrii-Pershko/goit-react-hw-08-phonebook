import css from '../SingUp/SignUp.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from 'redux/operations';
import { selectIsLoggedIn } from 'redux/selectors';
import { object, string } from 'yup';

const initialValue = {
  email: '',
  password: '',
};

let userSchema = object().shape({
  email: string().email().required(),
  password: string()
    .matches(
      /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/,
      '6 symbol with min 1 number and 1 letter'
    )
    .required(),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }, action) => {
    const res = await dispatch(
      logIn({
        email,
        password,
      })
    );
    if (res.meta.requestStatus === 'rejected') {
      alert('User not found, check email or password');
    } else if (res.meta.requestStatus === 'fulfilled') {
      navigate('/', { replace: true });
    }
  };

  return (
    <>
      <h1>Hello Login</h1>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        <Form autoComplete="off">
          <label className={css.labelBox}>
            <p>Email</p>
            <Field type="email" name="email" />
            <ErrorMessage
              component="p"
              className={css.nameError}
              name="email"
            />
          </label>

          <label className={css.labelBox}>
            <p>Password</p>
            <Field type="password" name="password" />
            <ErrorMessage
              component="p"
              className={css.nameError}
              name="password"
            />
          </label>

          <button type="submit">Login</button>
          <button
            type="button"
            onClick={() => {
              navigate('/registration', { replace: true });
            }}
          >
            SignUp
          </button>
        </Form>
      </Formik>
    </>
  );
};
