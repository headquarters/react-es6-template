import React from 'react';
import Panel from './components/Panel';

require('./styles/app.scss');

var Application = React.createClass({
    render: function() {
        return (
            <div className="application">
                <Panel text="Hello world!" />
            </div>
        );
    }
});

module.exports = Application;
