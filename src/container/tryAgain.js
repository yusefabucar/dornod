import React from "react";

export function TryAgain() {
  return (
    <button className="btn-lg btn-dark" onClick={() => location.reload()}>
      Try Again!
    </button>
  );
}
