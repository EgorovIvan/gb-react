import * as React from 'react';
import './scss/style.scss';
import AppRoutes from "./components/AppRoutes"
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
				<AppRoutes/>
			</ThemeProvider>
		</div>
	
	);
}

export default App;



