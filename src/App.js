import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' ;
import Footer from "./components/Footer";
import MainSection from "./components/MainSection";

function App() {
    return (
        <>
            <Router>
                <Navbar/>
                <MainSection/>
                <Footer/>
                <Switch>
                    <Route path='/' exact/>
                </Switch>
            </Router>

        </>
    );
}

export default App;
