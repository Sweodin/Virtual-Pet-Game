import React, { useState } from "react";
import '../../src/style/shop/shop.css';
import {
  Beer,
  Wine
} from "../assets/form/food-drinks.js"
const DrinkStore = ({points, setPoints}) => {

  const foodItems = [
    {
      id: 1,
      name: "Beer",
      description: "Quench your furry friends thirst with a cold beer.",
      cost: 15,
      img: Beer,
    },
    {
      id: 2,
      name: "Wine",
      description: "Round, dry and flavors from nuts, apples and cilantro.",
      cost: 20,
      img: Wine,
    },

  ];

  const handleBuy = (cost) => {
    if (points >= cost) {
      setPoints(points - cost);
    } else {
      alert("Sorry, you do not have enough points!");
    }
  };

  return (
<div className="mainContainer">
  {foodItems.map((food) => (
    <div key={food.id} className="foodItem">
      <div className="foodDetails">
        <h3>{food.name}</h3>
        <p>{food.description}</p>
        <p>Cost: {food.cost} points</p>
        <button
          onClick={() => handleBuy(food.cost)}
          disabled={points < food.cost}
        >
          Buy
        </button>
      </div>
      <img src={food.img} alt={food.name} className="foodImage" />
    </div>
  ))}
</div>

  );
};

export default DrinkStore;