import {Button} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import * as React from "react";

const FormMessage = ({find, text, setText, textComp, handleAddMessage}) => {
	
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
			        onClick={() => handleAddMessage(find)}>Send</Button>
		</div>
	)
}

export default FormMessage