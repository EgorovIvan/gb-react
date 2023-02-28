import * as React from "react";

const MessageComponent = ({find}) => {
    const messageList = () => {
        return (
            find ?
                find.messages?.map((item, id) => [
                    <div className="messages__item" key={id}>
                        <h4 >Text: {item.text}</h4>
                        <p className="messages__author">Author: {item.author}</p>
                    </div>
                ])
                :
                <h3 className="null">Чат не выбран</h3>
        )
    }
    return (
        <div className="wrapper">
            <div className="chat">
                {messageList()}
            </div>
        </div>
    )
}

export default MessageComponent