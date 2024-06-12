import {Link, useNavigate} from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const handleTitleClick = () => {
    navigate('/')
  }

  return (
    <header>
      <h1 onClick={handleTitleClick}>
        <Link to="/">GitHub Profile Visualizer</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/repositories">Repositories</Link>
          </li>
          <li>
            <Link to="/analysis">Analysis</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
