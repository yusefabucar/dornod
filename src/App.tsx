import * as React from "react";
import "./styles.css";
import Nav from "./Navbar";
import FetchContainer from "../src/container/fetchContainer";
import Logo from "../src/lottie/icon.png";
import Lottie from "react-lottie";
import * as animationData from "./lottie/muscle.json";
import * as animationData1 from "./lottie/category.json";
import * as animationData2 from "./lottie/timesup.json";
import categoriesList from "./components/categorieList";
import { TryAgain } from "./container/tryAgain";

export default class App extends React.Component {
  state = {
    timeOut: false,
    gameStarted: false,
    difficulty: "easy",
    category: 9
  };

  fetchData(diff: string, cat: number) {
    //console.log(diff, cat);
    return (
      <FetchContainer
        timeOut={() => this.setState({ timeOut: true })}
        category={cat}
        difficulty={diff}
      />
    );
  }

  render() {
    const onClick = () => {
      this.setState({
        gameStarted: true
      });
    };

    const handleSelect = (e: any) => {
      this.setState({ [e.target.name]: e.target.value });
    };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    const defaultOptions2 = {
      loop: true,
      autoplay: true,
      animationData: animationData1,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    //console.log(this.state);

    return (
      <div className="App">
        <Nav />
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: "200px",
            height: "auto",
            marginBottom: "40px",
            marginTop: "40px"
          }}
        />

        {!this.state.gameStarted ? (
          <div>
            <h2 style={{ marginBottom: "40px" }}>A Trivia Game</h2>
            <div className="row">
              <div className="col">
                <Lottie options={defaultOptions} height={250} width={200} />
                <h2>Difficulty</h2>

                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="difficulty"
                  onChange={handleSelect}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="col">
                <Lottie options={defaultOptions2} height={250} width={200} />
                <h2>Category</h2>
                <select
                  className="form-control"
                  id="exampleFormControlSelect2"
                  name="category"
                  onChange={handleSelect}
                >
                  {categoriesList.map((e: string, ind: number) => (
                    <option key={ind} value={ind + 9}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="btn-lg btn-danger"
              onClick={onClick}
              style={{ marginTop: "30px" }}
            >
              Start the Game
            </button>
          </div>
        ) : null}

        {this.state.timeOut ? (
          <div>
            <h2>Time's Up</h2>
            <Lottie
              height={200}
              width={200}
              options={{
                loop: true,
                animationData: animationData2,
                autoplay: true,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice"
                }
              }}
            />
            <TryAgain />
          </div>
        ) : this.state.gameStarted ? (
          this.fetchData(this.state.difficulty, this.state.category)
        ) : null}
      </div>
    );
  }
}
