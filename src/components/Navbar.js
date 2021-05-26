import React, {useEffect, useMemo, useState} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css';
import auth from "../auth/auth";

function Navbar(props) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [navClass, setNavClass] = useState('navbar')
    const isLogged = useMemo(() => {
        return !!localStorage.getItem('token')
    }, [])

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const handleScroll = () => {
        setNavClass(window.scrollY > 20 ? 'navbar scroll' : 'navbar')
    }

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const onLogout = async () => {
        let isLoggedOut = await auth.logOut()
        if (isLoggedOut) {
            props.rerender()
        }
        closeMobileMenu()
    }

    useEffect(() => {
        showButton()
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [navClass])

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className={navClass}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">TARSEEL <i className="fab fa-typo3"/></Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/services' className="nav-links" onClick={closeMobileMenu}>
                                Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/products' className="nav-links" onClick={closeMobileMenu}>
                                Products
                            </Link>
                        </li>

                        {!auth.isLoggedIn() && <li className="nav-item">
                            <Link to='/login' className="nav-links-mobile" onClick={closeMobileMenu}>
                                Login
                            </Link>
                        </li>}

                        {auth.isLoggedIn() && <li className="nav-item">
                            <div className="nav-links-mobile" onClick={onLogout}>
                                Logout
                            </div>
                        </li>}

                    </ul>
                    {auth.isLoggedIn() ? (button &&
                    <div className='dropdown '><i className="fas fa-user-tie"/>
                        <div className="dropdown-content">
                            <div className={'dropdown-item'} onClick={onLogout}>Logout <i className="fas fa-sign-out-alt"/></div>
                            <Link to={'/cart'} className={'dropdown-item'}>Cart <i className="fas fa-cart-plus"/></Link>
                            <Link to={'/users'} className={'dropdown-item'}>Users</Link>
                        </div>
                    </div>) :
                    (button && <Link to={'/login'} className='btn btn--outline btn--medium'>Login</Link>)}
                </div>
            </nav>
        </>
    )
}

export default Navbar
