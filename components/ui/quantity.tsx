"use client";
import React, { useState, useEffect } from "react";

const QuantityInput = ({
  pricePerItem,
  onQuantityChange,
}: {
  pricePerItem: number;
  onQuantityChange: (newQuantity: number) => void;
}) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calculateTotalPrice = () => {
    return quantity * pricePerItem;
  };
  useEffect(() => {
    // Invoke the onQuantityChange callback whenever the quantity changes
    onQuantityChange(quantity);
  }, [quantity]); //render only the quantity

  return (
    <div className="flex gap-2">
      <p className="font-semibold">Quantity :</p>
      <button className="border-[1.5px] px-2" onClick={decrement}>
        -
      </button>
      <input
        className="mx-3 w-9 inline-block"
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        min="1"
        disabled
      />
      <button className="border-[1.5px] px-2" onClick={increment}>
        +
      </button>
      {/* <div className="font-semibold pl-9">
        Total Price: {calculateTotalPrice()}$
      </div> */}
    </div>
  );
};

export default QuantityInput;
