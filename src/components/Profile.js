import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Profile = () => {
	const isChecked = useSelector(state => state)
	const dispatch = useDispatch()
	
	return (
		<div className='profile'>
			<Checkbox
				{...label}
				value={isChecked}
				onChange={() => {dispatch({type: 'SET_DATA_OF_USER'})}}
				defaultChecked
				sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
			/>
		</div>
	)
}

export default Profile