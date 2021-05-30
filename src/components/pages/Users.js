import React, {useEffect, useState} from "react";
import styles from './Users.module.css'
import spinnerBlue from "../../assets/spinnerBlue.svg";
import axios from "axios";
import {rootUrl} from "../../App";
import auth from "../../auth/auth";
import UserPopup from "../UserPopup";
import AddUser from "../AddUser";

const Users = () => {

    const [allUsers, setAllUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState('')
    const [fetchingUsers, setFetchingUsers] = useState(false)
    const [openViewUserModal, setOpenViewUserModal] = useState(false)
    const [openAddUserModal, setOpenAddUserModal] = useState(false)
    let usersArray = []

    useEffect(() => {
        fetchUsers()
        // eslint-disable-next-line
    }, [])

    const fetchUsers = () => {
        setFetchingUsers(true)
        const url = `${rootUrl}user/all`
        axios.get(url, auth.getHeader()).then(
            response => {
                usersArray = response.data.users
                generateUsersList(response.data.users)
            },
            error => {
                console.log(error)
            }
        )
    }

    const generateUsersList = (users) => {
        const uList = users.map((user, index) =>
            <div className={'pt-item'} key={user._id} onClick={() => onOpenViewUserModal(user._id)}>
                <div className={`item-cell ${styles.userSr}`}>{index + 1}</div>
                <div className={`item-cell ${styles.userName}`}>{user.name} <br className={styles.lineBr}/> <span>({user.email})</span></div>
                <div className={`item-cell ${styles.userType}`}>{user.userType}</div>
            </div>
        )
        setAllUsers(uList)
        setFetchingUsers(false)
    }

    const onOpenViewUserModal = (selectedId) => {
        onSetSelectedUser(selectedId)
        setOpenViewUserModal(true)
    }

    const onCloseViewUserModal = () => {
        setOpenViewUserModal(false)
    }

    const onOpenAddUserModal = () => {
        setOpenAddUserModal(true)
    }

    const onCloseAddUserModal = () => {
        setOpenAddUserModal(false)
    }

    const onSetSelectedUser = (userID) => {
        const currentUser = usersArray.find(u => u._id === userID)
        setSelectedUser(currentUser)
    }

    return (
        <>
            {
                fetchingUsers && <section className={styles.userContentContainer}>
                    <h1 className={styles.userPageTitle}>Users</h1>
                    <img alt={'loading'} src={spinnerBlue}/>
                </section>
            }

            {
                !fetchingUsers && <section className={styles.userContentContainer}>
                    <h1 className={styles.userPageTitle}>Users</h1>
                    <div className={'pt-header'}>
                        <div className={`pt-cell ${styles.userSr}`}>SR.</div>
                        <div className={`pt-cell ${styles.userName}`}>USER</div>
                        <div className={`pt-cell ${styles.userType}`}>ROLE</div>
                    </div>

                    {allUsers}

                </section>}

            <div className={'add-product-button'} onClick={() => onOpenAddUserModal()}>
                <span className={'add-button-text'}>Add Employee </span>
                <i className="fas fa-plus"/>
            </div>


            {
                openViewUserModal && <UserPopup open={openViewUserModal} onClose={onCloseViewUserModal} reload={fetchUsers} selectedUser={selectedUser}/>
            }

            {
                openAddUserModal && <AddUser open={openAddUserModal} onClose={onCloseAddUserModal} reload={fetchUsers}/>
            }

        </>
    )
}
export default Users
