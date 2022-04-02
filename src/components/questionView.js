import React from "react";

export default class QuestionView extends React.Component {
  state = { time: 15, points: 0 };

  setTimer() {
    if (this.state.time >= 0) {
      this.setState({ time: this.state.time - 1 });
    }
    if (this.state.time === 0) {
      this.props.timeOut();
    }
  }

  timer() {
    this.interval = setInterval(() => this.setTimer(), 1500);
  }

  componentDidMount() {
    this.timer();
    this.props.stop();
  }

  componentDidUpdate() {
    if (this.props.reset) {
      this.props.getPoints(this.state.points);
      clearInterval(this.interval);

      this.setState({
        time: 15,
        points: this.state.points + this.state.time * 100,
        reset: 0
      });
      this.props.handleTimer();
    }

    if (this.props.startTimer) {
      this.timer();
      this.props.stop();
    }
  }

  render() {
    return (
      <div
        className="alert alert-dark bg-danger"
        style={{
          display: "flex",
          justifyContent: "space-around",
          color: "white"
        }}
      >
        <span>Question {this.props.number}/10</span>
        <span>{this.state.points} Points</span>
        <span>Remaining time:{this.state.time}</span>
      </div>
    );
  }
}
