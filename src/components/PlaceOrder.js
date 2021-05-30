import React, {useEffect, useState} from "react";
import Modal from "react-responsive-modal";
import {rootUrl} from "../App";
import axios from "axios";

const PlaceOrder = (props) => {
    const [areas, setAreas] = useState([])

    useEffect(() => {
        fetchAreas()
        // eslint-disable-next-line
    }, [])

    const fetchAreas = () => {
        const url = `${rootUrl}area/all`
        axios.get(url).then(
            response => {
                generateAreasList(response.data.areas)
            },
            error => {
                console.log(error)
            }
        )
    }

    const generateAreasList = (areas) => {
        const areaList = areas.map(area =>
            <option key={area._id} value={area._id}>{area.name}</option>
        )
        setAreas(areaList)
    }

    return (
        <Modal open={props.open} onClose={props.onClose} showCloseIcon={false} center>
            <h2>Place Order</h2>
        </Modal>
    )
}
export default PlaceOrder
