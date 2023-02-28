import * as React from "react"
import {useEffect} from "react"
import TableRow from "../components/TableRow";
import {apiThunk} from "../redux/slice/exchange"
import {useDispatch, useSelector} from "react-redux"
import getCurrency from "../redux/store/exchange/selectors"
import {shallowEqual} from "react-redux"


const Exchange = () => {
	
	const {currency, isLoading} = useSelector(getCurrency, shallowEqual)
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(apiThunk())
	}, [])
	
	return (
		<div className='exchange'>
			<h3 className="exchange__title" >Exchange rates</h3>
			<button className="exchange__btn" onClick={() => dispatch(apiThunk())}>Reload</button>
			<div className="table">
				<div className="table__header">CharCode</div>
				<div className="table__header">ID</div>
				<div className="table__header">NumCode</div>
				<div className="table__header">Previous</div>
				<div className="table__header">Value</div>
			</div>
			<hr/>
			{isLoading ?
				'Загрузка ...' :
				currency?.map((item) => <TableRow key={item.ID} item={item}/>)
			}
		</div>
	)
}

export default Exchange