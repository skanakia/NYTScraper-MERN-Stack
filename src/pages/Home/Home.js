import React, { Component } from "react";
import API from "../../utils/API";
const Card = require("../../components/Card");



class Home extends Component {
  state = {
    articles: []
  };

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

export default Home;
