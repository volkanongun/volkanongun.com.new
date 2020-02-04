import Counter from "./Counter";
import ReactDOM from 'react-dom';
import React from 'react';

console.log("hello console");

function App(){
	return <div>
		<h2>I'm React</h2>
		<Counter />
	</div>
}

ReactDOM.render(<App />, document.getElementById('app'))