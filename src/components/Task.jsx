import React from 'react';
import { FaTrello } from 'react-icons/fa';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

import { formatDate } from '../helpers/formatHelper';

function Task(props) {
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
              <FaTrello className="col s2" style={{ marginTop: '5px' }} />
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
        <div
          className=""
          style={{
            borderTopStyle: 'double',
            borderTopColor: 'black',
          }}
        >
          <FiCheckCircle
            size={20}
            className="right green-text"
            style={{
              marginTop: '10px',
              marginRight: '10px',
              marginBottom: '10px',
            }}
          />
          <FiXCircle
            size={22}
            className="right red-text"
            style={{
              marginTop: '10px',
              marginRight: '10px',
              marginBottom: '10px',
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Task;
