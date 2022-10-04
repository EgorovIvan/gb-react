import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {useParams, Link} from "react-router-dom"
import '../scss/style.scss';
import {Box, Button, Grid, List, ListItem, IconButton, ListItemText, OutlinedInput} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel'
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Chats = () => {
	const [openForm, setOpenForm] = useState(false)
	const [nameChat, setNameChat] = useState('')
	const textComp = useRef(null)
	let {chatId} = useParams()
	const [chatList, setChatList] = useState(
		[
			{
				id: 0,
				name: 'Mark',
				messages: [
					{
						author: 'Mark',
						text: 'Hi'
					},
					{
						author: 'You',
						text: 'Hello'
					}
				]
			},
			{
				id: 1,
				name: 'John',
				messages: [
					{
						author: 'John',
						text: 'What is your name'
					},
					{
						author: 'You',
						text: 'my name is Ivan'
					}
				]
			},
			{
				id: 2,
				name: 'Maria',
				messages: []
			},
			{
				id: 3,
				name: 'Michael',
				messages: []
			}]
	)
	
	const handleOpenForm = () => {
		setOpenForm(true)
	}
	
	const handleAddChat = () => {
		setOpenForm(false)
		if (nameChat.length > 0) {
			setChatList([...chatList, {id: chatList.length, name: nameChat, messages: []}])
		}
		setNameChat('')
		console.log(nameChat.length)
	}
	
	const removeChat = (elemId) => {
		setChatList(chatList.filter(item => item.id !== elemId))
	}
	
	return (
		<div>
			<Grid container spacing={2} className="grid">
				<Grid>
					<List sx={{width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}>
						<h4>Friends</h4>
						{chatList.map((el) => (
							<ListItem
								key={el.id}
								disableGutters
								secondaryAction={
									<IconButton aria-label="cancel" onClick={() => removeChat(el.id)}>
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
					<MessageComponent chatId={chatId} chatList={chatList}/>
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
						<FormMessage chatList={chatList} setChatList={setChatList} chatId={chatId} textComp={textComp}/>
					</Box>
				</Grid>
			</Grid>
		</div>
	)
}

export default Chats

const FormMessage = ({chatList, setChatList, chatId, textComp}) => {
	const [robotMessage, setRobotMessage] = useState({})
	const [flag, setFlag] = useState(false)
	const [text, setText] = useState('');
	
	const addMessage = (id) => {
		let find = chatList.find(item => item.id == id)
		setChatList(chatList.map((item, id) => {
			if (find.id == id) {
				chatList[id].messages.push(
					{
						text: text,
						author: 'You'
					}
				)
				return chatList[id]
			} else {
				return chatList[id]
			}
		}))
		setText('')
		setFlag(true)
	}
	
	useEffect(() => {
		textComp.current?.focus()
	}, [chatList])
	
	useEffect(() => {
		
		setTimeout(() => {
			if (flag && chatId && chatList[chatId]) {
				setRobotMessage({
					text: 'Text friend',
					author: `${chatList[chatId].name}`,
				})
			}
		}, 1500)
		
	}, [flag]);
	
	useEffect(() => {
		if (Object.keys(robotMessage).length > 0) {
			setChatList(chatList.map((item, id) => {
				if (chatId == id) {
					chatList[id].messages.push(robotMessage)
					return chatList[id]
				} else {
					return chatList[id]
				}
			}))
			setText('')
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
			        onClick={() => addMessage(chatId)}>Send</Button>
		</div>
	)
}

const MessageComponent = ({chatId, chatList}) => {
	return (
		<div className="wrapper">
			<div className="chat">
				{chatId && chatList[chatId] ? chatList[chatId].messages.map((item, id) => [<div
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