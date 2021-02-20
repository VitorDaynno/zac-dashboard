import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaTrello } from 'react-icons/fa';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import M from "materialize-css";
import axios from 'axios';

import CustomModal from './Modal';
import { formatDate, formatTime, toDatetime } from '../helpers/formatHelper';

function TaskCard(props) {
  const { id, name, date, url, isRoutine, isConclude, isFailed } = props;
  const history = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);

  const failTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `/api/tasks/${id}/fail`;
      const authorization = `Bearer ${token}`;
      const headers = { Authorization: authorization };

      await axios.post(url, {}, { headers });
      M.toast({ html: 'Tarefa atualizada com sucesso', classes: 'green' });
      } catch (error) {
        let messageUser = 'Um erro ocorreu';
        const { response } = error;

        if (response) {
          const { status } = response;
          if (status === 403) {
            messageUser = 'Você não possui acesso!';
            history.push('/');
          }
          if (status === 409) {
            messageUser = 'A task já encontra-se concluída ou com falha!';
          }
        } else {
          const { message } = error;
          messageUser = message;
        }

        M.toast({ html: messageUser, classes: 'red' });
      }
  };

  const concludeTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `/api/tasks/${id}/conclude`;
      const authorization = `Bearer ${token}`;
      const headers = { Authorization: authorization };

      await axios.post(url, {}, { headers });
      M.toast({ html: 'Tarefa concluída com sucesso', classes: 'green' });
      } catch (error) {
        let messageUser = 'Um erro ocorreu';
        const { response } = error;

        if (response) {
          const { status } = response;
          if (status === 403) {
            messageUser = 'Você não possui acesso!';
            history.push('/');
          }
          if (status === 409) {
            messageUser = 'A task já encontra-se concluída ou com falha!';
          }
        } else {
          const { message } = error;
          messageUser = message;
        }

        M.toast({ html: messageUser, classes: 'red' });
      }
  }

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const datetime = typeof date === 'object'
    ? date
    : toDatetime(`${date.slice(0, 25)} +00`, 'E, d LLL yyyy HH:mm:ss x');

  return (
    <div className={`task hoverable ${isFailed ? 'red white-text' : ''}`}>
      <span
        className={`truncate task-name ${isConclude ? 'conclude' : ''}`}
        onClick={openModal}
      >
        {name}
      </span>
      <CustomModal
        key={id}
        title={'Detalhe'}
        isVisible={modalIsOpen}
        onConfirm={closeModal}
        onClose={closeModal}
      >
        <div className="row">
          <div className="input-field col s12">
            <input
              id="name"
              type="text"
              value={name}
              readOnly={true}
            />
            <label className="active" htmlFor="name">Nome</label>
          </div>
          <div className="input-field col s12 m6">
            <input
              id="date"
              type="text"
              value={formatDate(datetime)}
              readOnly={true}
            />
            <label className="active" htmlFor="date">Data</label>
          </div>
          <div className="input-field col s12 m6">
            <input
              id="time"
              type="text"
              value={formatTime(datetime)}
              readOnly={true}
            />
            <label className="active" htmlFor="time">Horário</label>
          </div>
          {!url ?
            !isRoutine ? (
              <div className="col s12 m6 right">
                <FiCheckCircle
                  size={20}
                  className="right green-text task-action"
                  onClick={concludeTask}
                />
                <FiXCircle
                  size={22}
                  className="right red-text task-action"
                  onClick={failTask}
                  disabled={isRoutine}
                />
                <label>Ações:</label>
              </div>
            ): null
          : (
            <div className="col s12 m6 right">
              <a
                href={url}
                target="_blank"
                className="blue-text right"
                rel="noopener noreferrer"
              >
                <FaTrello size={20} />
              </a>
              <label>Ações:</label>
            </div>
          )}
        </div>
      </CustomModal>
    </div>
  );
}

export default TaskCard;
