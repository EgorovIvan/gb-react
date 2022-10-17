import * as React from "react";
import {Link} from "react-router-dom";


const Header = () => {
	
	return (
		<header className='header'>
			<div className="container">
				<div className='header__list'>
					<h3 className="title">React</h3>
					<h4><Link to='/'>Home</Link></h4>
					<h4><Link to='/chats'>Chats</Link></h4>
					<h4><Link to='/exchange'>Exchange</Link></h4>
					<h4><Link to='/profile'>Profile</Link></h4>
				</div>
			</div>
		</header>
	)
}

export default Header