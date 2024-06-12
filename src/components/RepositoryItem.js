import {useNavigate} from 'react-router-dom'

const RepositoryItem = ({repository}) => {
  const navigate = useNavigate()

  const handleRepositoryItemClick = () => {
    navigate(`/repositories/${repository.name}`)
  }

  return (
    <li onClick={handleRepositoryItemClick}>
      <h3>{repository.name}</h3>
      <p>{repository.language}</p>
      <p>Stars: {repository.stargazers_count}</p>
      <p>Forks: {repository.forks_count}</p>
    </li>
  )
}

export default RepositoryItem
