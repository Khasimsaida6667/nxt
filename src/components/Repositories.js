import {useState, useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UsernameContext} from '../UsernameContext'

import Header from './Header'
import RLoader from './RLoader'
import FailureView from './FailureView'
import RepositoryItem from './RepositoryItem'

const Repositories = () => {
  const {username} = useContext(UsernameContext)
  const navigate = useNavigate()
  const [repositoriesData, setRepositoriesData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  //const apiKey = process.env.REACT_APP_API_KEY
  const fetchRepositoriesData = async () => {
    setIsLoading(true)
    setIsError(false)

    try {
      const apiUrl = `https://apis2.ccbp.in/gpv/repos/${username}`//?api_key=${apiKey} i will include in url later i'm getting data if i include this no problem
      const response = await axios.get(apiUrl)
      setRepositoriesData(response.data)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (username) {
      fetchRepositoriesData()
    }
  }, [username])

  const handleGoToHomeClick = () => {
    navigate('/')
  }

  const renderNoDataView = () => (
    <div>
      <img src="empty-repositories.png" alt="empty repositories" />
      <h1>No Data Found</h1>
      <p>
        GitHub username is empty, please provide a valid username for
        Repositories
      </p>
      <button type="button" onClick={handleGoToHomeClick}>
        Go to Home
      </button>
    </div>
  )

  const renderRepositoriesView = () => (
    <>
      <h1>Repositories</h1>
      <img
        src={repositoriesData[0].owner.avatar_url}
        alt={repositoriesData[0].owner.login}
      />
      <h2>{repositoriesData[0].owner.login}</h2>
      <ul>
        {repositoriesData.map(repo => (
          <RepositoryItem key={repo.id} repository={repo} />
        ))}
      </ul>
    </>
  )

  const renderNoRepositoriesView = () => (
    <div>
      <img src="no-repositories.png" alt="no repositories" />
      <h1>No Repositories Found</h1>
    </div>
  )

  return (
    <div>
      <Header />
      <Link to="/">Home</Link>
      {isLoading && (
        <div data-testid="loader">
          <RLoader />
        </div>
      )}
      {isError && <FailureView onRetry={fetchRepositoriesData} />}
      {!username && renderNoDataView()}
      {username &&
        !isLoading &&
        !isError &&
        repositoriesData.length === 0 &&
        renderNoRepositoriesView()}
      {username &&
        !isLoading &&
        !isError &&
        repositoriesData.length > 0 &&
        renderRepositoriesView()}
    </div>
  )
}

export default Repositories


