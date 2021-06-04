import React, {useEffect, useState} from "react";
import styles from './Profile.module.css'
import {rootUrl} from "../../App";
import axios from "axios";
import auth from "../../auth/auth";
import spinnerBlue from "../../assets/spinnerBlue.svg";
import {areasList} from "../../auth/data";

const Profile = (props) => {
    const [userData, setUserData] = useState()
    const [loadingUser, setLoadingUser] = useState(false)

    useEffect(() => {
        if (areasList === undefined) {
            fetchAreas()
        } else {
            if (props.viewer === 'admin') {
                generateUserData(props.selectedUser, areasList)
            } else {
                fetchUser(areasList)
            }
        }
        return () => setLoadingUser(false)
        // eslint-disable-next-line
    }, [])

    const fetchAreas = () => {
        setLoadingUser(true)
        const areasUrl = `${rootUrl}area/all`
        axios.get(areasUrl).then(
            areas => {
                if (props.viewer === 'admin') {
                    generateUserData(props.selectedUser, areas.data.areas)
                } else {
                    fetchUser(areas.data.areas)
                }
            },
            error => {
                console.log(error)
                setLoadingUser(false)
            }
        )
    }

    const fetchUser = (areas) => {
        setLoadingUser(true)
        const url = `${rootUrl}user`
        setLoadingUser(true)
        axios.get(url, auth.getHeader()).then(
            response => {
                generateUserData(response.data.user, areas)
            },
            error => {
                console.log(error)
                setLoadingUser(false)
            }
        )
    }

    const getArea = (areas, areaId) => {
        for (let i = 0; i < areas.length; i++) {
            if (areas[i]._id === areaId) {
                return areas[i]
            }
        }
    }

    const generateUserData = (user, areas) => {
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
                            <div>{(getArea(areas, user.area)) !== undefined ? getArea(areas, user.area).name : 'User registered before areas integration'}</div>
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

                {/*{user.userType === 'corporate' && <div className={styles.row}>*/}
                {/*    <div className={styles.dataFieldWrap}>*/}
                {/*        <div className={styles.labelIcon}><i className="far fa-building"/></div>*/}
                {/*        <div className={styles.dataField}>*/}
                {/*            <div className={styles.label}>National Tax Number (NTN)</div>*/}
                {/*            <div>{user.ntn}</div>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className={styles.dataFieldWrap}>*/}
                {/*        <div className={styles.labelIcon}><i className="far fa-envelope"/></div>*/}
                {/*        <div className={styles.dataField}>*/}
                {/*            <div className={styles.label}>Sales Tax Registration Number (STRN)</div>*/}
                {/*            <div>{user.strn}</div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>}*/}

                {/*{user.userType === 'corporate' && <div className={styles.row}>*/}
                {/*    <div className={styles.dataFieldWrap}>*/}
                {/*        <div className={styles.labelIcon}><i className="far fa-address-card"/></div>*/}
                {/*        <div className={styles.dataField}>*/}
                {/*            <div className={styles.label}>Registration Number</div>*/}
                {/*            <div>{user.regNumber}</div>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    <div className={styles.dataFieldWrap}>*/}
                {/*        <div className={styles.labelIcon}><i className="fas fa-map-marker-alt"/></div>*/}
                {/*        <div className={styles.dataField}>*/}
                {/*            <div className={styles.label}>Registered Address</div>*/}
                {/*            <div>{user.regAddress}</div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>}*/}
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
