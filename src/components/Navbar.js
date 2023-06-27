import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const LogIn = () => {
  const { login, currentUser } = useAuthContext()
  return (
    !currentUser && (
      <button type='button' className='btn btn-warning' onClick={login}>
        Login
      </button>
    )
  )
}

const LogOut = () => {
  const { logout, currentUser } = useAuthContext()
  return (
    !!currentUser && (
      <button type='button' className='btn btn-danger' onClick={logout}>
        Logout
      </button>
    )
  )
}

function Navigation () {
  const { currentUser } = useAuthContext()
  return (
    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
      {/* remove all links except HOME */}
      <li className='nav-item'>
        {/* use to with Link to specify route */}
        <Link className='nav-link active' aria-current='page' to='/'>
          Home
        </Link>
      </li>
      <li className='nav-item'>
        {currentUser && ( // displays link only if user logged in 
          <Link
            className='nav-link active'
            aria-current='page'
            to='/stockimages'
          >
            My Stock Images
          </Link>
        )}
      </li>
    </ul>
  )
}

function SearchForm () {
  return (
    <form className='d-flex'>
      <input
        className='form-control me-2'
        type='search'
        placeholder='Search'
        aria-label='Search'
      />
      <button className='btn btn-outline-success' type='submit'>
        Search
      </button>
    </form>
  )
}

function Dropdown () {
  const { currentUser } = useAuthContext()
  // display username or profile dynamically
  const username = useMemo(() => {
    return currentUser?.displayName || 'Profile'
  }, [currentUser])
  // update value of username and avatar based on currentUser state
  const avatar = useMemo(() => {
    return !!currentUser ? (
      <img
        className='avatar'
        src={currentUser?.photoURL}
        alt={currentUser?.displayName}
        width='34'
        height='34'
      />
    ) : (
      'Login' // fallback for if no current user
    )
  }, [currentUser])
  return (
    <ul className='navbar-nav mb-2 mb-lg-0'>
      {' '}
      {/* remove ms-auto */}
      <li className='nav-item dropdown'>
        <a
          className='nav-link dropdown-toggle'
          href='#'
          id='navbarDropdown'
          role='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          {avatar}
        </a>
        <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
          <li>
            <a className='dropdown-item text-center text-capitalize' href='#'>
              {username}
            </a>
            <li>
              <hr className='dropdown divider' />
            </li>
          </li>
          <div className='d-flex justify-content-center'>
            <LogIn />
            <LogOut />
          </div>
        </ul>
      </li>
    </ul>
  )
}

function Navbar () {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light mb-5'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          ⚡ Firestock
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <Navigation />
          <SearchForm />
          <Dropdown />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
