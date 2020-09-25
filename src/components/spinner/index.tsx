import React from 'react';

const Spinner = (props: any): any => {
  const { cssName } = props;

  return (
    <div className="d-flex align-content-center flex-wrap justify-content-center overlay spinnerTag">
      <div
        className={`spinner-border ${cssName || 'text-ytb'} `}
        style={{ width: '3rem', height: '3rem' }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
