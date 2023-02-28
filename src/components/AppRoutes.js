import * as React from "react"
import {Routes, Navigate, Route} from "react-router-dom"
import Header from "./Header"
import {Container} from "@mui/material"
import Home from "../pages/Home"
import ChatsContainer from "../containers/ChatsContainer"
import Profile from "../pages/Profile"
import Exchange from "../pages/Exchange"
import SignUp from "../pages/SignUp"
import Login from "../pages/Login"

const AppRoutes = () => {

    return (
        <>
            <Header/>
            <main>
                <Container fixed className="container">
                    <Routes>
                        <Route exact path='/' element={<Home/>}/>
                        <Route path='/chats' element={<ChatsContainer/>}>
                            <Route path=':chatId' element={<ChatsContainer/>}/>
                        </Route>
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/exchange' element={<Exchange/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/signup' element={<SignUp/>}/>
                        <Route path='*' element={<Navigate to='/'/>}/>
                    </Routes>
                </Container>
            </main>
        </>
    )
}

export default AppRoutes