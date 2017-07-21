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

        this.state = {
            putDown: Markers.CROSS,
            counter: 0,
            fieldsState: new Array(9).fill(null)
        }

        this.winner = null;
    }

    render() {
        return <div className={this.rootClass()}>
                    <div className={this.rootClass() + '__title'}>
                        Tic-tac-toe
                    </div>
                    <Board fieldsState={this.state.fieldsState} onClick={(i) => this.kernel(i)}/>
                </div>;
    }

    kernel(i) {
        let onPlaying = (onGame, onEnd) => {
            isOver()? onEnd(): onGame();
        }

        let onGame = () => {
            markDown(i);
            setWinner(hasWinner());
            congratulateIfNeeded();
        };

        let onEnd = () => {
            logWinner();
        }

        let setWinner = (winner) => {
            this.winner = winner;
        }

        let hasWinner = () => {
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
                let fields = combination.map(
                    (i) => {
                        return this.state.fieldsState[i];
                    }
                );

                res = (fields[0] === fields[1] && fields[0] === fields[2])? fields[0]: null;
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

        let markDown = (i) => {
            let newFieldsState = (i) => {
                let res = this.state.fieldsState;
                res[i] = this.state.putDown;
                return res;
            };

            if(!this.state.fieldsState[i]) {
                this.setState({
                    fieldsState: newFieldsState(i),
                    putDown: togglePutDown(),
                    counter: ++this.state.counter
                });
            }
        }

        let togglePutDown = () => {
            return this.state.putDown == Markers.CROSS?
                        Markers.CIRCLE: Markers.CROSS; 
        }

        let congratulateIfNeeded = () => {
            if(this.winner) {
                console.log(this.winner, ' is a new winner!!!');
            }
        }

        let logWinner = () => {
            this.winner?
                console.log(this.winner, ' has won.'):
                console.log('No winners.\nGame over.');
        }

        let isOver = () => {
                return this.winner || this.state.counter == 9;
        }

        onPlaying(onGame, onEnd);
    }

    rootClass() {
        return Classes.ROOT_CLASS
    }
}

module.exports = LTicTac;
