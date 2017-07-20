'use strict'

require('./Style.scss');
var React = require('react');
var Field = require('./b-field/b-field.jsx')

const Classes = {
    ROOT_CLASS: 'b-board'
};

class BBoard extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    componentWillMount() {

    }

    render() {
        let fields = [];
        for(let i = 0; i < 9; i++) {
            fields.push(
                <Field key={i} value={this.props.fieldsState[i]} onClick={() => this.props.onClick(i)}/>
            );
        }
        return <div className={this.rootClass()}>{fields}</div>;
    }

    rootClass() {
        return Classes.ROOT_CLASS
    }
}

module.exports = BBoard;