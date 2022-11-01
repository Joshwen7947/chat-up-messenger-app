import React, { useEffect, useState } from 'react';
import { FormControl, Input } from '@material-ui/core';
import Message from './Message';
import './App.css';
import db from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/compat/firestore';
import FlipMove from 'react-flip-move';
import IconButton from '@mui/material/IconButton';

import SendIcon from '@mui/icons-material/Send';

// useState -> Variable in react
// useEffect -> Code executed on a condition in react
function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState('');

	useEffect(() => {
		db.collection('messages')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
				);
			});
	}, []);
	useEffect(() => {
		setUsername(prompt('Enter your name'));
	}, []);

	const sendMessage = (event) => {
		// Logic to send the message
		event.preventDefault();
		db.collection('messages').add({
			message: input,
			username: username,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setInput('');
	};

	return (
		<div className="App">
			<img src={'/logo.png'} alt="Chat Up Logo" height={'150px'} />
			<h1>Chat Up </h1>
			<h2>Welcome {username}</h2>
			<form className="app__form">
				{/* form control is from material ui */}
				<FormControl className="app__formControl">
					<Input
						className="app__input"
						placeholder="Enter a message"
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>

					<IconButton
						className="app__iconButton"
						disabled={!input}
						variant="outlined"
						color="primary"
						type="submit"
						onClick={sendMessage}
					>
						<SendIcon />
					</IconButton>
				</FormControl>
			</form>
			<FlipMove>
				{messages.map(({ id, message }) => (
					<Message key={id} username={username} message={message} />
				))}
			</FlipMove>
		</div>
	);
}

export default App;
