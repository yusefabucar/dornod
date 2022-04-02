import React, { Component } from "react";
import Loader from "../components/loader";
import QuestionView from "../components/questionView";
import OptionsView from "../components/optionsView";
import Lottie from "react-lottie";
import * as animationData from "../lottie/again.json";
import * as animationData1 from "../lottie/win.json";
import { CSSTransition } from "react-transition-group";
import { TryAgain } from "./tryAgain";

export default class FetchContainer extends Component {
  state = {
    loading: true,
    questionNumber: 1,
    gameOver: false,
    gameWin: false,
    resetTimer: false,
    joker: true,
    next: false,
    startTimer: true,
    points: 0
  };

  renderError() {
    return <div>I'm sorry! Please try again.</div>;
  }

  renderLoading() {
    return <Loader />;
  }

  handleTimer() {
    this.setState({ resetTimer: false });
  }

  timeOut() {
    this.props.timeOut();
  }

  handleJoker() {
    this.setState({ joker: false });
  }

  stopTimer() {
    this.setState({ startTimer: false });
  }

  getPoints(num) {
    this.setState({ points: num });
  }

  renderContent(number) {
    //console.log(this.state.time);
    return (
      <CSSTransition
        in={!this.state.gameOver}
        appear={true}
        timeout={1500}
        classNames="fade"
      >
        <div>
          {this.state.joker ? (
            <button
              id="joker"
              className="btn-lg btn-success"
              style={{ marginBottom: "30px" }}
              onClick={() => this.handleJoker()}
            >
              50/50
            </button>
          ) : null}

          <QuestionView
            stop={() => this.stopTimer()}
            getPoints={e => this.getPoints(e)}
            startTimer={this.state.startTimer}
            number={number}
            reset={this.state.resetTimer}
            handleTimer={() => this.handleTimer()}
            timeOut={() => this.timeOut()}
          />
          <div className="alert bg-dark" style={{ color: "white" }}>
            {this.state.turn.results[number].question}
          </div>
          <OptionsView
            next={this.state.next}
            setNext={() => this.setNext()}
            joker={this.state.joker}
            isTrue={e => this.isTrue(e)}
            options={[
              this.state.turn.results[number].correct_answer,
              ...this.state.turn.results[number].incorrect_answers
            ]}
          />
        </div>
      </CSSTransition>
    );
  }

  setNext() {
    this.setState({ next: true, resetTimer: true });
  }

  isTrue(props) {
    if (this.state.questionNumber === 10) {
      this.setState({ gameWin: true });
    } else {
      props
        ? this.setState({
            startTimer: true,
            next: false,
            questionNumber: this.state.questionNumber + 1
          })
        : this.setState({ gameOver: true });
    }
    //console.log(this.state);
  }

  componentDidMount() {
    fetch(
      `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=${
        this.props.difficulty
      }&category=${this.props.category}`
    )
      .then(res => res.json())
      .then(
        turn => this.setState({ loading: false, turn }),
        error => this.setState({ loading: false, error })
      );
  }

  render() {
    //console.log(this.state.next);
    if (this.state.loading) {
      return this.renderLoading();
    }
    if (this.state.error) {
      return this.renderError();
    } else {
      if (this.state.gameOver) {
        return (
          <CSSTransition
            in={this.state.gameOver}
            appear={true}
            timeout={1500}
            classNames="fade"
          >
            <div>
              <div
                className="alert alert-dark bg-danger"
                style={{ color: "white" }}
              >
                I'm Sorry. Game Over!
              </div>
              <div style={{ marginTop: "30px" }}>
                <Lottie
                  height={300}
                  width={300}
                  options={{
                    loop: true,
                    animationData,
                    autoplay: true,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice"
                    }
                  }}
                />
                <TryAgain />
              </div>
            </div>
          </CSSTransition>
        );
      }
      if (this.state.gameWin) {
        return (
          <React.Fragment>
            <div class="alert alert-success" style={{ color: "black" }}>
              <h1>You Won!</h1>
              <h2>{this.state.points} Points</h2>
            </div>
            <Lottie
              height={300}
              width={300}
              options={{
                loop: true,
                animationData: animationData1,
                autoplay: true,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice"
                }
              }}
            />
          </React.Fragment>
        );
      } else {
        return this.renderContent(this.state.questionNumber);
      }
    }
  }
}
