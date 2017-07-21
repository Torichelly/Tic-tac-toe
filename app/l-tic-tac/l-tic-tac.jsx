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

        this.winner = null;
    }

    render() {
        return <div className={this.rootClass()}>
            <div className={this.rootClass() + '__title'}>Tic-tac-toe</div>
        <Board fieldsState={this.state.fieldsState} onClick={(i) => this.handleClick(i)}/>
        </div>;
    }

    handleClick(i) {
        if((!this.winner) && this.state.counter < 9) {
            this.markDown(i);
            this.setWinner(this.hasWinner(i));
            this.congratulate();
        } else {
            console.log('Game over.');
        }
    }

    setWinner(winner) {
        this.winner = winner;
    }

    hasWinner() {
        let combinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        let getWinner = (combination) => {
            let res;
            let array = combination.map(
                (i) => {
                    // console.log('i', i, this.state.fieldsState[i]);
                    return this.state.fieldsState[i];
                }
            );

            res = (array[0] === array[1] && array[0] === array[2])? array[0]: null;
            return res;
        }

        let winner = null;

        combinations.forEach((combination) => {
            let res = getWinner.bind(this)(combination);
            if(res) {
                winner = res;
            }
            return res;
        });
        return winner;
    }

    markDown(i) {
        if(!this.state.fieldsState[i]) {
            this.setState({
                fieldsState: this.getNewFieldsState(i),
                putDown: this.togglePutDown(),
                counter: this.state.counter + 1
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

    congratulate() {
        if(this.winner) {
                console.log(this.winner, ' is a winner!!!')
        } else if(this.state.counter > 8) {
            console.log('Game over.');
        }
    }

    rootClass() {
        return Classes.ROOT_CLASS
    }
}

module.exports = LTicTac;
