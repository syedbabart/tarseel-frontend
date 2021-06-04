import React, {useEffect, useState} from "react";
import {rootUrl} from "../../App";
import axios from "axios";
import styles from "./Areas.module.css";
import spinnerBlue from "../../assets/spinnerBlue.svg";
import auth from "../../auth/auth";
import Modal from "react-responsive-modal";

const Areas = () => {
    const [areas, setAreas] = useState([])
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [areaForm, setAreaForm] = useState({
        name: ''
    })

    useEffect(() => {
        fetchAreas()
        // eslint-disable-next-line
    }, [])

    const fetchAreas = () => {
        setLoadingUsers(true)
        const areasUrl = `${rootUrl}area/all`
        axios.get(areasUrl).then(
            areas => {
                generateAreasList(areas.data.areas)
            },
            error => {
                console.log(error)
            }
        )
    }

    const generateAreasList = (areas) => {
        const aList = areas.map(area =>
            <div className={styles.areaItem} key={area._id} >
                <span>{area.name}</span>
                <div className={`delete-item ${styles.delButton}`} onClick={() => onDeleteArea(area._id)}>
                    <i className="fas fa-trash-alt"/>
                </div>
            </div>
        )
        setAreas(aList)
        setLoadingUsers(false)
    }

    const onDeleteArea = (areaId) => {
        const url = `${rootUrl}area/${areaId}`
        axios.delete(url, auth.getHeader()).then(
            response => {
                fetchAreas()
            },
            error => {
                console.log(error)
            }
        )
    }

    const onCloseModal = () => {
        setOpenModal(false)
    }

    const onAddNewArea = () => {
        if (areaForm.name.length === 0) {
            return 0
        } else {
            const url = `${rootUrl}area/add`
            axios.post(url, areaForm, auth.getHeader()).then(
                response => {
                    onCloseModal()
                    fetchAreas()
                },
                error => {
                    console.log(error)
                }
            )
        }
    }


    return (
        <>
            <section className={styles.userContentContainer}>
                <h1 className={styles.userPageTitle}>Areas</h1>

                {loadingUsers ?
                    <img alt={'loading'} src={spinnerBlue}/>
                    :
                    areas
                }

                <div className={'add-product-button'} onClick={() => setOpenModal(true)}>
                    <span className={'add-button-text'}>Add new Area</span>
                </div>

                <Modal open={openModal} onClose={onCloseModal} center>
                    <h2 className={styles.cardHeader}>Add new Area</h2>

                    <section className={styles.addUserContent}>
                        <div className={styles.inputFieldWrap}>
                            <input placeholder={'Area name'} type={'text'} value={areaForm.name || ''}
                                   onChange={e => setAreaForm({...areaForm, name: e.target.value})}/>
                            <i className="fas fa-home"/>
                        </div>

                        <div className={styles.modalFooter}>
                            <button className={`${styles.modalButton}`} onClick={onAddNewArea}>Add Area</button>
                        </div>
                    </section>
                </Modal>

            </section>
        </>
    )
}
export default Areas
