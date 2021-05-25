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
import {useEffect} from "react";
import auth from "./auth/auth";

export const rootUrl = "http://localhost:3000/api/"

function App() {

    useEffect(() => {
        auth.setUserType(localStorage.getItem('token'))
    })

    return (
            <Router>
                <ScrollToTop/>
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/sign-up' component={Signup}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/products' component={Products} />
                    <Route path='/cart' component={Orders}/>
                </Switch>
                <Footer/>
            </Router>
    );
}

export default App;
