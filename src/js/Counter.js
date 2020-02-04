import React, {useState} from 'react';

export default function Counter(){

	const [count, setCount] = useState(0)

	return <button onClick={() => setCount(previousValue => previousValue+1)}>{count}</button>
}