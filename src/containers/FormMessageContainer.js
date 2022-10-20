import {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getChatList} from "../store/chats/selectors";
import {addMessage, getChatsThunk, addMessageThunk} from "../slice/chats";
import * as React from "react";
import FormMessage from "../components/FormMessage";

const FormMessageContainer = ({chatId, textComp}) => {
	const [text, setText] = useState('');
	const [addMessage, setAddMessage] = useState({});
	const chats = useSelector(getChatList, shallowEqual)
	const dispatch = useDispatch()
	const find = chats.find((item) => item.id == chatId)

	useEffect(() => {
		dispatch(getChatsThunk())
	}, [addMessage])

	const addMessageWithThunk = ({id, message}) => (dispatch, getState) => {
		// dispatch(addMessage({id: id, data: message}))
		dispatch(addMessageThunk({id, message}))
		if (message.author !== `${find.name}`) {
			const robotMessage = {
				text: 'Example',
				author: `${find.name}`,
			}
			setTimeout(() => dispatch(addMessageThunk({id, robotMessage})), 1500);
		}
	}
	
	const handleAddMessage = ({id}) => {
		const newMessage = {
			author: 'You',
			text: text,
		}
		if (find) {
			dispatch(addMessageThunk(id, newMessage, find.messages.length))
		} else {
			alert('Необходимо выбрать чат')
		}
		setText('')
		setAddMessage(newMessage)
	}
	
	useEffect(() => {
		textComp.current?.focus()
	}, [chats])
	
	
	return (
		<FormMessage find={find} text={text} setText={setText} textComp={textComp} handleAddMessage={handleAddMessage}/>
	)
}

export default FormMessageContainer