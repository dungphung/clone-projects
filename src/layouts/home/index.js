import React, { Component } from "react";
// import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./index.css";

// const instance = axios.create({
//   headers: {
//     "Content-type": "application/json; charset=UTF-8",
//     "Access-Control-Allow-Origin": "*"
//   }
// });

export default class Home extends Component {
  state = {
    url: "",
    isLink: false,
    data: null
  };

  checkLink() {
    const r = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
    if (r.test(`https://${this.state.url}`)) {
      this.setState({ isLink: true });
    } else {
      this.setState({ isLink: false });
    }
  }

  onChangeInput = e => {
    this.setState({ url: e.target.value }, this.checkLink);
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ data: null });
    /// request axios
    setTimeout(() => {
      this.setState({
        data: {
          short_link: "https://asdfasdfasdf.cafdsf",
          view: 1,
          long_link: "mp3.zing"
        }
      });
    });
  };

  render() {
    const { data } = this.state;
    return (
      <header className="header">
        <div className="logo-box">Clone</div>
        <div className="text-box">
          <h1 className="heading-primary">
            <span className="heading-primary-main">
              HARNESS EVERY CLICK, TAP AND SWIPE.
            </span>
            <span className="heading-primary-sub">
              Brand, track and optimize every touchpoint with Bitly, the world's
              leading link management platform.
            </span>
          </h1>
          <div className="form-content">
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                className="input-shorten"
                value={this.state.url}
                onChange={this.onChangeInput}
              />
              <button className="btn btn-shorten" disabled={!this.state.isLink}>
                Shorten
              </button>
            </form>
          </div>

          {data && (
            <div className="shorten-content">
              <div className="real-link">
                <a href={data.long_link}>{data.long_link}</a>
              </div>
              <div className="short-link">
                <a href={data.short_link} ref={text => (this.text = text)}>
                  {data.short_link}
                </a>
                <CopyToClipboard text={data.short_link}>
                  <button className="btn btn-copy">Copy</button>
                </CopyToClipboard>

                <span className="info-page">View: {data.view}</span>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }
}
