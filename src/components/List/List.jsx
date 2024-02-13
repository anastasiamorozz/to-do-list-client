import React from 'react';
import './List.scss';
import Task from '../Task/Task';

const List = ({ tasks }) => {
    return (
      <div className="list">
        {tasks && tasks.length === 0 && (
          <h2>No tasks yet!</h2>
        )}
        {tasks && tasks.map((task) => (
          <Task key={task.id} task={task}></Task>
        ))}
      </div>
    );
  }
  

export default List;