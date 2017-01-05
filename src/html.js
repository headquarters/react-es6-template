import React from 'react';
import ReactDOM from 'react-dom/server';

var Html = React.createClass({
    render: function() {
        var content = this.props.component ? ReactDOM.renderToString(this.props.component) : '';

        return (
            <html>
                <head>
                    <title>React ES6 Testing Template</title>
                    <link rel="stylesheet" href="/assets/styles.css" />
                </head>
                <body>
                    <div id="content" className="container" dangerouslySetInnerHTML={{__html: content}}/>
                    <script src="/assets/bundle.js" />
                </body>
            </html>
        );
    }
});

module.exports = Html;
