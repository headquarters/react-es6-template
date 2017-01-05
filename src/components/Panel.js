import React from 'react';

var Panel = React.createClass({
  render: function () {
    if (!this.props.text) {
      return null;
    }

    return (
      <div className={`panel ${this.props.className}`}>
        {this.props.text}
      </div>
    );
  }
});

module.exports = Panel;
