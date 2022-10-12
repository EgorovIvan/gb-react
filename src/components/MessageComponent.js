import * as React from "react";
import {shallowEqual, useSelector} from "react-redux";
import {getChatList} from "../store/chats/selectors";


const MessageComponent = ({chatId}) => {
	const chats = useSelector(getChatList, shallowEqual)
	const find = chats.find((item) => item.id == chatId)
	
	return (
		<div className="wrapper">
			<div className="chat">
				{find ? find.messages.map((item, id) => [<div
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

export default MessageComponent