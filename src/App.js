import React, { useState } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message';
import './App.css';

function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	console.log(input);
	console.log(messages);

	const sendMessage = (event) => {
		// Logic to send the message
		event.preventDefault();
		setMessages([...messages, input]);
		setInput('');
	};
	return (
		<div className="App">
			<h1>Chat Up App</h1>
			<form>
				{/* form control is from material ui */}
				<FormControl>
					<InputLabel>Enter a message...</InputLabel>
					<Input
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
					<Button
						disabled={!input}
						variant="outlined"
						color="primary"
						type="submit"
						onClick={sendMessage}
					>
						Send Message
					</Button>
				</FormControl>
			</form>
			{messages.map((message) => (
				<Message text={message} />
			))}
		</div>
	);
}

export default App;
