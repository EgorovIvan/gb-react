import * as React from 'react';
import './scss/style.scss';
import {Routes, Route, Link, Navigate} from 'react-router-dom';
import Home from "./components/Home";
import Chats from "./components/Chats";
import Profile from "./components/Profile";
import {Container} from '@mui/material';
import {ThemeProvider, createTheme} from '@mui/material/styles';

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
				<header className='header'>
					<div className="container">
						<div className='header__list'>
							<h3 className="title">React</h3>
							<h4><Link to='/'>Home</Link></h4>
							<h4><Link to='/chats'>Chats</Link></h4>
							<h4><Link to='/profile'>Profile</Link></h4>
						</div>
					</div>
				</header>
				
				<main>
					
					<Container fixed className="container">
						<Routes>
							<Route path='/' element={<Home/>}/>
							<Route path='/chats' element={<Chats/>}>
								<Route path=':chatId' element={<Chats/>}/>
								</Route>
							<Route path='/profile' element={<Profile/>}/>
							<Route path='*' element={<Navigate to='/'/>}/>
						</Routes>
					
					</Container>
				</main>
			
			</ThemeProvider>
		</div>
	
	);
}

export default App;



