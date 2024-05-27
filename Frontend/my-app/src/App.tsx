import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface Dialog {
    id: number;
    name: string;
    avatar: number;
}

interface User {
    id: number;
    name: string;
    phone: string;
    lastOnline: number;
    aboutMe: string;
    avatar?: number;
}

interface Message {
    id: number;
    owner: number;
    receiveid: number;
    time: number;
    text: string;
}

export const Dialogs = () => {
    const [userId, setUser] = useState(0);
    const [dialogs, setDialogs] = useState<Dialog[]>([]);
    const [selectedDialog, setSelectedDialog] = useState<Dialog | null>(null);
    const [selectedMessages, setSelectedMessages] = useState<Message[]>([]);
    const [newMessageText, setNewMessageText] = useState('');
    const [userData, setUserData] = useState<Map<number, User>>(new Map());

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const tmp = parseInt(event.target.value);
        if(tmp > 0)
            fetch(`http://localhost:3000/api/dialogs/${tmp}`, { credentials : "include" })
            .then(response => response.json())
            .then(data => { setUser(tmp); setSelectedDialog(null); setDialogs(data); });
        else
        {
            setDialogs([]);
            setSelectedDialog(null);
        }
    };

    const loadUserData = (id: number[]) => {
        for(let i = 0; i < id.length; i++)
            {
                if(userData.has(id[i])) continue;

                fetch(`http://localhost:3000/api/user/${id[i]}`, { credentials : "include" })
                .then(response => response.json())
                .then((response: User) => {
                    setUserData(userData => new Map(userData.set(id[i], response)));
                })
            }
    };

    const handleDialogClick = (dialog: Dialog) => {
        setSelectedDialog(dialog);
        fetch(`http://localhost:3000/api/messages/${userId}/${dialog.id}`, { credentials : "include" })
            .then(response => response.json())
            .then(data => { let id: number[] = [];
                data.map((value) => { if(id.findIndex((value2) => value.owner == value2) == -1) id.push(value.owner); });
                loadUserData(id);
                setSelectedMessages(data);
            });
    };

    const handleSendMessage = () => {
        const message = {
            owner: userId,
            receiveid: selectedDialog?.id,
            time: new Date().getTime() / 1000,
            text: newMessageText,
        };
        fetch(`http://localhost:3000/api/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message),
        })
            .then(response => response.json())
            .then((newMessage) => {
                setSelectedMessages([newMessage, ...selectedMessages]);
                setNewMessageText('');
            });
    };

    return (
        <div className="dialogs-page">
            <h1>Dialogs</h1>
            <input type="text" placeholder="Enter User ID" onChange={handleInputChange} />
            {!selectedDialog && (
            <ul>
                {dialogs.length < 1 ? "" : dialogs.map((dialog, index) => (
                    <li key={index} onClick={() => handleDialogClick(dialog)}>
                        {dialog.name}
                    </li>
                ))}
            </ul>)}
            {selectedDialog && (
                <div className="selected-dialog">
                    <h2>{selectedDialog.name}</h2>
                    <input
                        type="text"
                        value={newMessageText}
                        onChange={(event) => setNewMessageText(event.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                    <ul>
                        {selectedMessages.map((message, index) => (
                            <li key={index} className="message">
                                <span>
                                    {userData.has(message.owner) ? userData.get(message.owner)?.name : ""} ({new Date(message.time * 1000).toLocaleTimeString()}) - {message.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};