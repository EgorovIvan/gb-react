import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import Checkbox from '@mui/material/Checkbox';
import {getProfile} from '../store/profile/selectors'
import {shallowEqual} from "react-redux";
import {change} from "../slice/profile";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Profile = () => {
	const isChecked = useSelector(getProfile, shallowEqual)
	const dispatch = useDispatch()
	
	return (
		<div className='profile'>
			<Checkbox
				{...label}
				value={isChecked}
				onChange={() => {dispatch(change())}}
				defaultChecked
				sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
			/>
		</div>
	)
}

export default Profile