import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';

import Task from './Task';
import {
  formatTime,
  isSameHour,
  addTime,
  toDatetime,
  checkIsBefore,
  getStartOfDay,
  getEndOfDay,
  datetimeToString,
  getDayWeek
} from '../helpers/formatHelper';


function Column(props) {
  const { title, startHour, finalHour, isRefresh, date, weekDay } = props;

  const history = useHistory();
  const [tasks, setTasks] = useState([]);
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const filter = doFilter(weekDay);
        const token = localStorage.getItem('token');
        const url = `/api/scheduled-tasks${filter}`;
        const authorization = `Bearer ${token}`;
        const headers = { Authorization: authorization };

        const response = await axios.get(url, { headers });
        const { tasks, routines } = response.data;
        setTasks(tasks);
        setRoutines(routines);
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
    getTasks();
  }, [isRefresh, history, weekDay]);

  const makePlanner = () => {
    let planner = [];

    let startHourDatetime = toDatetime(`${startHour}:00 +00`, 'HH:mm:00 x', date);
    let start = startHourDatetime.getHours(); 

    let finalHourDatetime = toDatetime(`${finalHour}:00 +00`, 'HH:mm:00 x', date);
    let final = finalHourDatetime.getHours();

    let parcialHour = startHourDatetime;

    do {
      parcialHour = addTime(parcialHour, { hours: 1})
      start = parcialHour.getHours(); 

      planner.push(
            <div key={start} className="schedule">
              <div className="column-day-time">
              {formatTime(parcialHour)}
              </div>
              <div className="column-day-tasks">
                {generateTasks(parcialHour)}
              </div>
            </div>
          )
    } while(start !== final)

    return planner
  }

  const generateTasks = (initialHour) => {
    const availableTasks = tasks.filter((task) => {
      const isSameHourTask = isSameHour(initialHour, (task.due || task.date));

      const hourTask = toDatetime(`${(task.due || task.date).slice(0, 25)} +00`, 'E, d LLL yyyy HH:mm:ss x');
      const finalTaskHour = addTime(hourTask, { minutes: task.duration || 25 })

      const isBeforeTask = checkIsBefore(initialHour, finalTaskHour);
      const isAfterStart = checkIsBefore(hourTask, initialHour);
      
      return isSameHourTask || (isBeforeTask && isAfterStart);
    })

    const availableRoutine = routines.map((routine) => {
      const date = toDatetime(routine.hour, 'HH:mm', initialHour);
      const isSameHourTask = isSameHour(initialHour, date);

      const finalTaskHour = addTime(date, { minutes: routine.duration })

      const isBeforeTask = checkIsBefore(initialHour, finalTaskHour);
      const isAfterStart = checkIsBefore(date, initialHour);
      
      if (isSameHourTask || (isBeforeTask && isAfterStart)) {
        return { id: routine.id, name: routine.name, due: date, isRoutine: true}
      }
      return null;
    })

    const available = [...availableTasks, ...availableRoutine.filter((i)=>i)];

    return available.length > 0 ? 
      available.map((task) => {
          const { id, name, due, url, isRoutine, isConclude, isFailed } = task;
          return (
            <Task
              key={id}
              id={id}
              name={name}
              date={due}
              url={url}
              isRoutine={isRoutine}
              isConclude={isConclude}
              isFailed={isFailed}
            />
          )
        })
      : null;
  }

  const doFilter = (weekDay) => {
    const today = new Date();
    const todayWeek = getDayWeek(today);
    const date = todayWeek > weekDay ? addTime(today, {days: -(weekDay!==0 ? (todayWeek - weekDay): todayWeek )}) : addTime(today, {days: (weekDay - todayWeek) });
    const startDate = getStartOfDay(date);
    const endDate = getEndOfDay(date);

    const day = weekDay === 0 ? 6 : weekDay - 1;

    const filter = `?start_date=${datetimeToString(startDate)}&end_date=${datetimeToString(endDate)}&days=[${day}]`;
    return filter;
  }


  return (
    <div className="column">
      <div className="card column-card">
        <div className="card-content">
          <span className="card-title">{title}</span>          
            {makePlanner()}          
        </div>
      </div>
    </div>
  );
}

export default Column;
