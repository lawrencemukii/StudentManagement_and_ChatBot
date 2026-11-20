import { useState } from "react";

import "./chatbot.css";

function Chatbot(){
    const[input, setInput] = useState("");
    const[message, setMessage] = useState([
        {   role:"assistant",
            content: "Hello! How can I help you?"
        }
    ]);
    
   
    async function sendMessage(e){
        e.preventDefault();
        if(input.trim() === "") return;

        const userMessage = {role: "user", content: input};
        const botMessage = {role:  "assitant", content:"I am a bot, I will answer you soon..."};
        
        const response = await fetch(
            "http://127.0.0.1:8000/api/chat",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: input }),
            }            
        );
        
        const data = await response.json();
        //setAnswer(data.answer);
        const assistantMessage = { role: "assistant", content: data.answer };
        setMessage((previousMessages) => [...previousMessages, userMessage, assistantMessage]);
        setInput("");
    }

    
    const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }    
    };
    window.addEventListener('keydown', handleKeyDown);
    return(
        
        <div className="chatTopContainer">
            <div className="topBar">
                <h1>AI Chatbot</h1>
                <nav>
                    <a href="/">Home Page</a>
                    <a href="/StudentManager">Student Manager</a>
                </nav>
            </div>
            <div className="chat-container">
                <div className="chat-box">
                    {message.map((msg, index) => (
                        <div key={index} className={'message ${msg.role}'}> {msg.content}
                        </div>
                    ))}
                </div>
                <form onSubmit={sendMessage}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message ..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Chatbot;