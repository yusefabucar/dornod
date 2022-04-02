import React, { useEffect } from "react";
import { NextQuestion } from "./nextQuestion";

export default function OptionsView(props) {
  var joker = props.joker;

  useEffect(() => {
    !joker ? useJoker() : null;
  }, [joker]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function useJoker() {
    var wrongAswers = [];
    while (wrongAswers.length < 2) {
      var wrong = getRandomInt(4);
      wrong !== ind ? wrongAswers.push(wrong) : console.log("doNothing");
      wrongAswers[0] === wrongAswers[1]
        ? wrongAswers.pop()
        : console.log("same option");
    }

    wrongAswers.forEach(e => {
      document.getElementById("option" + e).style.display = "none";
    });
  }

  const ind = getRandomInt(4);

  var temp = props.options[ind];
  props.options[ind] = props.options[0];
  props.options[0] = temp;

  //console.log(ind, props);
  return (
    <React.Fragment>
      <div className="row">
        {!props.next ? (
          props.options.map((e, id) => (
            <div key={id} className="col ">
              <button
                className="btn-warning "
                id={"option" + id}
                onClick={() => {
                  if (id === ind) {
                    props.setNext();
                  } else {
                    props.isTrue(false);
                  }
                }}
              >
                {e}
              </button>
            </div>
          ))
        ) : (
          <NextQuestion
            onClick={() => {
              props.isTrue(true);
              //setVisible();
            }}
          />
        )}
      </div>
    </React.Fragment>
  );
}
