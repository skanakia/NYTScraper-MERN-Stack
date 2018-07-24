import React, { Component } from "react";
import API from "../../utils/API";
let v;

class Card extends Component {
    constructor(props) {

        // Required to call original constructor
        super(props);

        // Props are now accessible from here
        v = props;
    };

    state = {
        saved: false
    };


    handleSave = () => {
        API.saveArticle()
            .then(res => 
                this.setState({saved: true})
            );
    };

    showLabel = () => {
        if (this.state.saved === false) {
            return "Save"
        } else {
            return "Unsave"
        }
    }

    render() {
        return (
            <div class="card">
                <h5 class="card-header">{v.title}</h5>
                <div class="card-body">
                    <h5 class="card-title">{v.url}</h5>
                    <p class="card-text">{v.summary}</p>
                    <a href="#" class="btn btn-primary save">{this.showLabel}</a>
                </div>
            </div>

        );
    }
}

export default Card;