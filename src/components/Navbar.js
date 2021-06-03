import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css';
import auth from "../auth/auth";

function Navbar(props) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [navClass, setNavClass] = useState('navbar')

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
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [navClass])

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className={navClass}>
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">TARSEEL <i className="fas fa-tint"/></Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fas fa-times cross-icon' : 'fas fa-bars'}/>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/products' className="nav-links" onClick={closeMobileMenu}>
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/contact-us' className="nav-links" onClick={closeMobileMenu}>
                                Contact
                            </Link>
                        </li>

                        {!auth.isLoggedIn() && <li className="nav-item">
                            <Link to='/login' className="nav-links-mobile" onClick={closeMobileMenu}>
                                Login
                            </Link>
                        </li>}

                        {auth.isLoggedIn() && auth.getUserType() !== 'admin' && auth.getUserType() !== 'employee' && !button && <li className="nav-item">
                            <Link to={'/cart'} className="nav-links-mobile" onClick={closeMobileMenu}>
                                Cart
                            </Link>
                        </li>}

                        {auth.isLoggedIn() && !button && <li className="nav-item">
                            <Link to={'/orders'} className="nav-links-mobile" onClick={closeMobileMenu}>
                                Orders
                            </Link>
                        </li>}

                        {auth.isLoggedIn() && !button &&  auth.getUserType() === 'admin' && <li className="nav-item">
                            <Link to={'/users'} className="nav-links-mobile" onClick={closeMobileMenu}>
                                Users
                            </Link>
                        </li>}

                        {auth.isLoggedIn() && !button &&  auth.getUserType() === 'admin' && <li className="nav-item">
                            <Link to={'/areas'} className="nav-links-mobile" onClick={closeMobileMenu}>
                                Areas
                            </Link>
                        </li>}

                        {auth.isLoggedIn() && !button &&  <li className="nav-item">
                            <Link to={'/profile'} className="nav-links-mobile" onClick={closeMobileMenu}>
                                Profile
                            </Link>
                        </li>}

                        {auth.isLoggedIn() && !button &&  <li className="nav-item">
                            <Link to={''} className="nav-links-mobile" onClick={onLogout}>
                                Logout
                            </Link>
                        </li>}
                    </ul>

                    {auth.isLoggedIn() ? (button &&
                        <div className='dropdown'>
                            {(auth.getUserType() === 'admin' || auth.getUserType() === 'employee') ?
                                <i className="fas fa-user-tie"/> : <i className="fas fa-user-alt"/>
                            }
                            <div className="dropdown-content">
                                {auth.getUserType() !== 'admin' && auth.getUserType() !== 'employee' && <Link to={'/cart'} className={'dropdown-item'}><i className="fas fa-shopping-cart"/>
                                    <span>Cart</span></Link>}
                                <Link to={'/orders'} className={'dropdown-item'}><i className="fas fa-folder-open"/>
                                    <span>Orders</span></Link>
                                {auth.getUserType() === 'admin' &&
                                <Link to={'/users'} className={'dropdown-item'}><i className="fas fa-users"/>
                                    <span>Users</span></Link>}
                                {auth.getUserType() === 'admin' &&
                                <Link to={'/areas'} className={'dropdown-item'}><i className="fas fa-home"/>
                                    <span>Areas</span></Link>}
                                <Link to={'/profile'} className={'dropdown-item'}><i className="far fa-address-card"/>
                                    <span>Profile</span></Link>
                                <div className={'dropdown-item'} onClick={onLogout}><i className="fas fa-sign-out-alt"/>
                                    <span>Logout</span></div>

                            </div>
                        </div>) :
                        (button && <Link to={'/login'} className='btn btn--outline btn--medium'>Login</Link>)}
                </div>
            </nav>
        </>
    )
}

export default Navbar
