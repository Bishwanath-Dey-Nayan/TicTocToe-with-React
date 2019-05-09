import React,{Component} from 'react';
import Board from './Board';



export default class Game extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            history:[
                {
                    squares: Array(9).fill(null)
                }],
                isNext:true
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(i)
{
    console.log("entered");
    const history = this.state.history;
    const current = history[history.length -1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
      }
    squares[i] = this.state.isNext ? "X":"O";
    this.setState({history:history.concat([{squares:squares}]),
        isNext:!this.state.isNext
})
        
}


    render()
    {
        let status;
        const history = this.state.history;
        const current = history[history.length-1];
        const winner =  calculateWinner(current.squares);
        if(winner)
        {
            status = "Winner is : "+winner;
        }
        else{
            status = "Next player is"+(this.state.isNext?"X":"O");
        }
        
        return(
            <div className="game">
            <div className="game-board">
                <Board 
                square={current.squares}
                onClick={(i) =>this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol></ol>
            </div>
            </div>
        );
    }

}

function calculateWinner(squares) {
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
        return squares[a];
      }
    }
    return null;
  }