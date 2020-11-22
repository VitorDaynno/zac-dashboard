import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaTrello } from 'react-icons/fa';
import axios from 'axios';
import M from 'materialize-css';
import moment from 'moment';

import Column from './components/Column';

function Dashboard() {
  const history = useHistory();
  const [spinTrello, setSpinTrello] = useState(0);
  const [isRefresh, setIsRefresh] = useState(0);

  const columns = [
    { id: 1, name: 'Atrasados', filter: `?end_date=${moment().format()}` },
    {
      id: 2,
      name: 'Hoje',
      filter: `?start_date=${moment()
        .startOf('day')
        .format()}&end_date=${moment().endOf('day').format()}`,
    },
    {
      id: 3,
      name: 'Amanhã',
      filter: `?start_date=${moment()
        .add(1, 'days')
        .startOf('day')
        .format()}&end_date=${moment().add(1, 'days').endOf('day').format()}`,
    },
    {
      id: 4,
      name: 'Semana',
      filter: `?start_date=${moment()
        .add(2, 'days')
        .startOf('day')
        .format()}&end_date=${moment().add(1, 'week').endOf('day').format()}`,
    },
    {
      id: 5,
      name: 'Mês',
      filter: `?start_date=${moment()
        .add(1, 'week')
        .startOf('day')
        .format()}&end_date=${moment().add(1, 'month').endOf('day').format()}`,
    },
    {
      id: 6,
      name: 'Ano',
      filter: `?start_date=${moment()
        .add(1, 'month')
        .startOf('day')
        .format()}&end_date=${moment().add(1, 'year').endOf('day').format()}`,
    },
  ];

  const updateTrello = async () => {
    try {
      setSpinTrello(1);

      const token = localStorage.getItem('token');
      const url = `/trello-crawler/integrate-cards`;
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
        {columns.map(({ id, name, filter }) => (
          <Column
            key={id}
            title={name}
            filter={filter}
            isRefresh={isRefresh}
            setIsRefresh={setIsRefresh}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
