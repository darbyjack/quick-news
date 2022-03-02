import React, { Component } from "react"
import "../styles/style.scss"
const { v4: uuidv4 } = require('uuid');

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
          'x-api-key': 'P7LEOCujzt2RqSaWBeImz1spIoLq7dep7x983yQc',
          'x-graphql-query-uuid': 'livestory---PostsWithGraph{"livestory_id":"h_03f0d7de5c9d6c55d8f338a3c3ba232a","startId":null}---e2451a5f7c563cbe6f9688458c5048f51fdfacf26dc216e18a72f11afc1b401d'
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
        {this.state.data.map(n => <article className="message" key={n.id}>
      <div>
        <div>
          <h2 className="message-header">{n.headline[0].plaintext} | {n.byline[0].plaintext}<span>{n.lastPublishDateFormatted}</span></h2>
          {n.content.map(content => <p className="message-body" key={uuidv4()}>{content.plaintext}</p>)}
        </div>
      </div>
    </article>)}
      </div>
    )
  }
}

export default IndexPage
