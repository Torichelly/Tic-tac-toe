'use strict';

require('./Style.scss');
var React = require('react'),
    Board = require('./b-board/b-board.jsx');

const Classes = {
    ROOT_CLASS: 'l-tic-tac'
};

class LTicTac extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            putDown: 'X',
            counter: 0,
            fieldsState: new Array(9).fill(null)
        }
    }

    componentDidMount() {
        console.log(this.state);
    }

    render() {
        return <div className={this.rootClass()}>
            <div className={this.rootClass() + '__title'}>Tic-tac-toe</div>
        <Board fieldsState={this.state.fieldsState} onClick={(i) => this.handleClick(i)}/>
        </div>;
    }

    handleClick(i) {
        if(!this.state.fieldsState[i]) {
            this.setState({
            fieldsState: this.getNewFieldsState(i),
            putDown: this.togglePutDown(),
            counter: this.counter + 1
        });
        }
    }

    getNewFieldsState(i) {
        let res = this.state.fieldsState;
        res[i] = this.state.putDown;
        return res;
    }

    togglePutDown() {
        return this.state.putDown == 'X'? 'O': 'X'; 
    }

    rootClass() {
        return Classes.ROOT_CLASS
    }
}

module.exports = LTicTac;
