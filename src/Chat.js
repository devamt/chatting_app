import React,{ useEffect, useState } from 'react';
import './Chat.css';
import {Avatar,IconButton} from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './Firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';


function Chat() {
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();


    useEffect(() =>{
        if(roomId){
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => setRoomName(snapshot.data().name));


            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp","asc")
                .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())  ));
                
        }
    },[roomId]);


    const sendMessage = (e) => {
        e.preventDefault();
        console.log("you typed >>>",input);

        db.collection("rooms").doc(roomId).collection("messages").add({
            message : input,
            name : user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    }


    return (
        <div className="chat">

            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*5000)}.svg`}/>

                <div className="header__info">
                    <h3> {roomName} </h3>
                    <p> Last seen </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>

            </div>

            <div className="chat__body">
                {messages.map((message) => (
                    <p className={`chat__message ${true && "chat__receiver"}`}>
                        {message.message}
                        <span className="chat__timestamp"> {new Date(message.timestamp?.toDate()).toUTCString()} </span>
                    </p>
                ))}
                
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input  value={input}
                    onChange={ (e) => setInput(e.target.value) }
                    placeholder="Type a message" type="text"></input>
                    <button onClick={sendMessage} type="submit">Send a message </button>
                </form>
                <MicIcon />
            </div>
            
        </div>
    )
}

export default Chat
