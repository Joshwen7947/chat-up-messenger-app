import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message';
import './App.css';
import db from './firebase';

// useState -> Variable in react
// useEffect -> Code executed on a condition in react
function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState('');

	useEffect(() => {
		db.collection('messages').onSnapshot((snapshot) => {
			setMessages(snapshot.docs.map((doc) => doc.data()));
		});
	}, []);
	useEffect(() => {
		setUsername(prompt('Enter your name'));
	}, []);

	const sendMessage = (event) => {
		// Logic to send the message
		event.preventDefault();
		setMessages([...messages, { username: username, text: input }]);
		setInput('');
	};

	return (
		<div className="App">
			<h1>Chat Up App</h1>
			<h2>Welcome {username}</h2>
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
				<Message username={username} message={message} />
			))}
		</div>
	);
}

export default App;
