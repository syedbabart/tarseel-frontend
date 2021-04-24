import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' ;
import Footer from "./components/Footer";
import Signup from "./components/pages/Signup";
import Home from "./components/pages/Home"

function App() {
    return (
        <>
            <Router>
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/sign-up' component={Signup}/>
                </Switch>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
