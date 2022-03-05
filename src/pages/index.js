import React, { Component } from "react"
import SEO from "../components/seo";
import "../styles/style.scss"
const { v4: uuidv4 } = require('uuid');
const API_KEY = 'P7LEOCujzt2RqSaWBeImz1spIoLq7dep7x983yQc';
const QUERY_UUID = 'livestory---PostsWithGraph{"livestory_id":"h_6f73164ecc132f5d1c0e4a085c674999","startId":null}---b916b05f3b4e0bb8e04f1aefbd2472fc588c3ccc804883e12b4e1f645985c778';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }


  componentDidMount() {
    fetch(`https://data.api.cnn.io/graphql`, {
      method: 'POST',
      headers: {
          'x-api-key': API_KEY,
          'x-graphql-query-uuid': QUERY_UUID
      }, 
    })
    .then(response => response.json())
    .then(resultData => {
      console.log(resultData)
      this.setState({ data: resultData.data.getLivestoryWebData.unpinnedPosts })
    });
  }

  render() {
    return (
      <div>
        <SEO/>
        {this.state.data.map(n => <article className="message" key={n.id}>
        <h2 className="message-header">{n.headline[0].plaintext} | {n.byline[0].plaintext}<span>{n.lastPublishDateFormatted}</span></h2>
          <ul>
            {n.content.map((content) => {
                if (content.plaintext != null) {
                  return <li className="message-body" key={uuidv4()}>{content.plaintext}</li>
                }
            })}
          </ul>
    </article>)}
      </div>
    )
  }
}

export default IndexPage
