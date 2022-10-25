import {useEffect, useState} from "react"
import {Link, Navigate} from "react-router-dom"
import {auth} from "../services/firebase";
import useAuth from '../hooks/useAuth';
import {useDispatch} from "react-redux";
import {createUserThunk, createProfileThunk} from "../redux/slice/user";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const isAuth = useAuth().isAuth
    const profileId = useAuth().id
    const profileEmail = useAuth().email
    const dispatch = useDispatch()

    const handlePassChange = (e) => {
        setPassword(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
            dispatch(createUserThunk({auth, email, password}))
    }

    useEffect(() => {
        const profileData = {
            id:profileId,
            email:profileEmail,
        }
        dispatch(createProfileThunk({profileData}))
    }, [profileId])

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    return !isAuth ? (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <p>Fill in the form below to register new account.</p>
                <div className="login__input">
                    <OutlinedInput
                        id="outlined-size-small"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleEmailChange}
                        value={email}
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle/>
                            </InputAdornment>
                        }
                    />
                </div>
                <div className="login__input">
                    <OutlinedInput
                        id="outlined-size-small"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePassChange}
                        placeholder="Password"
                        name="password"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
                <div className="login__btn">
                    <Button variant="contained" type="submit">Registration</Button>
                </div>
                <hr style={{width: "330px"}}/>
                <p>
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    ) : <Navigate to='/login'/>
}

export default SignUp

