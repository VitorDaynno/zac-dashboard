import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';

import Task from './Task';

function Column(props) {
  const { title, filter, isRefresh, setIsRefresh } = props;

  const history = useHistory();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks(filter) {
      try {
        const token = localStorage.getItem('token');
        const url = `/api/tasks${filter}`;
        const authorization = `Bearer ${token}`;
        const headers = { Authorization: authorization };

        const response = await axios.get(url, { headers });
        const { tasks } = response.data;
        setTasks(tasks);
      } catch (error) {
        let messageUser = 'Um erro ocorreu';
        const { response } = error;

        if (response) {
          const { status } = response;
          if (status === 403) {
            messageUser = 'Você não possui acesso!';
          }
        } else {
          const { message } = error;
          messageUser = message;
        }

        M.toast({ html: messageUser, classes: 'red' });
        history.push('/');
      }
    }
    getTasks(filter);
  }, [filter, isRefresh, history]);

  return (
    <div className="column">
      <div className="card column-card">
        <div className="card-content">
          <span className="card-title">{title}</span>
          {tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              name={task.name}
              date={task.due}
              url={task.url}
              setIsRefresh={setIsRefresh}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Column;
