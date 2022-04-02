import React from "react";
import * as animationData from "../lottie/loader.json";
import Lottie from "react-lottie";

export default function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return <Lottie options={defaultOptions} height={40} width={40} />;
}
