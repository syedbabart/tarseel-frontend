import React, {useEffect, useState} from "react";
import styles from './Profile.module.css'
import {rootUrl} from "../../App";
import axios from "axios";
import auth from "../../auth/auth";
import spinnerBlue from "../../assets/spinnerBlue.svg";

const Profile = (props) => {
    const [userData, setUserData] = useState()
    const [loadingUser, setLoadingUser] = useState(false)

    useEffect(() => {
        if (props.viewer === 'admin') {
            generateUserData(props.selectedUser)
        } else {
            fetchUser()
        }
        // eslint-disable-next-line
    }, [])

    const fetchUser = () => {
        const url = `${rootUrl}user`
        setLoadingUser(true)
        axios.get(url, auth.getHeader()).then(
            response => {
                generateUserData(response.data.user)
            },
            error => {
                console.log(error)
            }
        )
    }

    const generateUserData = (user) => {
        const uData =
            (<section className={props.viewer === 'admin' ? styles.adminProfileData : styles.profileData}>
                <div className={styles.row}>
                    <div className={styles.dataFieldWrap}>
                        <div className={styles.labelIcon}><i className="far fa-user"/></div>
                        <div className={styles.dataField}>
                            <div className={styles.label}>Name</div>
                            <div>{user.name}</div>
                        </div>
                    </div>

                    <div className={styles.dataFieldWrap}>
                        <div className={styles.labelIcon}><i className="far fa-envelope"/></div>
                        <div className={styles.dataField}>
                            <div className={styles.label}>Email</div>
                            <div>{user.email}</div>
                        </div>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.dataFieldWrap}>
                        <div className={styles.labelIcon}><i className={`fas fa-phone`}/></div>
                        <div className={styles.dataField}>
                            <div className={styles.label}>Phone Number</div>
                            <div>{user.phoneNumber}</div>
                        </div>
                    </div>

                    <div className={styles.dataFieldWrap}>
                        <div className={styles.labelIcon}><i className="far fa-id-badge"/></div>
                        <div className={styles.dataField}>
                            <div className={styles.label}>User Type</div>
                            <div className={styles.userTypeData}>{user.userType}</div>
                        </div>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.dataFieldWrap}>
                        <div className={styles.labelIcon}><i className="fas fa-home"/></div>
                        <div className={styles.dataField}>
                            <div className={styles.label}>Area</div>
                            <div>{user.area}</div>
                        </div>
                    </div>

                    <div className={styles.dataFieldWrap}>
                        <div className={styles.labelIcon}><i className="fas fa-map-marker-alt"/></div>
                        <div className={styles.dataField}>
                            <div className={styles.label}>Address</div>
                            <div>{user.address}</div>
                        </div>
                    </div>
                </div>
            </section>)
        setUserData(uData)
        setLoadingUser(false)
    }

    return (
        <>
            <div className={props.viewer === 'admin' ? styles.adminProfileContainer : styles.profileContainer}>
                <h2 className={styles.profilePageTitle}>Profile</h2>
                {loadingUser && <img alt={'loading'} src={spinnerBlue}/>}

                {!loadingUser && userData}


            </div>
        </>
    )
}

export default Profile
