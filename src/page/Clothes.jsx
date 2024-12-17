import React, { useState } from "react";
import '../../src/style/shop/shop.css';
import {
  BaseballHat,
  PartyHat,
  FarmersHat,
  Scarf
} from "../assets/form/clothes.js"

const ClothStore = ({points, setPoints}) => {

  const foodItems = [
    {
      id: 1,
      name: "Baseball Hat",
      description: "Make your animal cool and sporty with this cool baseball-hat.",
      cost: 5,
      img: BaseballHat,
    },
    {
      id: 2,
      name: "Party Hat",
      description: "Get your animal ready for the next big party with this fun hat.",
      cost: 10,
      img: PartyHat,
    },
    {
      id: 3,
      name: "Farmers Hat",
      description: "Hoowdy! Whit this farm-hat your animal will feel right at home, cool and keeps the sun away.",
      cost: 15,
      img: FarmersHat,
    },
    {
      id: 4,
      name: "Scarf",
      description: "Keep your furry friend warm and cozy with a nice scarf.",
      cost: 5,
      img: Scarf,
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

export default ClothStore;
