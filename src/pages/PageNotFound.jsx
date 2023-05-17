import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Page not found</h2>

      <button
        style={{ marginLeft: '15px' }}
        onClick={() => {
          navigate('/', { replace: true });
        }}
      >
        Go to HOME
      </button>
    </div>
  );
};
