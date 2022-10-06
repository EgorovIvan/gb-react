import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {useParams, Link} from "react-router-dom"
import '../scss/style.scss';
import {Box, Button, Grid, List, ListItem, IconButton, ListItemText, OutlinedInput} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel'
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useDispatch, useSelector} from "react-redux";
import {addChat, removeChat, addMessage} from "../slice/chats";
import {getChatList} from '../store/chats/selectors'
import {shallowEqual} from "react-redux";

const Chats = () => {
	
	const [openForm, setOpenForm] = useState(false)
	const [nameChat, setNameChat] = useState('')
	const textComp = useRef(null)
	let {chatId} = useParams()
	const chats = useSelector(getChatList, shallowEqual)
	const dispatch = useDispatch()
	
	
	const handleOpenForm = () => {
		setOpenForm(true)
	}
	
	const handleAddChat = () => {
		const newChat = {
			id: chats.length,
			name: nameChat,
			messages: []
		}
		setOpenForm(false)
		if (nameChat.length > 0) {
			dispatch(addChat(newChat))
		}
		setNameChat('')
	}
	
	const handleRemoveChat = (el) => {
		dispatch(removeChat(el))
	}
	
	return (
		<div>
			<Grid container spacing={2} className="grid">
				<Grid>
					<List sx={{width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}>
						<h4>Friends</h4>
						{chats.map((el) => (
							<ListItem
								key={el.id}
								disableGutters
								secondaryAction={
									<IconButton aria-label="cancel" onClick={() => handleRemoveChat(el)}>
										<CancelIcon/>
									</IconButton>
								}
							>
								<Link to={`${el.id}`}>
									<ListItemText primary={`${el.name}`}/>
								</Link>
							</ListItem>
						))}
						{!openForm ? <Button className="form__send" variant="contained" onClick={handleOpenForm}>CHAT
								ADD</Button> :
							<div className='add-chat'>
								<OutlinedInput
									className='input'
									id="outlined-adornment-weight"
									aria-describedby="outlined-weight-helper-text"
									placeholder='name friend'
									onChange={event => setNameChat(event.target.value)}
								/>
								<Button className="form__send" variant="contained"
								        onClick={handleAddChat}><AddCircleOutlineIcon/></Button>
							</div>
						}
					</List>
				</Grid>
				<Grid>
					<MessageComponent chatId={chatId}/>
					<Box
						sx={{
							width: 430,
							height: 60,
							backgroundColor: 'primary.dark',
							borderRadius: 2,
							margin: 1,
							'&:hover': {
								backgroundColor: 'primary.main',
								opacity: [0.9, 0.8, 0.7],
							},
						}}
					>
						<FormMessage chatId={chatId} textComp={textComp}/>
					</Box>
				</Grid>
			</Grid>
		</div>
	)
}

export default Chats

const FormMessage = ({chatId, textComp}) => {
	const [robotMessage, setRobotMessage] = useState({})
	const [flag, setFlag] = useState(false)
	const [text, setText] = useState('');
	const chats = useSelector(getChatList, shallowEqual)
	const dispatch = useDispatch()
	
	const handleAddMessage = () => {
		const newMessage = {
			text: text,
			author: 'You'
		}
		if (chats[chatId] && chatId) {
			dispatch(addMessage({id:chatId, data:newMessage}))
			setFlag(true)
		} else {
			alert('Необходимо выбрать чат')
		}
		setText('')
	}
	
	useEffect(() => {
		textComp.current?.focus()
	}, [chats])
	
	useEffect(() => {
		
		setTimeout(() => {
			if (flag && chatId && chats[chatId]) {
				setRobotMessage({
					text: 'Text friend',
					author: `${chats[chatId].name}`,
				})
			}
		}, 1500)
		
	}, [flag]);
	
	useEffect(() => {
		if (Object.keys(robotMessage).length > 0) {
			dispatch(addMessage({id:chatId, data:robotMessage}))
			setFlag(true)
		}
		setFlag(false)
	}, [robotMessage])
	
	return (
		<div className="form">
							<textarea
								rows={1}
								className="form__message"
								ref={textComp}
								value={text}
								placeholder='Message'
								onChange={event => setText(event.target.value)}>
							</textarea>
			<Button variant="contained" endIcon={<SendIcon/>} className="form__send"
			        onClick={handleAddMessage}>Send</Button>
		</div>
	)
}

const MessageComponent = ({chatId}) => {
	const chats = useSelector(getChatList, shallowEqual)
	
	return (
		<div className="wrapper">
			<div className="chat">
				{chatId && chats[chatId] ? chats[chatId].messages.map((item, id) => [<div
						className="messages__item"
						key={id}><h4 className="">Text: {item.text}</h4>
						<p>Author: {item.author}</p>
					</div>]) :
					<h3>Чат не выбран</h3>
				}
			</div>
		</div>
	)
}