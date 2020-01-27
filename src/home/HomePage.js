import React, { Component } from "react";
import { Gif } from "../gifs/Gif";
import { Nav } from "../nav/Nav";
import { Auth } from "../util/Auth";
import { TagSelect } from "./TagSelect";
import { USER_URL } from "../constants";

class HomePage extends Component {
  auth = new Auth();
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      isEdit: false,
      displayGifs: []
    };
  }

  // Get user data on mount
  async componentDidMount() {
    try {
      const headers = new Headers({
        "Content-Type": "application/json"
      });

      const params = { method: "GET" };

      const response = await this.auth.request(USER_URL, params, headers);

      this.setState({
        gifs: response.gifs || [],
        displayGifs: response.gifs || []
      });
    } catch (err) {
      console.log(err);
    }
  }

  toggleEdit = () => {
    this.setState({
      isEdit: !this.isEdit
    });
  };

  // Update the tag of the current gif
  handleChange = event => {
    const gifs = this.state.gifs.map(gif => {
      return event.target.name === gif.id
        ? {
            ...gif,
            category: event.target.value
          }
        : gif;
    });
    this.setState({
      gifs
    });
  };

  // Filter gifs based on selected value
  handlSelect = event => {
    if (event.target.value === "all") {
      this.setState({
        displayGifs: this.state.gifs
      });
      return;
    }
    this.setState({
      displayGifs: this.state.gifs.filter(
        ({ category }) => category === event.target.value
      )
    });
  };

  handleSave = async () => {
    try {
      const headers = new Headers({
        "Content-Type": "application/json"
      });

      const params = {
        method: "PUT",
        body: JSON.stringify({ gifs: this.state.gifs })
      };

      const response = await this.auth.request(USER_URL, params, headers);

      this.setState({
        isEdit: false,
        gifs: response.gifs,
        displayGifs: response.gifs
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        <Nav location={this.props.location.pathname} />
        <div className="hero-body has-background-light">
          <div className="container">
            <div className="columns">
              <div className="column">
                <h3 className="title has-text-dark">
                  Home{" "}
                  {this.state.gifs.length === 0 && "- search to add more gifs"}
                </h3>
              </div>
              <div className="column tag-select">
                <TagSelect
                  gifs={this.state.gifs}
                  handleSelect={this.handlSelect}
                />
              </div>
            </div>
            <div className="content">
              {/* If there are gifs either show the edit or save button depending
          on state  */}
              {this.state.gifs.length > 0 &&
                (this.state.isEdit ? (
                  <button
                    className="button is-primary"
                    onClick={() => this.handleSave()}
                  >
                    Save!
                  </button>
                ) : (
                  <button
                    className="button is-primary"
                    onClick={() => this.toggleEdit()}
                  >
                    Add Tags!
                  </button>
                ))}
            </div>
            <div id="gifList" className="columns">
              {this.state.displayGifs.map(gif => (
                <div key={gif.id} className="column is-one-quarter gif-label">
                  <div>
                    <Gif gif={gif.url} />
                  </div>
                  {this.state.isEdit ? (
                    <div>
                      <input
                        className="input"
                        type="text"
                        name={gif.id}
                        maxLength="15"
                        onChange={this.handleChange}
                      />
                    </div>
                  ) : (
                    <div className="content">
                      <h3 className="title has-text-primary">
                        {gif.category || "GifLibrary"}
                      </h3>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { HomePage };
