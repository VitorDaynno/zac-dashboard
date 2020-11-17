import React from 'react';
import { FaTrello, FaRegSadTear } from 'react-icons/fa';

import { formatDate } from '../helpers/formatHelper';

function Task(props) {
  const { name, date, url } = props;
  return (
    <div className="row task">
      <div className="">
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
            <FaRegSadTear className="col s2" style={{ marginTop: '5px' }} />
          </div>
        )}
        <div>
          <span className="right date-task">{formatDate(date)}</span>
        </div>
      </div>
    </div>
  );
}

export default Task;
