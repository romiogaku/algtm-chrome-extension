import * as React from "react";
import Search from "./Search";
import Grid from "./Grid";
import axios from "axios";
import Alert from "react-s-alert";

const instance = axios.create({
  baseURL: process.env.REACT_APP_AIKATSUP_API_BASE_URL,
  timeout: 1000
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      list: []
    };
  }
  handleSubmit(e) {
    if (!this.state.word) {
      return;
    }
    instance
      .get("/v1/search", {
        params: {
          word: this.state.word
        }
      })
      .then(response => {
        const list = response.data.result;
        if (!list) {
          this.setState({ ...this.state, list: [] });
          return;
        }
        this.setState({ ...this.state, list });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChang(e) {
    this.setState({ ...this.state, word: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleSubmit(e);
    }
  }

  render() {
    return (
      <div className="app">
        <Search
          word={this.state.word}
          onChange={e => this.handleChang(e)}
          onKeyPress={e => this.handleKeyPress(e)}
        />
        <Grid list={this.state.list} />
        <Alert stack={{ limit: 1 }} />
      </div>
    );
  }
}

export default App;
