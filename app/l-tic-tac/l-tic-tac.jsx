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
            marker: Markers.CROSS,
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
        let currentMarker = this.state.marker;

        let play = (game, end) => {
            isOver()? end(): game();
        }

        let game = () => {
            markDown(i);
            AIMarkDown();
            congratulateIfNeeded();
        };

        let end = () => {
            logWinner();
        }

        let setWinner = (winner) => {
            this.winner = winner;
        }

        let hasWinner = () => {
            let getWinner = (combination) => {
                let res;
                let fields = combination.map(
                    (i) => {
                        return this.state.fieldsState[i];
                    }
                );

                res = (fields[0] === fields[1]&&
                       fields[0] === fields[2])? fields[0]: null;
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
            if(!isOver()){
                let newFieldsState = (i) => {
                let res = this.state.fieldsState;
                res[i] = currentMarker;
                return res;
                };

                if(!this.state.fieldsState[i]) {
                    this.setState({
                        fieldsState: newFieldsState(i),
                        counter: ++this.state.counter
                    });
                }
                currentMarker = toggleMarker(currentMarker);
                setWinner(hasWinner());
            }
        }

        let AIMarkDown = () => {
            let isEmpty = (i) => {
                return this.state.fieldsState[i]? false: true;
            };
            let aimField = () => {
                let res = null;
                let criticalMove = (etalon) => {
                    let {fieldsState} = this.state;
                    for(let combination of combinations) {
                        let state = combination.map((i) => {
                            return fieldsState[i];
                        });
                        
                        if(etalon == state[0] && etalon == state[1]&&
                        isEmpty(combination[2])) {
                            return combination[2];
                        };
                        if(etalon == state[0] && etalon == state[2]&&
                        isEmpty(combination[1])) {
                            return combination[1];
                        };
                        if(etalon == state[1] && etalon == state[2]&&
                        isEmpty(combination[0])) {
                            return combination[0];
                        }   
                    };

                    return null;
                }

                res = criticalMove(currentMarker);

                if (!res) {
                    res = criticalMove(toggleMarker(currentMarker));
                }

                if(!res) {
                    let fields = [];
                    for (let i in this.state.fieldsState) {
                        if (!this.state.fieldsState[i]) fields.push(i);
                    }
                    res = fields[Math.floor(Math.random() * fields.length)];
                }
                console.log(res);
                return res;
            };

            markDown(aimField());
        }

        let toggleMarker = (marker) => {
            return marker == Markers.CROSS?
                        Markers.CIRCLE: Markers.CROSS; 
        }

        let congratulateIfNeeded = () => {
            if(this.winner) {
                console.log(this.winner, ' is a new winner!!!');
            } else if (this.state.counter == 9) {
                console.log('Ups, there is no winner.');
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

        play(game, end);
    }

    rootClass() {
        return Classes.ROOT_CLASS
    }
}

module.exports = LTicTac;
