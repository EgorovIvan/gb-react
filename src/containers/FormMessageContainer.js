import {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getChatList} from "../redux/store/chats/selectors";
import {getChatsThunk, addMessageThunk} from "../redux/slice/chats";
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


    const handleAddMessage = ({id}) => {
        if (find) {
            let newMessage = {
                author: 'You',
                text: text,
            }
            const userId = id
            let messageId = 1
            if (find.messages) {
                messageId = find.messages.length
            }
            dispatch(addMessageThunk({userId, newMessage, messageId}))
            setAddMessage(newMessage)
            newMessage = {
                author: find.name,
                text: "text...",
            }
            messageId = messageId + 1

            setTimeout(() => {
                dispatch(addMessageThunk({userId, newMessage, messageId}))
                setAddMessage(newMessage)
            }, 1500);

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