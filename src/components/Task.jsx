import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaTrello } from 'react-icons/fa';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import M from "materialize-css";
import axios from 'axios';

import { formatDate } from '../helpers/formatHelper';

function Task(props) {
  const { id, setIsRefresh } = props;

  const history = useHistory();

  const failTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `/tasks/${id}/fail`;
      const authorization = `Bearer ${token}`;
      const headers = { Authorization: authorization };

      axios.post(url, {}, { headers });
      setIsRefresh(Math.random());
      M.toast({ html: 'Tarefa atualizada com sucesso', classes: 'green' });
      } catch (error) {
        let messageUser = 'Um erro ocorreu';
        const { response } = error;

        if (response) {
          const { status } = response;
          if (status === 403) {
            messageUser = 'Você não possui acesso!';
          }
          if (status === 409) {
            messageUser = 'A task já encontra-se concluída ou com falha!';
          }
        } else {
          const { message } = error;
          messageUser = message;
        }

        M.toast({ html: messageUser, classes: 'red' });
        history.push('/');
      }
  };

  const concludeTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `/tasks/${id}/conclude`;
      const authorization = `Bearer ${token}`;
      const headers = { Authorization: authorization };

      axios.post(url, {}, { headers });
      setIsRefresh(Math.random());
      M.toast({ html: 'Tarefa concluída com sucesso', classes: 'green' });
      } catch (error) {
        let messageUser = 'Um erro ocorreu';
        const { response } = error;

        if (response) {
          const { status } = response;
          if (status === 403) {
            messageUser = 'Você não possui acesso!';
          }
          if (status === 409) {
            messageUser = 'A task já encontra-se concluída ou com falha!';
          }
        } else {
          const { message } = error;
          messageUser = message;
        }

        M.toast({ html: messageUser, classes: 'red' });
        history.push('/');
      }
  }

  const { name, date, url } = props;
  return (
    <div className="row task">
      <div className="row">
        {url ? (
          <div>
            <h6 className="truncate col s10">{name}</h6>
            <a
              href={url}
              target="_blank"
              className="black-text"
              rel="noopener noreferrer"
            >
              <FaTrello className="col s2 trello-icon"/>
            </a>
          </div>
        ) : (
          <div>
            <h6 className="truncate col s10">{name}</h6>
          </div>
        )}
        <div>
          <span className="right date-task">{formatDate(date)}</span>
        </div>
      </div>
      {!url ? (
        <div className="actions">
          <FiCheckCircle
            size={20}
            className="right green-text action-card"
            onClick={concludeTask}
          />
          <FiXCircle
            size={22}
            className="right red-text action-card"
            onClick={failTask}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Task;
