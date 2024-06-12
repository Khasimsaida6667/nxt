import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {PieChart, Pie, Cell, Legend} from 'recharts'

import Header from './Header'
import RLoader from './RLoader'
import FailureView from './FailureView'
import {UsernameContext} from '../UsernameContext'

const RepositoryItemDetails = () => {
  const {username} = useContext(UsernameContext)
  const {repoName} = useParams()
  // const navigate = useNavigate()
  const [repositoryItemData, setRepositoryItemData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  //const apiKey = process.env.REACT_APP_API_KEY

  const fetchRepositoryItemData = async () => {
    setIsLoading(true)
    setIsError(false)

    try {
      const apiUrl = `https://apis2.ccbp.in/gpv/specific-repo/${username}/${repoName}`//?api_key=${apiKey} i will include in url later i'm getting data if i include this no problem
      const response = await axios.get(apiUrl)
      setRepositoryItemData(response.data)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (username && repoName) {
      fetchRepositoryItemData()
    }
  }, [username, repoName])

  const handleRetryClick = () => {
    fetchRepositoryItemData()
  }

  const renderRepositoryItemView = () => {
    const {
      name,
      // language,
      stargazersCount,
      forksCount,
      watchersCount,
      openIssuesCount,
      contributors,
      languages,
    } = repositoryItemData || {}

    const languagesData = languages
      ? Object.entries(languages).map(([key, value]) => ({name: key, value}))
      : []

    return (
      <div>
        <h1>{name}</h1>
        <p>Stargazers Counts: {stargazersCount}</p>
        <p>Forks Counts: {forksCount}</p>
        <p>Watchers Counts: {watchersCount}</p>
        <p>Issues Counts: {openIssuesCount}</p>
        <h2>Contributors</h2>
        <ul>
          {contributors.map(contributor => (
            <li key={contributor.id}>
              <img src={contributor.avatarUrl} alt="contributor profile" />
            </li>
          ))}
        </ul>
        <h2>Languages</h2>
        <PieChart width={800} height={400}>
          <Pie
            data={languagesData}
            cx="50%"
            cy="50%"
            outerRadius={150}
            dataKey="value"
            label
          >
            {languagesData.map(() => (
              <Cell
                key="cell-$"
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
        <ul>
          {languagesData.map(language => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <Header />
      {isLoading && <RLoader />}
      {isError && <FailureView />}
      {repositoryItemData && renderRepositoryItemView()}
    </div>
  )
}

export default RepositoryItemDetails