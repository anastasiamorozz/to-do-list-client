import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Room from '../Room/Room'; 
import RoomsList from '../RoomsList/RoomsList';

const RoomsPage = () => {
  const [data, setData] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/rooms/getUsersRooms/${userId}`);
        setData(response.data); 
      } catch (error) {
        alert("Can't load data...");
      }
    };
  
    fetchData();
  }, [userId]);
  
  console.log(data); 

  return (
    <div>
      <h1>Room List</h1>
      <RoomsList rooms={data}></RoomsList>
    </div>
  );
};

export default RoomsPage;
