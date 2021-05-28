import axios from "axios";
import {rootUrl} from "../App";

class Auth {
    login = async (token) => {
        localStorage.setItem('token', token)
        this.setUserType(token)
    }

    logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userType')
        return true
    }

    getHeader = () => {
        return ({
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    isLoggedIn = () => {
        return !!(localStorage.getItem('token'))
    }

    setUserType = (token) => {
        if (token) {
            const url = rootUrl + 'user'
            axios.get(url, this.getHeader()).then(
                response => {
                    localStorage.setItem('userType', response.data.user['userType'])
                },
                error => {
                    console.log(error)
                }
            )
        } else {
            localStorage.removeItem('userType')
        }
    }

    getUserType = () => {
        if (this.isLoggedIn()) {
            return localStorage.getItem('userType')
        } else {
            return null
        }
    }
}

export default new Auth()
