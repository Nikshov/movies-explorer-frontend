import './NotFound.css';
import { useNavigate, Link } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

  return (
    <body className='notfound'>
      <h1 className='notfound__title'>404</h1>
      <h2 className='notfound__msg'>Страница не найдена</h2>
      <Link to={`${navigate(-1)}`} className='notfound__backlink'>Назад</Link>
  </body>
)
}

export default NotFound;
