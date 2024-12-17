import React, { useState } from "react";
import '../../src/style/shop/shop.css';
import {
  CheeseBurger,
  Cookie,
  IceCream,
  Taco
} from "../assets/form/food-drinks"

const FoodStore = ({points, setPoints}) => {

  const foodItems = [
    {
      id: 1,
      name: "Cookie",
      description: "Mmmmhmm a warm, soft cookie.",
      cost: 5,
      img: Cookie,
    },
    {
      id: 2,
      name: "Taco",
      description: "Crisp tortilla with yummy stuffing.",
      cost: 10,
      img: Taco,
    },
    {
      id: 3,
      name: "Cheeseburger",
      description: "yummy burger for your furry friend!",
      cost: 15,
      img: CheeseBurger,
    },
    {
      id: 4,
      name: "Ice Cream",
      description: "Strawberry ice cream for those warm days. ",
      cost: 5,
      img: IceCream,
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

export default FoodStore;
