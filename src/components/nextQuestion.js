import React from "react";
import Lottie from "react-lottie";
import * as animationData from "../lottie/congrats.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
export function NextQuestion(props) {
  return (
    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
      <Lottie width={300} height={300} options={defaultOptions} />
      <button onClick={() => props.onClick()} className="btn-lg btn-info">
        Next Question
      </button>
    </div>
  );
}
