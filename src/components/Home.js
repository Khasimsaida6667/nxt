import {useState, useContext} from 'react'
// import {Link} from 'react-router-dom'
import axios from 'axios'

import {HiOutlineSearch} from 'react-icons/hi'
import {RiBuildingLine} from 'react-icons/ri'
import {IoMdLink} from 'react-icons/io'
import {IoLocationOutline} from 'react-icons/io5'
import {UsernameContext} from '../UsernameContext'

import Header from './Header'
import RLoader from './RLoader'
import FailureView from './FailureView'

const Home = () => {
  const [searchInput, setSearchInput] = useState('')
  const {setUsername} = useContext(UsernameContext)
  const [userProfileData, setUserProfileData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  //const apiKey = process.env.REACT_APP_API_KEY

  const fetchUserProfileData = async () => {
    setIsLoading(true)
    setIsError(false)

    try {
      const apiUrl = `https://apis2.ccbp.in/gpv/profile-details/${searchInput}`//?api_key=${apiKey} i will include in url later i'm getting data if i include this no problem
      const response = await axios.get(apiUrl)
      setUserProfileData(response.data)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchInputChange = event => {
    setSearchInput(event.target.value)
    setUsername(event.target.value)
  }

  const handleSearchButtonClick = () => {
    if (searchInput) {
      setUserProfileData(null)
      fetchUserProfileData()
    }
  }

  const renderUserProfileView = () => (
    <>
      <img src={userProfileData.avatar_url} alt={userProfileData.name} />
      <h1>{userProfileData.name}</h1>
      <p>{userProfileData.login}</p>
      {userProfileData.bio && <p>BIO: {userProfileData.bio}</p>}
      <p>
        FOLLOWERS: <span>{userProfileData.followers}</span>
      </p>
      <p>
        FOLLOWING: <span>{userProfileData.following}</span>
      </p>
      <p>
        PUBLIC REPOS: <span>{userProfileData.public_repos}</span>
      </p>
      {userProfileData.company && (
        <p>
          Company: <RiBuildingLine /> {userProfileData.company}
        </p>
      )}
      {userProfileData.blog && (
        <p>
          Blog: <IoMdLink /> {userProfileData.blog}
        </p>
      )}
      {userProfileData.location && (
        <p>
          Location: <IoLocationOutline /> {userProfileData.location}
        </p>
      )}
    </>
  )

  return (
    <div>
      <Header />
      <h1>GitHub Profile Visualizer</h1>
      <label htmlFor="username">Username:</label>
      <input
        type="search"
        placeholder="Search"
        name="username"
        id="username"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <button
        type="button"
        data-testid="searchButton"
        onClick={handleSearchButtonClick}
      >
        <HiOutlineSearch />
      </button>
      {isLoading && <RLoader />}
      {isError && <FailureView />}
      {!isLoading && !isError && (
        <>
          {userProfileData ? (
            renderUserProfileView()
          ) : (
            <img
              src="github-profile-visualizer-home-page.png"
              alt="github profile visualizer home page"
            />
          )}
        </>
      )}
    </div>
  )
}

export default Home


