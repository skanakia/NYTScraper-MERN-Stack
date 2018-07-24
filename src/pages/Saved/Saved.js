import React, { Component } from "react";
import API from "../../utils/API";
const Card = require("../../components/Card");



class Saved extends Component {
  state = {
    articles: []
  };

  // When the component mounts, load the next dog to be displayed
  handleArticleScrape = event => {
    API.getArticles()
      .then(res =>
        this.setState({articles: res})
    );
  };

  handleClearArticles = () => {
    this.setState({articles: []})
  };

  render() {
    return (
      <div className="article-dump">
        {this.state.articles.map(article => <Card title= {article.title} id={article.id} url={article.url} summary={article.summary} saved={article.saved}/>)}
      </div>
    );
  }
}

export default Saved;