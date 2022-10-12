import * as React from "react"
import {Link} from "react-router-dom"
import '../scss/style.scss'
import {Box, Button, Grid, List, ListItem, IconButton, ListItemText, OutlinedInput} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import MessageComponent from './MessageComponent'
import FormMessageContainer from '../containers/FormMessageContainer'

const Chats = ({chats, chatId, textComp, openForm, setNameChat, handleAddChat, handleOpenForm, handleRemoveChat}) => {
	
	
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
						<FormMessageContainer chatId={chatId} textComp={textComp}/>
					</Box>
				</Grid>
			</Grid>
		</div>
	)
}

export default Chats


