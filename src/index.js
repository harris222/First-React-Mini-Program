import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {

  constructor(props){
	  super(props);
  }
  
  
  render() {
    return (
      <button className="square" onClick = {() => this.buttonAction()}>
		  {this.props.value}
	  </button>
    );
  }
  
  buttonAction(){
	this.props.onClick();
  } // buttonAction 
  
} // square

class Board extends React.Component {
  constructor(props){
	  super(props);
	  this.state = {
		history: [
		{squares: Array(9).fill(null)}],
		stepNumber: 0,
		turn: true,
		gameOver: false,
	  };
  } // constructor
  
  checkForGameOver(){
	  const history = this.state.history.slice(0,this.state.stepNumber + 1); // we need this slice
	  const currentSquare = history[history.length-1];
	  const squares = currentSquare.squares.slice();
	  if ((squares[0] === squares[1] && squares[1] === squares[2] && squares[1] != null||
	  squares[3] === squares[4] && squares[4] === squares[5] && squares[3] != null||
	  squares[6] === squares[7] && squares[7] === squares[8] && squares[6] != null||
	  squares[0] === squares[3] && squares[3] === squares[6] && squares[0] != null||
	  squares[1] === squares[4] && squares[4] === squares[7] && squares[1] != null||
	  squares[2] === squares[5] && squares[5] === squares[8] && squares[2] != null||
	  squares[0] === squares[4] && squares[4] === squares[8] && squares[0] != null||
	  squares[2] === squares[4] && squares[4] === squares[6] && squares[2] != null)) {
		  return true;
	  }

	  return false;
	  
  } // arrayLength
 
  
  jumpTo(i){
	this.setState({stepNumber: i, turn: ((i%2) == 0)});
  }
  
  /* Render: renderSquare,
	 Description -- Sends information to squares and renders it graphically. */
  renderSquare(i) {
    return <Square value={this.state.history[this.state.stepNumber].squares[i]} onClick={()=>this.squareEvent(i)}/>;
  }
  
  squareEvent(i){
	  this.determineValue(this.state.turn, i);
  }
  
   /* Function: determineValue,
	 Description -- Determines who plays based on alternating turn. 
	 Concat most recent history of the game. */
  determineValue(turn, index){
	if (this.state.gameOver) return; // Note to self, states do not update until next render? 
	
	const history = this.state.history.slice(0,this.state.stepNumber + 1); // we need this slice
	const currentSquare = history[history.length-1];
	const squares = currentSquare.squares.slice();
	if (squares[index] !== null || this.checkForGameOver()) return; // do not update board if it already has value
	squares[index] = (turn) ? "X" : "O";
	this.setState(
	{history: history.concat([{squares: squares}]), stepNumber: ++this.state.stepNumber,
	turn: !(this.state.turn)}); 
	
	console.log(history);
	/* SETSTATE TAKES FIRST ARGUMENT AS PARAMETERS,
	SECOND ARGUMENT AS CALLBACK. I ACCIDENTALLY WROTE THREE ARGUMENTS*/

  } // determineValue 

  render() {
	
    let status;
	if (this.checkForGameOver()){
		status = "Winner is " + (!(this.state.turn) ? "X" : "O");
	} else {
		status = "Next player: " + ((this.state.turn) ? 'X' : 'O');
	} // if 
	
	const moves = this.state.history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
	
	return (
	  
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
		<div className="game-info">
			<ol>{moves}</ol>
		</div>
		</div>
	  
    );
  } // render
} // square

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
