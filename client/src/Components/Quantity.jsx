import React, { useState } from 'react';

const Quantity = () => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div>
      <form>
        <label id='quantity-label'>
          Quantity: &nbsp;
          <input
            type='number'
            value={quantity}
            id='input'
            min='1'
            max='20'
            onChange={(e) => {
              setQuantity(e.target.value);
              // setCost(20 * e.target.value);
            }}
          ></input>
        </label>
        <button>Add To Cart</button>
      </form>
    </div>
  );
};

export default Quantity;
