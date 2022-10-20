import {useState} from "react"
import {Link, Navigate} from "react-router-dom"
// import useAuth from '../hooks/useAuth';
import {useDispatch} from 'react-redux';
import {loginThunk} from "../slice/user";
import {auth} from "../services/firebase";
import {signInWithEmailAndPassword} from 'firebase/auth'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAuth, setIsAuth] = useState(false)
    const [error, setError] = useState("")
    // const isAuth = useAuth().isAuth
    const dispatch = useDispatch()

    const handlePassChange = (e) => {
        setPassword(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const userCredit = await signInWithEmailAndPassword(auth, email, password);
            const userData = {
                email: userCredit.user.email,
                id: userCredit.user.uid,
                token: userCredit.user.accessToken
            }
            setIsAuth(true)
            return userData
        } catch (e) {
            setError(e.message);
        }
    }

    return !isAuth ? (
            <div>
                <form onSubmit={handleSubmit}>
                <p>Fill in the form below to login to your account.</p>
                <div>
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                </div>
                <div>
                    <input
                        placeholder="Password"
                        name="password"
                        onChange={handlePassChange}
                        value={password}
                        type="password"
                    />
                </div>
                <div>
                    {error && <p>{error}</p>}
                    <button onClick={() => dispatch(loginThunk({auth, email, password}))}>LoginThunk</button>
                    <button type="submit">Login</button>
                </div>
                <hr/>
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
                </form>
            </div>
        ) :
        (<Navigate to='/chats'/>)
}

export default Login