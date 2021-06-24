import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../contexsts/auth.context'


export const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logo = `${process.env.PUBLIC_URL}/img/logo.svg`
    const plus = `${process.env.PUBLIC_URL}/img/plus.svg`
    const notes = `${process.env.PUBLIC_URL}/img/notes.svg`
    const logout = `${process.env.PUBLIC_URL}/img/logout.svg`

    const logoutHandler = () => {
        auth.logout()
        history.push('/')
    }
    
    const isAuthed = !!auth.token

    if (isAuthed) {
        return(
            <nav className="grey darken-4">
                <div className="navbar">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">
                            <div className="logo-text">Notes</div>
                            <img src={logo} alt="Logo" className="logo-icon" />
                        </a>
    
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <NavLink to="/create"><div className="div-nav-icon">
                                <img src={plus} alt="Create" className="navbar-icon" />
                                </div></NavLink>
                            </li>
                            <li>
                                <NavLink to="/notes"><div className="div-nav-icon">
                                <img src={notes} alt="Notes" className="navbar-icon" />
                                </div></NavLink>
                            </li>
                            <li>
                                <a href="/" onClick={logoutHandler}>
                                    <div className="div-nav-icon">
                                        <img src={logout} alt="Log out" className="navbar-icon" />
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
    
    return(
        <nav className="grey darken-4">
            <div className="navbar">
                <div className="nav-wrapper">
                        <a href="/" className="brand-logo">Notes</a>
                        <ul className="right hide-on-med-and-down">
                            <li><NavLink to="/login" className="login-btn">Sign in</NavLink></li>
                            <li><NavLink to="/register"><div className="register-btn">Sign up</div></NavLink></li>
                        </ul>
                </div>
            </div>
        </nav>
    )
}