import * as React from "react"
import {useEffect, useRef, useState} from "react"
import {useParams} from "react-router-dom"
import '../scss/style.scss'
import {useDispatch, useSelector} from "react-redux"
import {addChat, addChatThunk, getChatsThunk, removeChat} from "../slice/chats"
import {getChatList} from '../store/chats/selectors'
import {shallowEqual} from "react-redux"
import Chats from "../components/Chats";

const ChatsContainer = () => {
	
	const [openForm, setOpenForm] = useState(false)
	const [nameChat, setNameChat] = useState('')
	const [addChat, setAddChat] = useState('')
	const textComp = useRef(null)
	let {chatId} = useParams()
	const chats = useSelector(getChatList, shallowEqual)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getChatsThunk())
	}, [addChat])

	const handleOpenForm = () => {
		setOpenForm(true)
	}

	const handleAddChat = () => {
		const newChat = {
			id: chats[chats.length - 1].id + 1,
			name: nameChat,
			messages: []
		}
		setOpenForm(false)
		if (nameChat.length > 0) {
			// dispatch(addChat(newChat))
			dispatch(addChatThunk(newChat))
		}
		setNameChat('')
		setAddChat(newChat)
	}
	
	const handleRemoveChat = (el) => {
		dispatch(removeChat(el))
	}
	
	return (
		<Chats chats={chats} chatId={chatId} textComp={textComp} openForm={openForm} setNameChat={setNameChat}
			   handleAddChat={handleAddChat} handleOpenForm={handleOpenForm} handleRemoveChat={handleRemoveChat}/>
	)
}

export default ChatsContainer


