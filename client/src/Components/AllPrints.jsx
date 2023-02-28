import React from 'react';

const AllPrints = ({ prints }) => {
  return (
    <div>
      <h1 className='print-header'>All PRINTS SUMMON YONDER</h1>
      <div className='print-container-description'>
        These are all the super cool prints my sister made!
      </div>
      <div className='allprints-container'>
        {prints.length > 0 &&
          prints.map((print) => {
            const image = print.image;
            return (
              <div
                className='single-print-container'
                key={print.id}
              >
                <div>Title: {print.title}</div>
                <div>
                  <img
                    src={image}
                    alt='img'
                  ></img>
                </div>
                <div>Description: {print.description}</div>
                <div>Accociated Protection Groups: {print.groups}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllPrints;
