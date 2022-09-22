import './scss/style.scss';
import {useEffect, useState} from "react";

function App() {
	const [messageList, setMessageList] = useState([]);
	const [userMessage, setUserMessage] = useState({});
	const [robotMessage, setRobotMessage] = useState({});
	
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
				});
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
			<header>
				<div className="container">
					<h3 className="title">React</h3>
				</div>
			</header>
			<main>
				<div className="container">
					<MessageComponent messageList={messageList}/>
					<FormMessage setUserMessage={setUserMessage} messageList={messageList}/>
				</div>
			</main>
		</div>
	);
}

export default App;

const FormMessage = ({setUserMessage, messageList}) => {
	
	const [text, setText] = useState('');
	const [author, setAuthor] = useState('');
	
	const addMessage = () => {
		setUserMessage({
			id: messageList.length + 1,
			text: text,
			author: author
		});
	}
	
	return (
		<div className="form">
			<h4 className="form__title">Message:</h4>
			<textarea className="form__message" name="message" cols="30" rows="10"
			          onChange={event => setText(event.target.value)}></textarea>
			<h4 className="form__title">Author:</h4>
			<input className="form__author" type="text" placeholder="ввести имя"
			       onChange={event => setAuthor(event.target.value)}/>
			<button className="form__send" onClick={addMessage}>Send</button>
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