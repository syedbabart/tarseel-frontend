import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css';

function Navbar() {
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

                        <li className="nav-item">
                            <Link to='/login' className="nav-links-mobile" onClick={closeMobileMenu}>
                                Login
                            </Link>
                        </li>
                    </ul>
                    {button && <Link to={'/login'} className='btn btn--outline btn--medium'>Login</Link>}
                </div>
            </nav>
        </>
    )
}

export default Navbar
