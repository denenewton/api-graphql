import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useColorMode } from "@chakra-ui/react";
import React from "react";

const CircularProgressBar = ({ rating = 7 }) => {
  const { colorMode } = useColorMode();
  return (
    <div className="max-w-10 mt-[-10px] ml-[11px] font-normal">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
          pathTransitionDuration: 0.5,
          textSize: "34px",
          textColor: `${colorMode === "dark" ? "#fff" : "#111"}`,
          fontWeight: 500,
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
