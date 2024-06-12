import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div>
    {' '}
    <img src="" alt="page not found" />
    <h1>PAGE NOT FOUND</h1>
    <p>
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="go-home-button">Go to Home</button>
    </Link>
  </div>
)

export default NotFound
