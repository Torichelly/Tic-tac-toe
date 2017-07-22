'use strict'

require('./Style.scss');
var React = require('react');
var Field = require('./b-field/b-field.jsx')

const Classes = {
    ROOT_CLASS: 'b-board'
};

const Markers = {
    CROSS: 'X',
    CIRCLE: 'O'
}

class BBoard extends React.Component {
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
        let fields = [];
        for(let i = 0; i < 9; i++) {
            fields.push(
                <Field key={i} value={this.state.fieldsState[i]}
                onClick={() => this.kernel(i)}/>
            );
        }
        return <div className={this.rootClass()}>{fields}</div>;
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
            if(!this.state.fieldsState[i]) {
                markDown(i);
                AIMarkDown();
            }
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
                let fields = combination.map(
                    (i) => {
                        return this.state.fieldsState[i];
                    }
                );
            return (fields[0] === fields[1]&&
                    fields[0] === fields[2])? fields[0]: null;
            }

            let winner = null;

            combinations.forEach((combination) => {
                let res = getWinner(combination);
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
                let randomMove = () => {
                    let fields = [];
                    for (let i in this.state.fieldsState) {
                        if (!this.state.fieldsState[i]) fields.push(i);
                    };
                    return fields[Math.floor(Math.random() * fields.length)];
                };
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
                    res = randomMove();
                }
                
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

module.exports = BBoard;