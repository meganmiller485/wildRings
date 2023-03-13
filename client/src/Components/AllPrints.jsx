import React, { useState } from 'react';
import '../CSS/AllPrints.css';
import Quantity from './Quantity';
import ring from '../assets/Ring.png';

const AllPrints = ({ prints }) => {
  return (
    <div>
      <h1 className='print-header'>ALL PRINTS</h1>
      <div className='print-container-description'>
        All prints are hand made and created from a tree stump from within the
        clear cut area.
      </div>
      <div className='allprints-container'>
        {prints.length > 0 &&
          prints.map((print) => {
            return (
              <div
                className='single-print-container'
                key={print.id}
              >
                <div>{print.title}</div>

                <img
                  id='ringImg'
                  src={ring}
                  alt='img'
                ></img>

                <div>{print.description}</div>
                <div>Price: ${print.cost}.00</div>
                <Quantity />
                <div>
                  <b>Accociated Protection Groups:</b> {print.groups}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllPrints;
