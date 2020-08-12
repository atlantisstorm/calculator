import React from 'react';

const History = ({ history }) => {
  return (
    <div className="history">
      <span>History</span>
      <div>
      { history.map((item, index) => (
          <div key={index} className="item" >
            <span>{item.calculation}</span><br />
            <span className="result">{item.result}</span>
          </div>
      ))}
      </div>
    </div>
  )
}

export default History;