import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/', { replace: true });
  };
  return (
    <div>
      <h2>Page not found</h2>

      <button style={{ marginLeft: '15px' }} onClick={onClick()}>
        Go to HOME
      </button>
    </div>
  );
};
