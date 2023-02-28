import * as React from "react"
import {Link} from "react-router-dom"
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import useAuth from '../hooks/useAuth';
const Header = () => {
    const isAuth = useAuth().isAuth

    return (
        <header className='header'>
            <div className="container">
                <div className='header__list'>
                    <h3 className="title">React</h3>
                    <h4><Link to='/'>Home</Link></h4>
                    <h4><Link to='/chats'>Chats</Link></h4>
                    <h4><Link to='/exchange'>Exchange</Link></h4>
                    <h4><Link to='/profile'>Profile</Link></h4>
				</div>
				<div className='header__sign'>
                    {
                        !isAuth ?
                            <>
                                <Link to="/login"><LoginIcon/></Link>
                                <Link to="/signup"><AppRegistrationIcon/></Link>
                            </> :
                            <LogoutIcon/>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header