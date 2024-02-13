import React, { useState, useEffect } from 'react';
import List from '../List/List';
import '../pages/MainPage.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomModal from '../Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark, faTrash, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const MainPage = () => {
    // const tasks = [
    //     { id: 1, title: "Buy groceries", day: "Monday", completed: false },
    //     { id: 2, title: "Clean the house", day: "Monday", completed: true }

    // ];

    const [title, setTitle] = useState('');
    const [day, setTaskDate] = useState('');
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const userId = localStorage.getItem("userId");

    const [selectedDate, setSelectedDate] = useState(new Date());
    

    const fetchData = async () => {
        try {
          const formattedDate = selectedDate.toISOString().split('T')[0]; // Конвертуємо дату в строку у форматі 'YYYY-MM-DD'
    
          const response = await axios.get(`http://localhost:3002/tasks/allTasks/${userId}`, {
            params: {
              selectedDate: formattedDate,
            },
          });
    
          setData(response.data.data);
          console.log(data);
        } catch (error) {
          // alert("Can't load data...");
        }
    };
    
      fetchData();

    const fetchCreatingTask = async () => {
        try {
            

          const response = await axios.post(`http://localhost:3002/tasks/createTask/${userId}`, {
            title,
            day,
          });
    
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;

          closeModal();
          navigate("/main");
          
        } catch (error) {
          console.error('Error:', error);
          alert("Something went wrong")
        }
      };

      const deleteCompleted = async()=>{
        try {
          const response = await axios.delete(`http://localhost:3002/tasks/deleteCompleted/${userId}`, {
            data: { day },
          });
      
          console.log(response.data); 
        } catch (error) {
          console.error('Error during deleteCompleted:', error);
          alert('Error deleting completed tasks'); 
        }
      }



    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };


    const handleDateChange = (date) => {
        setSelectedDate(date);
        fetchData();
      };

    return(
        
        <div className='mainPage'>
            <div className="topElements">
                <div className="dateContainer">
                    <h3>Day</h3>
                    <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy" 
                    className="date"
                    />
                </div>

                <div>
                
                <button onClick={openModal}><FontAwesomeIcon icon={faPlus} /> Add</button>
                <button onClick={deleteCompleted}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                <button onClick={()=>{navigate("/rooms")}}><FontAwesomeIcon icon={faDoorOpen} /> Rooms</button>
                </div>
                <CustomModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                >
                    <button onClick={closeModal} className='closeButton'><FontAwesomeIcon icon={faXmark} /></button>
                    <h2>Add new task</h2>
                    <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    /><br/>
                    <input
                        type="date"
                        id="date"
                        placeholder="Select a date"
                        value={day}
                        onChange={(e) => setTaskDate(e.target.value)}
                    /><br></br>
                    <button className='addButton' onClick={fetchCreatingTask}><FontAwesomeIcon icon={faPlus} /> Create a task</button>

                    
                </CustomModal>
            </div>
            
            <div className="container">
                <List tasks={data}></List>
            </div>
        </div>
    );
}

export default MainPage;