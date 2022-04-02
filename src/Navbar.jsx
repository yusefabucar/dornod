import React, { Component } from "react";

export default class Nav extends Component {
  state = { loading: true, turn: undefined };

  componentDidMount() {
    fetch(`https://opentdb.com/api.php?amount=10&difficulty=medium`)
      .then(res => res.json())
      .then(
        turn => this.setState({ loading: false, turn }),
        error => this.setState({ loading: false, error })
      );
  }

  render() {
    //console.log(this.state);

    return <React.Fragment />;
  }
}
