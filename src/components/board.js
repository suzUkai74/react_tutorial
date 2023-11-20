import React from 'react';
import Square from './square';

export default class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        highlight={this.props.lines.includes(i)}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderBoardRow(i) {
    const start = i * 3
    return (
      <div className="board-row">
        {[start, start + 1, start + 2].map((num) =>
          this.renderSquare(num)
        )}
      </div>
    )
  }

  render() {
    return (
      <div>
        { [0, 1, 2].map((num) =>
          this.renderBoardRow(num)
        )}
      </div>
    );
  }
}