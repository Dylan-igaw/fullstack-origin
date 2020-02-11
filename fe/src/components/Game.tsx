import * as React from "react";
import {Link} from 'react-router-dom'
import '../css/Game.css';
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {Component} from "react";

interface squareProps {
    value: string,
    onClick(): void
}

class Square extends Component<squareProps>{
    render(){
        return(
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

interface boardProps {
    squares: string[],
    onClick(i: number): void
}

class Board extends React.Component<boardProps> {
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

interface square {
    squares: string[]
}

@observer
export default class Game extends React.Component<any, square> {
    @observable
    private history: square[] = [{"squares" : Array(9).fill(null)}];

    @observable
    private stepNumber: number = 0;

    @observable
    private xIsNext: boolean = true;

    @action
    handleClick(i: number) {
        const history = this.history.slice(0, this.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.xIsNext ? 'X' : 'O';
        this.history = [...history, {squares}];
        this.stepNumber = history.length;
        this.xIsNext = !this.xIsNext;
    }

    @action
    jumpTo(step: number) {
        this.stepNumber = step;
        this.xIsNext = (step % 2) === 0;
    }

    @action
    calculateWinner(squares: string[]) {
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
        console.log(this.history);
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
            const history = this.history;
            const current = history[this.stepNumber];
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
                status = "Next player: " + (this.xIsNext ? "X" : "O");
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