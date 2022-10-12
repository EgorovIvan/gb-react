import {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getChatList} from "../store/chats/selectors";
import {addMessage} from "../slice/chats";
import * as React from "react";
import FormMessage from "../components/FormMessage";

const FormMessageContainer = ({chatId, textComp}) => {
	const [text, setText] = useState('');
	const chats = useSelector(getChatList, shallowEqual)
	const dispatch = useDispatch()
	const find = chats.find((item) => item.id == chatId)
	
	const addMessageWithThunk = ({id: id, data: message}) => (dispatch, getState) => {
		dispatch(addMessage({id: id, data: message}))
		if (message.author !== `${find.name}`) {
			const robotMessage = {
				text: 'Example',
				author: `${find.name}`,
			}
			setTimeout(() => dispatch(addMessage({id: id, data: robotMessage})), 1500);
		}
	}
	
	const handleAddMessage = ({id: id}) => {
		const newMessage = {
			text: text,
			author: 'You'
		}
		if (find) {
			dispatch(addMessageWithThunk({id: id, data: newMessage}))
		} else {
			alert('Необходимо выбрать чат')
		}
		setText('')
	}
	
	useEffect(() => {
		textComp.current?.focus()
	}, [chats])
	
	
	return (
		<FormMessage find={find} text={text} setText={setText} textComp={textComp} handleAddMessage={handleAddMessage}/>
	)
}

export default FormMessageContainer