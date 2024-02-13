import React, { useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const Room = ({room}) =>{
    const {room_id, name} = room;
      
    return (
        <div className="task">
            <div className="name">
                <h3>{name}</h3>
            </div>
        </div>);
}

export default Room;