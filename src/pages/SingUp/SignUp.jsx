import css from './SignUp.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from 'redux/operations';
import { object, string } from 'yup';
// import { useAddUserMutation } from 'redux/contactsBookAPI';

const initialValue = {
  name: '',
  email: '',
  password: '',
  checkPassword: '',
};

let userSchema = object().shape({
  name: string().min(2).required(),
  email: string().email().required(),
  password: string()
    .matches(
      /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/,
      '6 symbol with min 1 number and 1 letter'
    )
    .required(),
  checkPassword: string().required(),
});

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async ({ name, email, password, checkPassword }, action) => {
    if (password !== checkPassword) {
      alert('Паролі не співпадають');
      return;
    }
    
    dispatch(register({ name, email, password }));
    navigate('/', { replace: true });
    action.resetForm();
  };

  return (
    <>
      <h1>Hello SignUp</h1>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={userSchema}
      >
        <Form autoComplete="off">
          <label className={css.labelBox}>
            <p>Name</p>
            <Field type="text" name="name" />
            <ErrorMessage component="p" className={css.nameError} name="name" />
          </label>

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
          <label className={css.labelBox}>
            <p>Check password</p>
            <Field type="password" name="checkPassword" />
            <ErrorMessage
              component="p"
              className={css.nameError}
              name="checkPassword"
            />
          </label>
          <button type="submit">Registration</button>
          <button
            type="button"
            onClick={() => {
              navigate('/login', { replace: true });
            }}
          >
            Login
          </button>
        </Form>
      </Formik>
    </>
  );
};
