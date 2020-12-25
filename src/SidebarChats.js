import React,{ useEffect, useState } from 'react';
import './SidebarChats.css';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';


function SidebarChats({id,name}) {
    const [seed, setSeed] = useState("");

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[]);

    return (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarchats"> 
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarchat__info">
                    <h2> {name} </h2>
                    <p>message</p>
                </div>
            </div>
        </Link>
        
    )
}

export default SidebarChats
