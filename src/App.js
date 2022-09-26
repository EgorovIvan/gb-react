import * as React from 'react';
import './scss/style.scss';
import {useEffect, useState, useRef} from "react";
import {Box, Container, Button, TextField, Grid, List, ListItem, IconButton, ListItemText} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import {ThemeProvider, createTheme} from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: "#03a9f4",
		},
	},
});

function App() {
	const [messageList, setMessageList] = useState([])
	const [userMessage, setUserMessage] = useState({})
	const [robotMessage, setRobotMessage] = useState({})
	const textComp = useRef(null)
	const chatList = [{
		id: 1,
		name: 'Без Марины',
	},
		{
			id: 2,
			name: 'Работа',
		},
		{
			id: 3,
			name: 'Семья',
		},
		{
			id: 4,
			name: 'Шерегеш',
		}]
	
	useEffect(() => {
		setMessageList([...messageList, {
			id: 1,
			text: "Чтобы установить мир, нужно просто быть вместе, любить друг друга и приносить ближним мир и радость",
			author: 'Mother Teresa'
		}]);
	}, []);
	
	useEffect(() => {
		if (Object.keys(userMessage).length > 0) {
			setMessageList([...messageList, userMessage])
		}
		
		setTimeout(() => {
			if (messageList.length) {
				setRobotMessage({
					id: messageList.length + 1,
					text: `Добрый день ${userMessage.author}`,
					author: 'Robot',
				})
			}
		}, 1500)
		
	}, [userMessage]);
	
	useEffect(() => {
		if (Object.keys(robotMessage).length > 0) {
			setMessageList([...messageList, robotMessage])
		}
	}, [robotMessage])
	
	return (
		<div className="app">
			<ThemeProvider theme={theme}>
				<header>
					<div className="container">
						<h3 className="title">React</h3>
					</div>
				</header>
				<main>
					<Container fixed className="container">
						<Grid container spacing={2} className="grid">
							<Grid>
								<List sx={{width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}>
									{chatList.map((value) => (
										<ListItem
											key={value.id}
											disableGutters
											secondaryAction={
												<IconButton aria-label="comment">
													<CommentIcon/>
												</IconButton>
											}
										>
											<ListItemText primary={`Chat: ${value.name}`}/>
										</ListItem>
									))}
								</List>
								<Box
									sx={{
										width: 300,
										height: 300,
										backgroundColor: 'primary.dark',
										'&:hover': {
											backgroundColor: 'primary.main',
											opacity: [0.9, 0.8, 0.7],
										},
									}}
								>
									<FormMessage setUserMessage={setUserMessage} userMessage={userMessage}
									             messageList={messageList} textComp={textComp}/>
								</Box>
							</Grid>
							<Grid>
								<MessageComponent messageList={messageList}/>
							</Grid>
						</Grid>
					
					
					</Container>
				</main>
			</ThemeProvider>
		</div>
	);
}

export default App;

const FormMessage = ({setUserMessage, userMessage, messageList, textComp}) => {
	
	const [text, setText] = useState('');
	const [author, setAuthor] = useState('');
	
	const addMessage = () => {
		setUserMessage({
			id: messageList.length + 1,
			text: text,
			author: author
		});
	}
	
	useEffect(() => {
		textComp.current?.focus()
	}, [userMessage])
	
	return (
		<div className="form">
			<textarea
			           rows={4}
			           className="form__message"
			           ref={textComp}
			           onChange={event => setText(event.target.value)}></textarea>
			<TextField id="outlined-basic" label="Author" variant="outlined" className="form__author" type="text"
			           defaultValue="Введите имя"
			           onChange={event => setAuthor(event.target.value)}/>
			<Button variant="contained" endIcon={<SendIcon/>} className="form__send" onClick={addMessage}>Send</Button>
		</div>
	)
}

const MessageComponent = ({messageList}) => {
	return (
		<div className="wrapper">
			<div className="chat">
				{messageList.map(item => [<div className="messages__item" key={item.id}>
					<p className="">Text: {item.text}</p>
					<h3>Author: {item.author}</h3>
				</div>])}
			</div>
		</div>
	)
}

