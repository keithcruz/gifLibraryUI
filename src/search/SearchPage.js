import React, { Component } from "react";
import { navigate } from "@reach/router";
import { Gif } from "../gifs/Gif";
import { SearchBar } from "./SearchBar";
import { Auth } from "../util/Auth";
import { Nav } from "../nav/Nav";
import { USER_URL, OFFSET } from "../constants";

class SearchPage extends Component {
  auth = new Auth();

  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      userGifs: [],
      query: "",
      total: 0,
      offset: 0
    };
  }

  async componentDidMount() {
    try {
      const headers = new Headers({
        "Content-Type": "application/json"
      });

      const params = { method: "GET" };

      const response = await this.auth.request(USER_URL, params, headers);
      this.setState({
        userGifs: response.gifs
      });
    } catch (err) {
      console.log(err);
    }
  }

  updateList = data => {
    this.setState({ gifs: data });
  };

  handleChange = currentGif => {
    const index = this.state.gifs.findIndex(gif => gif.id === currentGif.id);
    const gifs = this.state.gifs.slice();

    gifs[index] = {
      ...currentGif,
      checked: !currentGif.checked
    };

    this.setState({
      gifs
    });
  };

  handleClick = async event => {
    event.preventDefault();
    let userGifs = this.state.userGifs.slice();
    const checkedGifs = this.state.gifs.filter(gif => gif.checked);

    userGifs = userGifs.concat(
      checkedGifs.map(gif => {
        return {
          id: gif.id,
          url: gif.images.original.url,
          category: ""
        };
      })
    );

    try {
      const headers = new Headers({
        "Content-Type": "application/json"
      });

      const params = {
        method: "PUT",
        body: JSON.stringify({ gifs: userGifs })
      };

      const response = await this.auth.request(USER_URL, params, headers);

      this.setState({
        userGifs: response.gifs
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  updateQueryMeta = async (query, total) => {
    this.setState({
      query: query,
      total: total,
      offset: 0
    });
  };

  canDecrement = () => this.state.offset >= OFFSET;

  canIncrement = () => this.state.offset + OFFSET < this.state.total;

  handlePagination = async direction => {
    let currentOffset = this.state.offset;
    if (direction === "previous") {
      if (this.canDecrement()) {
        currentOffset -= 12;
      } else {
        return;
      }
    } else if (direction === "next") {
      if (this.canIncrement()) {
        currentOffset += 12;
      } else {
        return;
      }
    }

    try {
      const results = await this.auth.gifSearch(
        this.state.query,
        currentOffset
      );

      this.updateList(
        results.data.map(element => {
          const formElement = { ...element, checked: false };
          return formElement;
        })
      );

      this.setState({
        text: "",
        offset: currentOffset
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        <Nav location={this.props.location.pathname} />
        <div className="has-background-light search-body">
          <div className="columns is-centered is-vcentered">
            <div className="column has-text-centered is-3">
              <SearchBar
                onSubmit={this.updateList}
                update={this.updateQueryMeta}
              />
            </div>
          </div>

          {!!this.state.gifs.length && (
            <div className="columns is-v-centered">
              <div className="column">
                <button
                  type="submit"
                  onClick={this.handleClick}
                  className="button is-primary"
                >
                  Add!
                </button>
              </div>
            </div>
          )}

          <div
            id="gifList"
            className="columns is-multiline has-background-grey-lighter"
          >
            {this.state.gifs.map(gif => (
              <div key={gif.id} className="column is-one-quarter gif-label">
                <Gif gif={gif.images.original.url} />
                <div className="is-block">
                  <input
                    type="checkbox"
                    name={gif.id}
                    checked={gif.checked}
                    onChange={event => this.handleChange(gif)}
                  />
                </div>
              </div>
            ))}
          </div>
          {!!this.state.gifs.length && (
            <div className="content">
              <div className="columns is-centered is-v-centered">
                <div className="column is-1">
                  <nav className="pagination" role="navigation">
                    <a
                      className="pagination-previous"
                      title="This is the first page"
                      onClick={event => this.handlePagination("previous")}
                      disabled={!this.canDecrement()}
                    >
                      Previous
                    </a>
                    <a
                      className="pagination-next"
                      onClick={event => this.handlePagination("next")}
                      disabled={!this.canIncrement()}
                    >
                      Next page
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export { SearchPage };
