import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' ;
import Footer from "./components/Footer";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home"
import Products from "./components/pages/Products";
import Services from "./components/pages/Services";
import Cart from "./components/pages/Cart";
import Users from "./components/pages/Users";
import {useEffect, useReducer} from "react";
import auth from "./auth/auth";
import Profile from "./components/pages/Profile";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";
import Contact from "./components/pages/Contact";
import AllOrders from "./components/pages/AllOrders";
import CustomerOnlyRoute from "./auth/CustomerOnlyRoute";
import data from "./auth/data";
import Areas from "./components/pages/Areas";

export const rootUrl = "http://localhost:3000/api/"

function App() {
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        auth.setUserType(localStorage.getItem('token'))
        data.fetchUsers()
        data.fetchAreas()
        data.fetchProducts()
        // eslint-disable-next-line
    }, [])

    const rerender = () => {
        forceUpdate();
    }

    return (
            <Router>
                <Navbar rerender={rerender} />
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/sign-up' component={Signup}/>
                    <Route path='/login' component={() => (<Login rerender={rerender} />)}/>
                    <Route path='/products' component={Products} />
                    <Route path='/services' component={Services} />
                    <Route path='/contact-us' component={Contact}/>
                    <CustomerOnlyRoute path='/cart' component={Cart}/>
                    <AdminProtectedRoute path='/users' component={Users}/>
                    <AdminProtectedRoute path='/areas' component={Areas}/>
                    <ProtectedRoute path='/profile' component={Profile}/>
                    <ProtectedRoute path='/orders' component={AllOrders}/>
                </Switch>
                <Footer/>
            </Router>
    );
}

export default App;
