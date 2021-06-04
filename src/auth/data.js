import {rootUrl} from "../App";
import axios from "axios";
import auth from "./auth";

export let areasList;
export let productsList;
export let usersList;

class Data {
    fetchAreas = () => {
        const areasUrl = `${rootUrl}area/all`
        axios.get(areasUrl).then(
            areas => {
                areasList = areas.data.areas
            },
            error => {
                console.log(error)
            }
        )
    }

    fetchProducts = () => {
        const productsUrl = `${rootUrl}product/all`
        axios.get(productsUrl).then(
            products => {
                productsList = products.data.products
            },
            error => {
                console.log(error)
            }
        )
    }

    fetchUsers = () => {
        if (auth.getUserType() === 'admin' || auth.getUserType() === 'employee') {
            const usersUrl = `${rootUrl}user/all`
            axios.get(usersUrl, auth.getHeader()).then(
                users => {
                    usersList = users.data.users
                },
                error => {
                    console.log(error)
                }
            )
        }
    }
}
export default new Data()
