import React from 'react';

export default class Square extends React.Component {
  render() {
    let clazz = "square"
    if (this.props.highlight) {
      clazz += " highlight"
    }
    return (
      <button className={clazz} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}