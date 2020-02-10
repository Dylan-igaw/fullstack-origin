import * as React from "react";
import {Link} from 'react-router-dom'
import '../css/Game.css';

const Square = (props: any) =>
    <button className="square" onClick={props.onClick}>
        {props.value}
    </button>;

class Board extends React.Component<any, any> {
    renderSquare(i: number) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <>
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
            </>
        );
    }
}

interface GameProps {
    logged: string,
    history: any[],
    stepNumber: number,
    xIsNext: boolean
}

export default class Game extends React.Component<any, GameProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            logged: '',
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: [...history, {squares}],
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    calculateWinner(squares: any[]) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    render() {
        let returnHtml: any;
        const loginId = sessionStorage.getItem("id");
        if (loginId === null) {
            returnHtml =
                <div className="Game">
                    <div className="Game-header">
                        <Link to={"/"} className={"link"}>로그인 후 이용해 주세요.</Link>
                    </div>
                </div>
        } else {
            const history = this.state.history;
            const current = history[this.state.stepNumber];
            const winner = this.calculateWinner(current.squares);

            const moves = history.map((step, move) => {
                //const desc = move ? 'Go to move #' + move : 'Go to game start';
                const desc = `Go to ${move ? `move # ${move}` : `game start`}`;
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            });

            let status;
            if (winner) {
                status = "Winner: " + winner;
            } else {
                status = "Next player: " + (this.state.xIsNext ? "X" : "O");
            }

            returnHtml =
                <div className="Game">
                    <div className="Game-header">
                        <Board
                            squares={current.squares}
                            onClick={(i: number) => this.handleClick(i)}
                        />
                    </div>
                    <div className="Game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>;
        }
        return returnHtml;
    }
}