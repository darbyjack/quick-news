import React from "react"
import { StaticQuery, graphql } from "gatsby"
const { v4: uuidv4 } = require('uuid');

const News = () => (
  <StaticQuery
    query={graphql`
      {
        allCnnArticle {
          nodes {
            id
            headline {
              plaintext
            }
            content {
              plaintext
            }
          }
        }
      }
    `}
    render={data => data.allCnnArticle.nodes.map(n => <article className="message" key={n.id}>
    <div>
      <div>
        <h2 className="message-header">{n.headline[0].plaintext}</h2>
        {n.content.map(content => <p className="message-body" key={uuidv4()}>{content.plaintext}</p>)}
      </div>
    </div>
  </article>)}
  ></StaticQuery>
)

export default News