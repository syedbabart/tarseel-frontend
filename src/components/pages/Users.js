import React, {useEffect, useState} from "react";
import styles from './Users.module.css'
import spinnerBlue from "../../assets/spinnerBlue.svg";
import axios from "axios";
import {rootUrl} from "../../App";
import auth from "../../auth/auth";
import UserPopup from "../UserPopup";
import AddUser from "../AddUser";

const Users = () => {

    const [customers, setCustomers] = useState([])
    const [employees, setEmployees] = useState([])
    const [selectedUser, setSelectedUser] = useState('')
    const [fetchingUsers, setFetchingUsers] = useState(false)
    const [openViewUserModal, setOpenViewUserModal] = useState(false)
    const [openAddUserModal, setOpenAddUserModal] = useState(false)
    const [showCustomers, setShowCustomers] = useState(true)
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
                generateCustomersList(response.data.users)
                generateEmployeesList(response.data.users)
            },
            error => {
                console.log(error)
            }
        )
    }

    const generateCustomersList = (users) => {
        const customerList = users.filter(user => (user.userType !== 'employee' && user.userType !== 'admin'))
            .map((user, index) =>
                <div className={'pt-item'} key={user._id} onClick={() => onOpenViewUserModal(user._id)}>
                    <div className={`item-cell ${styles.userSr}`}>{index + 1}</div>
                    <div className={`item-cell ${styles.userName}`}>{user.name} <br className={styles.lineBr}/>
                        <span>({user.email})</span></div>
                    <div className={`item-cell ${styles.userType}`}>{user.userType}</div>
                </div>
            )
        setCustomers(customerList)
        setFetchingUsers(false)
    }

    const generateEmployeesList = (users) => {
        const empList = users.filter(user => (user.userType === 'employee'))
            .map((user, index) =>
                <div className={'pt-item'} key={user._id} onClick={() => onOpenViewUserModal(user._id)}>
                    <div className={`item-cell ${styles.userSr}`}>{index + 1}</div>
                    <div className={`item-cell ${styles.userName}`}>{user.name} <br className={styles.lineBr}/>
                        <span>({user.email})</span></div>
                    <div className={`item-cell ${styles.userType}`}>{user.userType}</div>
                </div>
            )
        setEmployees(empList)
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
                fetchingUsers ? <section className={styles.userContentContainer}>
                        <h1 className={styles.userPageTitle}>Users</h1>
                        <img alt={'loading'} src={spinnerBlue}/>
                    </section> :

                    !fetchingUsers && <section className={styles.userContentContainer}>
                        <h1 className={styles.userPageTitle}>Users</h1>

                        <div className={`${styles.userTabs}`}>
                            <div className={`${styles.customer} ${showCustomers && styles.activeTab}`}
                                 onClick={() => setShowCustomers(true)}>Customers
                            </div>
                            <div className={`${styles.employee} ${!showCustomers && styles.activeTab}`}
                                 onClick={() => setShowCustomers(false)}>Employees
                            </div>
                        </div>

                        <div className={'pt-header'}>
                            <div className={`pt-cell ${styles.userSr}`}>SR.</div>
                            <div className={`pt-cell ${styles.userName}`}>USER</div>
                            <div className={`pt-cell ${styles.userType}`}>ROLE</div>
                        </div>

                        {showCustomers ?
                            (
                                customers.length > 0 ? customers :
                                    <div className={`${styles.emptyUser} pt-item`}>No customer found.</div>
                            ) : (
                                employees.length > 0 ? employees :
                                    <div className={`${styles.emptyUser} pt-item`}>No employee found.</div>
                            )
                        }

                    </section>
            }

            <div className={'add-product-button'} onClick={() => onOpenAddUserModal()}>
                <span className={'add-button-text'}>Add Employee </span>
                <i className="fas fa-plus"/>
            </div>


            {
                openViewUserModal &&
                <UserPopup open={openViewUserModal} onClose={onCloseViewUserModal} reload={fetchUsers}
                           selectedUser={selectedUser}/>
            }

            {
                openAddUserModal && <AddUser open={openAddUserModal} onClose={onCloseAddUserModal} reload={fetchUsers}/>
            }

        </>
    )
}
export default Users
