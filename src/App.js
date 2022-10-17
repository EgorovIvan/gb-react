import * as React from 'react';
import './scss/style.scss';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from "./components/Home";
import ChatsContainer from "./containers/ChatsContainer";
import Profile from "./components/Profile";
import Exchange from "./components/Exchange";
import {Container} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Header from "./components/Header";

const theme = createTheme({
	palette: {
		primary: {
			main: "#03a9f4",
		},
	},
});

function App() {
	
	return (
		<div className="app">
			<ThemeProvider theme={theme}>
				<Header/>
				<main>
					<Container fixed className="container">
						<Routes>
							<Route path='/' element={<Home/>}/>
							<Route path='/chats' element={<ChatsContainer/>}>
								<Route path=':chatId' element={<ChatsContainer/>}/>
								</Route>
							<Route path='/profile' element={<Profile/>}/>
							<Route path='/exchange' element={<Exchange/>}/>
							<Route path='*' element={<Navigate to='/'/>}/>
						</Routes>
					
					</Container>
				</main>
			
			</ThemeProvider>
		</div>
	
	);
}

export default App;



