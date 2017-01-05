import React from 'react';
import ReactDOM from 'react-dom/server';
import App from './app';
import Html from './html';

require('./styles/app.scss');

module.exports = function(req, res, next) {
    console.log('Page requested');
    res.send('<!doctype html>\n' + 
        ReactDOM.renderToString(<Html component={<App />} />)
    );
}