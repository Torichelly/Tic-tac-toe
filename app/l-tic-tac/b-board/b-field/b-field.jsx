'use strict'

require('./Style.scss');
var React = require('react');

const Classes = {
    ROOT_CLASS: 'b-field'
};

class BField extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div className={this.rootClass()} onClick={this.props.onClick}>
        {this.getMarker()}
        </div>;
    }

    getMarker() {
        return this.props.value;
    }

    rootClass() {
        return Classes.ROOT_CLASS
    }
}

module.exports = BField;