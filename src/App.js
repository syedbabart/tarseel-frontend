import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' ;
import Footer from "./components/Footer";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home"
import Products from "./components/pages/Products";
import ScrollToTop from "./components/ScrollToTop";
import Orders from "./components/pages/Orders";
import Users from "./components/pages/Users";
import {useEffect, useReducer, useState} from "react";
import auth from "./auth/auth";
import Profile from "./components/pages/Profile";

export const rootUrl = "http://localhost:3000/api/"

function App(props) {
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        auth.setUserType(localStorage.getItem('token'))
    })

    const rerender = () => {
        forceUpdate();
    }

    return (
            <Router>
                <ScrollToTop/>
                <Navbar rerender={rerender} />
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/sign-up' component={Signup}/>
                    <Route path='/login' component={() => (<Login rerender={rerender} />)}/>
                    <Route path='/products' component={Products} />
                    <Route path='/cart' component={Orders}/>
                    {auth.getUserType() === 'admin' && <Route path='/users' component={Users}/>}
                    <Route path='/profile' component={Profile}/>
                </Switch>
                <Footer/>
            </Router>
    );
}

export default App;
