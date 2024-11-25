import React from 'react';
import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory();

  return (
    <button onClick={() => history.goBack()} className="back-button">
      <i className="fas fa-arrow-left"></i> Volver
    </button>
  );
};

export default BackButton;
