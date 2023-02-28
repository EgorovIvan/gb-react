import * as React from "react"
import {useEffect, useRef, useState} from "react"
import {useParams} from "react-router-dom"
import '../scss/style.scss'
import {useDispatch, useSelector} from "react-redux"
import {addChatThunk, getChatsThunk, removeChat} from "../redux/slice/chats"
import {getChatList} from '../redux/store/chats/selectors'
import {shallowEqual} from "react-redux"
import Chats from "../pages/Chats";

const ChatsContainer = () => {

    const [openForm, setOpenForm] = useState(false)
    const [nameChat, setNameChat] = useState('')
    const [addChat, setAddChat] = useState({})
    const textComp = useRef(null)
    let {chatId} = useParams()
    const chats = useSelector(getChatList, shallowEqual)
    const dispatch = useDispatch()
    const find = chats.find((item) => item.id == chatId)

    useEffect(() => {
        dispatch(getChatsThunk())
    }, [addChat])

    const handleOpenForm = () => {
        setOpenForm(true)
    }

    const handleAddChat = () => {

        setOpenForm(false)
        if (nameChat.length > 0) {
            const newChat = {
                id: chats[chats.length - 1].id + 1,
                name: nameChat,
            }
            dispatch(addChatThunk(newChat))
            setAddChat(newChat)
            console.log(newChat)
        }
        setNameChat('')

    }

    const handleRemoveChat = (el) => {
        dispatch(removeChat(el))
    }

    return (
        <>
            <Chats find={find} chats={chats} chatId={chatId} textComp={textComp} openForm={openForm}
                   setNameChat={setNameChat} handleAddChat={handleAddChat} handleOpenForm={handleOpenForm}
				   handleRemoveChat={handleRemoveChat}/>
        </>
    )
}

export default ChatsContainer


