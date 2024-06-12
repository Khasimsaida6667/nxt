import {useState, useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import {UsernameContext} from '../UsernameContext'
import Header from './Header'
import RLoader from './RLoader'
import FailureView from './FailureView'

const Analysis = () => {
  const {username} = useContext(UsernameContext)
  const navigate = useNavigate()
  const [analysisData, setAnalysisData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  //const apiKey = process.env.REACT_APP_API_KEY

  console.log(username)
  const fetchAnalysisData = async () => {
    setIsLoading(true)
    setIsError(false)

    try {
      const apiUrl = `https://apis2.ccbp.in/gpv/profile-summary/${username}`//?api_key=${apiKey} i will include in url later i'm getting data if i include this no problem
      const response = await axios.get(apiUrl)
      setAnalysisData(response.data)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (username) {
      fetchAnalysisData()
    }
  }, [username])

  const handleGoToHomeClick = () => {
    navigate('/')
  }

  const renderNoDataView = () => (
    <div>
      <img src="empty-analysis.png" alt="empty analysis" />
      <h1>No Data Found</h1>
      <p>
        GitHub username is empty, please provide a valid username for Analysis
      </p>
      <button type="button" onClick={handleGoToHomeClick}>
        Go to Home
      </button>
    </div>
  )

  const renderAnalysisView = () => {
    const {
      user = {},
      quarterCommitCount = {},
      langRepoCount = {},
      langCommitCount = {},
      repoCommitCount = {},
    } = analysisData || {}

    const languagePerRepos = Object.entries(langRepoCount).map(
      ([name, value]) => ({name, value}),
    )

    const languagePerCommits = Object.entries(langCommitCount).map(
      ([name, value]) => ({name, value}),
    )

    const commitsPerRepo = Object.entries(repoCommitCount).map(
      ([name, value]) => ({name, value}),
    )

    const quarterCommitCountData = Object.entries(quarterCommitCount).map(
      ([name, value]) => ({name, value}),
    )

    return (
      <div>
        <img src={user.avatarUrl} alt={user.login} />
        <h1>{user.login}</h1>
        <h2>Analysis</h2>

        <h3>Language Per Repos</h3>
        <PieChart width={800} height={400}>
          <Pie
            data={languagePerRepos}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {languagePerRepos.map(() => (
              <Cell
                key="cell-$"
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>

        <h3>Language Per Commits</h3>
        <PieChart width={800} height={400}>
          <Pie
            data={languagePerCommits}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {languagePerCommits.map(() => (
              <Cell
                key="cell-$"
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>

        <h3>Commits Per Repo</h3>
        <LineChart width={800} height={400} data={quarterCommitCountData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>

        <h3>Commits Per Repo (Top 10)</h3>
        <PieChart width={800} height={400}>
          <Pie
            data={commitsPerRepo}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {commitsPerRepo.map(() => (
              <Cell
                key="cell-$"
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <Link to="/">Home</Link>
      {isLoading && <RLoader />}
      {isError && <FailureView onRetry={fetchAnalysisData} />}
      {analysisData ? renderAnalysisView() : renderNoDataView()}
    </div>
  )
}

export default Analysis