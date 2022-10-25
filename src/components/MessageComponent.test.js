import * as React from "react"
import { it, expect, describe} from '@jest/globals'
import { render } from '@testing-library/react';
import MessageComponent from "./MessageComponent"


describe('MessageComponent', () => {
	const obj = {
		messages: [
			{ text: 't1', author: 'Mark' },
			{ text: 't2', author: 'John' }
		]
	}
	it('renders MessageComponent', () => {
		const {container} = render(<MessageComponent
			find={obj}/>)
		expect(container.getElementsByClassName('messages__item')).toHaveLength(2)
		expect(container.querySelector('.messages__author').textContent).toEqual("Author: Mark")
	})
})

