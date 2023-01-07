/* eslint-disable react/no-array-index-key */
import React from "react";
import { instanceOf, number } from "prop-types";

function Carousel({ steps, currentindex }) {
  console.log("steps", steps, currentindex);
  return (
    <div className="h-full flex flex-col w-full">
      {
        steps[currentindex]
      }
      <div className="flex space-x-5 justify-center my-8">
        {
          steps.map((step, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full ${index === currentindex ? "bg-gray-500" : "bg-gray-300"}`}
            />
          ))
        }
      </div>
    </div>
  );
}

Carousel.propTypes = {
  steps: instanceOf(Array).isRequired,
  currentindex: number.isRequired
};

export default Carousel;
