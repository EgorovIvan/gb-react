import { useState} from "react"
import {Link, Navigate} from "react-router-dom"
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../services/firebase";

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handlePassChange = (e) => {
        setPassword(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const userCredit = await createUserWithEmailAndPassword(auth, email, password);
            const userData = {
                email: userCredit.user.email,
                id: userCredit.user.uid,
                token: userCredit.user.accessToken
            }
            return userData
        } catch (e) {
            setError(e.code);
        }
    }

    console.log(error)
    return !(error === 'auth/email-already-in-use') ? (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Fill in the form below to register new account.</p>
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
                    <button type="submit">Login</button>
                </div>
                <hr/>
                <p>
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    ) : <Navigate to='/login'/>
}

export default SignUp

