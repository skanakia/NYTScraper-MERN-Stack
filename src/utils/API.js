
import axios from "axios";

// const BASEURL  = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
// const APIKEY   = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
// const queryFix = "&q=";

// const API = {
//   getArticles: function() {
//     return axios.get(process.env.REACT_APP_API_HOST + "/api/articles");
//   },
//   saveArticle: function(article) {
//     return axios.post(process.env.REACT_APP_API_HOST + "/api/articles", { article });
//   },
//   deleteArticle: function(id) {
//     console.log('in API delete article ')
//     return axios.delete(process.env.REACT_APP_API_HOST + `/api/articles/${id}`);
//   },
//   favoriteArticle: function(article) {
//     article.favorited = !article.favorited;
//     const { _id, favorited } = article;
//     return axios.patch(process.env.REACT_APP_API_HOST + `/api/articles/${_id}`, { favorited });
//   },
//   search: function(query) {
//   	console.log('full query: '+ BASEURL + APIKEY + queryFix + query);
//     return axios.get(BASEURL + APIKEY + queryFix + query);
//   }
// };

// export default API;





const API = {
    // Retrieves all articles from the db
    getArticles: function() {
        axios.get("/scrape");
        return axios.get("/articles");
        
    },
    // Saves a new article to the db
    saveArticle: function(id) {
        return axios.get("/scrape");
    },
    // Deletes an article from the db
    unsaveArticle: function(id) {
        return axios.get("/scrape");
    },
    // Toggles an article's favorite property in the db
    addNote: function(id) {
        return axios.get("/scrape");
    },
    deleteNote: function(noteId, articleId) {
        return axios.get("/scrape");
    }
  };
  
  export default API;