import React from 'react';

import { formatDate } from '../helpers/formatHelper';

function Task(props) {
  const { name, date, url } = props;
  return (
    <div className="row task">
      {url ? (
        <a
          href={url}
          target="_blank"
          className="black-text"
          rel="noopener noreferrer"
        >
          <h6 className="truncate title-task">{name}</h6>
        </a>
      ) : (
        <h6 className="truncate title-task">{name}</h6>
      )}
      <span className="right date-task">{formatDate(date)}</span>
    </div>
  );
}

export default Task;
