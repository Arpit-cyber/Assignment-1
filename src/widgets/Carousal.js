import React from "react";
import { Carousel } from "react-bootstrap";

const MOCK_DATA = [
  {
    img: "https://images.unsplash.com/photo-1542219550-37153d387c27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80",
    name: "Nike Shoes",
    desc: "Flat 30% off on Shoes",
    id: 1,
  },
  {
    img: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3270&q=80",
    name: "Camera",
    desc: "Flat 50% off on Camera's",
    id: 2,
  },
];

export default function Carousal() {
  return (
    <Carousel className="h-500">
      {MOCK_DATA.map((item) => (
        <Carousel.Item>
          <img className="d-block w-100 h-500" src={item.img} alt={item.name} />
          <Carousel.Caption>
            <h3>{item.desc}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
