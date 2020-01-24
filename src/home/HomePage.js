import React, { Component } from "react";
import { Gif } from "../gifs/Gif";
import { authedPage } from "../AuthedPage";
import { Auth } from "../util/Auth";
import { USER_URL } from "../constants/Users";

class homePage extends Component {
  auth = new Auth();
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      isEdit: false
    };
  }

  async componentDidMount() {
    try {
      const token = this.auth.getToken();

      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      });

      try {
        const response = await fetch(USER_URL, {
          method: "GET",
          headers
        });
        const responseJson = await response.json();

        this.setState({
          gifs: responseJson.gifs
        });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  }

  toggleEdit = () => {
    this.setState({
      isEdit: !this.isEdit
    });
  };

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

  handleSave = async () => {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    });

    // const info = this.auth.getUserInfo();
    // const payload = {
    //   ...info,
    //   gifs: this.state.gifs
    // };
    try {
      const response = await fetch(USER_URL, {
        headers,
        method: "PUT",
        body: JSON.stringify({ gifs: this.state.gifs })
      });

      const responseJson = await response.json();
      // const response = await axios({
      //   method: "put",
      //   url: USER_URL,
      //   headers: DEFAULT_HEADERS,
      //   data: payload
      // });
      this.setState({
        isEdit: false,
        gifs: responseJson.gifs
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="container">
        <h3 className="title has-text-dark">
          Home {this.state.gifs.length === 0 && "- search to add more gifs"}
        </h3>
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
          {this.state.gifs.map(gif => (
            <div key={gif.gif_id} className="column is-one-quarter gif-label">
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
    );
  }
}

const HomePage = authedPage(homePage);

export { HomePage };
