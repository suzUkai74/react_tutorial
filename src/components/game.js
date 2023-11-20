import React from 'react';
import Board from './board';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      historyDetail: [null],
      stepNumber: 0,
      xIsNext: true,
      reverse: false
    }
  }

  mark() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], lines[i]];
      }
    }
    return [null, []];
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const historyDetail = this.state.historyDetail;
    const squares = current.squares.slice();
    const [winner, lines] = this.calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.mark();
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      historyDetail: historyDetail.concat([{
        col: i % 3,
        row: Math.trunc(i / 3), 
        mark: this.mark()
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  resetGame() {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      reverse: false
    })
  }

  toggleHistory() {
    this.setState({
      reverse: !this.state.reverse
    })
  }

  render() {
    const history = this.state.history;
    const stepNumber = this.state.stepNumber;
    const current = history[stepNumber];
    const [winner, lines] = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const historyDetail = this.state.historyDetail[move]
      let desc = move ?
        historyDetail.mark + '(' + historyDetail.col + ', ' + historyDetail.row + ') Go to move #' + move :
        'Go to game start';
      if (stepNumber === move) {
        desc = <b>{desc}</b>;
      }
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (stepNumber === 9) {
      status = 'Draw';
    } else {
      status = 'Next player:' + this.mark();
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            lines={lines}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{this.state.reverse ? moves.reverse() : moves}</ol>
          <button className="toggle-btn" onClick={() => this.toggleHistory()}>Sort History</button>
        </div>
        <div className="reset">
          <button className="reset-btn" onClick={() => this.resetGame()}>Reset Game</button>
        </div>
      </div>
    );
  }
}