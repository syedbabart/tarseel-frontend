import {rootUrl} from "../App";
import axios from "axios";

export let areasList;
export let productsList;

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
}
export default new Data()
