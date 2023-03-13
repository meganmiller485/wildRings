import React, { useState } from 'react';
import Quantity from './Quantity';
import '../CSS/Regions.css';
import ring from '../assets/Ring.png';

const Regions = ({ prints }) => {
  const [openPleaseOR, setOpenPleaseOR] = useState(false);
  const [openPleaseCA, setOpenPleaseCA] = useState(false);
  const [openPleaseBC, setOpenPleaseBC] = useState(false);

  const handlePleaseOR = () => {
    setOpenPleaseOR(!openPleaseOR);
  };

  const handlePleaseCA = () => {
    setOpenPleaseCA(!openPleaseCA);
  };

  const handlePleaseBC = () => {
    setOpenPleaseBC(!openPleaseBC);
  };

  return (
    <>
      <h2 className='region-header'>Regions Affected by Clear Cutting</h2>
      <div className='region-container'>
        <div className='region-blocks-container'>
          <div
            id='region-block'
            onClick={handlePleaseOR}
          >
            Oregon
          </div>
          {openPleaseOR ? (
            <div>
              {prints.length > 0 &&
                prints.map((print) => {
                  if (print.location === 'Oregon') {
                    return (
                      <div
                        className='single-print-container-region'
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
                  }
                })}
            </div>
          ) : null}
          <div
            id='region-block'
            onClick={handlePleaseCA}
          >
            California
          </div>
          {openPleaseCA ? (
            <div>
              {prints.length > 0 &&
                prints.map((print) => {
                  if (print.location === 'California') {
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
                  }
                })}
            </div>
          ) : null}
          <div
            id='region-block'
            onClick={handlePleaseBC}
          >
            British Columbia
          </div>
          {openPleaseBC ? (
            <div>
              {prints.length > 0 &&
                prints.map((print) => {
                  if (print.location === 'British Columbia') {
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
                  }
                })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Regions;
