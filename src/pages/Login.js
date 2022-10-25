import {useState} from "react"
import {Link, Navigate} from "react-router-dom"
import useAuth from '../hooks/useAuth'
import {useDispatch} from 'react-redux'
import {loginThunk} from "../redux/slice/user"
import {auth} from "../services/firebase"
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const isAuth = useAuth().isAuth
    const dispatch = useDispatch()

    const handlePassChange = (e) => {
        setPassword(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginThunk({auth, email, password}))
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault()
    }

    return !isAuth ? (
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <p>Fill in the form below to login to your account.</p>
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
                        <Button variant="contained" type="submit">Login</Button>
                    </div>
                    <hr style={{width: "330px"}}/>
                    <p>
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </form>
            </div>
        ) :
        (<Navigate to='/profile'/>)
}

export default Login