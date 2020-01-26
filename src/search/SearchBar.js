import React, { Component } from "react";
import { Auth } from "../util/Auth";

class SearchBar extends Component {
  auth = new Auth();
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  search = async () => {
    try {
      const query = encodeURI(this.state.text);

      const results = await this.auth.gifSearch(query, 0);

      this.props.onSubmit(
        results.data.map(element => {
          const formElement = { ...element, checked: false };
          return formElement;
        })
      );

      this.props.update(query, results.pagination.total_count);
      this.setState({ text: "" });
    } catch (err) {
      console.log(err);
    }
  };

  handleClick = event => {
    event.preventDefault();

    this.search();
  };

  keyPress = event => {
    if (event.keyCode === 13) {
      event.preventDefault();

      this.search();
    }
  };

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  render() {
    return (
      <>
        <h3 className="title has-text-dark">Gif Search</h3>
        <div className="input-container">
          <input
            className="input"
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="Search"
            required
            onKeyDown={this.keyPress}
          />
        </div>
        <button
          type="submit"
          onClick={this.handleClick}
          className="button is-primary"
        >
          Go!
        </button>
      </>
    );
  }
}

export { SearchBar };
