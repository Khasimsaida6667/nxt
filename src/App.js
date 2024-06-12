import {Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Repositories from './components/Repositories'
import RepositoryItemDetails from './components/RepositoryItemDetails'
import Analysis from './components/Analysis'
import NotFound from './components/NotFound'

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />{' '}
    {/* Make sure Home component is rendered */}
    <Route path="/repositories" element={<Repositories />} />{' '}
    {/* Make sure Repositories component is rendered */}
    <Route
      path="/repositories/:repoName"
      element={<RepositoryItemDetails />}
    />{' '}
    {/* Make sure RepositoryItemDetails component is rendered */}
    <Route path="/analysis" element={<Analysis />} />{' '}
    {/* Make sure Analysis component is rendered */}
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default App