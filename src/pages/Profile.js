import * as React from "react"
import {useDispatch, useSelector} from "react-redux"
import useAuth from '../hooks/useAuth'
import {getProfile} from '../redux/store/profile/selectors'
import {shallowEqual} from "react-redux"
import {setProfileDataThunk, getProfileDataThunk} from "../redux/slice/profile"
import TextField from '@mui/material/TextField'
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone'
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined'
import Button from '@mui/material/Button'
import {useEffect, useState} from "react"


const Profile = () => {
    const {name, email, phoneNumber} = useSelector(getProfile, shallowEqual)
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [btnId, setBtnId] = useState('')
    const profileId = useAuth().id
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getProfileDataThunk({profileId}))
    }, [profileId])

    useEffect(() => {
        setNewName(name)
    }, [name])
    useEffect(() => {
        setNewEmail(email)
    }, [email])
    useEffect(() => {
        setNewPhoneNumber(phoneNumber)
    }, [phoneNumber])


    const handleEdit = (e) => {
        setBtnId(e.currentTarget.id)
    }
    const handleSave = (e) => {
        const profileData = {
            name: newName,
            email: newEmail,
            phoneNumber: newPhoneNumber
        }
        dispatch(setProfileDataThunk({profileId, profileData}))
        dispatch(getProfileDataThunk({profileId}))
        setBtnId(e.currentTarget.id)
    }

    return (
        <div className='profile'>
            <img className="profile__img" src={process.env.PUBLIC_URL + "/avatar.jpg"} alt="images"/>
            <div className='profile__list'>
                <div className="profile__item">
                    {!(btnId === "userName") ?
                        <>
                            <h3>User name: {name}</h3>
                            <Button id="userName" variant="text" onClick={handleEdit}>
                                <BorderColorTwoToneIcon color="primary"/>
                            </Button>
                        </> :
                        <>
                            <TextField
                                id="standard-basic"
                                label="User name"
                                name="newName"
                                variant="standard"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <Button id="save" variant="text" onClick={handleSave}>
                                <SaveAsOutlinedIcon color="primary"/>
                            </Button>
                        </>
                    }
                </div>
                <div className="profile__item">
                    {!(btnId === "email") ?
                        <>
                            <p>Email: {email}</p>
                            <Button id="email" variant="text" onClick={handleEdit}>
                                <BorderColorTwoToneIcon color="primary"/>
                            </Button>
                        </> :
                        <>
                            <TextField
                                id="standard-basic"
                                label="Email"
                                variant="standard"
                                name="newEmail"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                            <Button id="save" variant="text" onClick={handleSave}>
                                <SaveAsOutlinedIcon color="primary"/>
                            </Button>
                        </>
                    }
                </div>
                <div className="profile__item">
                    {!(btnId === "phoneNumber") ?
                        <>
                            <p>PN: {phoneNumber}</p>
                            <Button id="phoneNumber" variant="text" onClick={handleEdit}>
                                <BorderColorTwoToneIcon color="primary"/>
                            </Button>
                        </> :
                        <>
                            <TextField
                                id="standard-basic"
                                label="Phone number"
                                variant="standard"
                                name="newPhoneNumber"
                                value={newPhoneNumber}
                                onChange={(e) => setNewPhoneNumber(e.target.value)}
                            />
                            <Button id="save" variant="text" onClick={handleSave}>
                                <SaveAsOutlinedIcon color="primary"/>
                            </Button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile