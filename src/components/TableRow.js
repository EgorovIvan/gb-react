import * as React from "react";


const TableRow = ({item}) => {
	return (
		<div>
			<hr style={{width: "600px"}}/>
			<div className='table'>
				<div className='table__row'>
					{item?.CharCode}
				</div>
				<div className='table__row'>
					{item?.ID}
				</div>
				<div className='table__row'>
					{item?.NumCode}
				</div>
				<div className='table__row'>
					{item?.Previous}
				</div>
				<div className='table__row'>
					{item?.Value}
				</div>
			</div>
		</div>
	)
}

export default TableRow