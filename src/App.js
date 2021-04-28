import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom' ;
import Footer from "./components/Footer";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home"
import Products from "./components/pages/Products";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
            <Router>
                <ScrollToTop/>
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/sign-up' component={Signup}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/products' component={Products}/>
                </Switch>
                <Footer/>
            </Router>
    );
}

export default App;
