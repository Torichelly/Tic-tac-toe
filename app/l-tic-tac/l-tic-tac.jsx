'use strict';

require('./Style.scss');
var React = require('react'),
    Board = require('./b-board/b-board.jsx');

const Classes = {
    ROOT_CLASS: 'l-tic-tac'
};

const Markers = {
    CROSS: 'X',
    CIRCLE: 'O'
}

class LTicTac extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div className={this.rootClass()}>
                    <div className={this.rootClass() + '__title'}>
                        Tic-tac-toe
                    </div>
                    <Board/>
                </div>;
    }

    rootClass() {
        return Classes.ROOT_CLASS
    }
}

module.exports = LTicTac;
