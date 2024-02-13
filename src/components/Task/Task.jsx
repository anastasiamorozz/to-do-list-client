import React, { useState } from 'react';
import './Task.scss';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const Task = ({task}) =>{
    const {task_id, title, day, status} = task;

    const [selectedOption, setSelectedOption] = useState(status);

    const handleSelectChange = async (e) => {
      setSelectedOption(e.target.value);
      const new_status=e.target.value;
      const token = localStorage.getItem('accessToken');

        const response =  await axios.post(
            `http://localhost:3002/tasks/updateStatus/${task_id}`,
            { new_status },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        )

        alert("Success")
    };

    const formattedDate = new Date(task.day).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
      });
      
    return (
        <div className="task">
            <div className="name">
            <div className='status'>
                <select id="comboBox" value={selectedOption} onChange={handleSelectChange}>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
                <h3>{title}</h3>
            </div>
            <p><FontAwesomeIcon icon={faCalendar} />  {formattedDate}</p>
        </div>);
}

export default Task;