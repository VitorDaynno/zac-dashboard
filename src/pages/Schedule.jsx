import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaTrello } from 'react-icons/fa';
import axios from 'axios';
import M from 'materialize-css';

import { schedule } from '../config/columns';
import ColumnDay from '../components/ColumnDay';
import { getDayWeek, addTime } from '../helpers/formatHelper';

function Schedule() {
  const history = useHistory();
  const [spinTrello, setSpinTrello] = useState(0);
  const [isRefresh, setIsRefresh] = useState(0);

  const columns = [
    ...schedule,
  ];

  const updateTrello = async () => {
    try {
      setSpinTrello(1);

      const token = localStorage.getItem('token');
      const url = `/api/trello-crawler/integrate-cards`;
      const authorization = `Bearer ${token}`;
      const headers = { Authorization: authorization };

      await axios.post(url, {}, { headers });

      setSpinTrello(0);
      setIsRefresh(isRefresh + 1);
      M.toast({ html: 'Atualizado com sucesso', classes: 'green' });
    } catch (error) {
      let messageUser = 'Um erro ocorreu';
      const { response } = error;

      if (response) {
        const { status } = response;
        if (status === 403) {
          messageUser = 'Você não tem permissão para executar essa ação';
        }
      } else {
        const { message } = error;
        messageUser = message;
      }

      M.toast({ html: messageUser, classes: 'red' });
      setSpinTrello(0);
      history.push('/');
    }
  };

  
  const calculeDate = (weekDay) => {
    const today = new Date();
    const todayWeek = getDayWeek(today);
    const date = todayWeek > weekDay ? addTime(today, {days: -(weekDay!==0 ? (todayWeek - weekDay): todayWeek )}) : addTime(today, {days: (weekDay - todayWeek) });
    return date;
  }

  return (
    <div>
      <div className="center title">
        <h3>
          Zac - Dashboard{' '}
          <FaTrello
            size={20}
            onClick={updateTrello}
            style={{ animation: `spin ${spinTrello}s linear infinite` }}
          />
        </h3>
      </div>
      <div className="columns">
        {columns.map(({ id, name, startHour, finalHour, weekDay }) => (
          <ColumnDay
            key={id}
            title={name}
            startHour={startHour}
            finalHour={finalHour}
            date={calculeDate(weekDay)}
            weekDay={weekDay}
          />
        ))}
      </div>      
    </div>
  );
}

export default Schedule;
