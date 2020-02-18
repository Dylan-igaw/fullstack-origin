import * as React from "react";
import {Link} from 'react-router-dom'
import '../css/Game.css';
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {Component} from "react";
// @ts-ignore
import validateLogin from './ValidateLogin';
import CssBaseline from "@material-ui/core/CssBaseline";
import {Button} from "@material-ui/core";

//사각형 생성 인터페이스
interface squareProps {
    value: string,
    onClick(): void
}

//사각형(버튼) 만들기 컴포넌트
class Square extends Component<squareProps> {
    render() {
        //클릭하면 value 표시
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

//사각형 그룹 만들기(게임판) 인터페이스
interface boardProps {
    squares: string[],
    onClick(i: number): void
}

//게임판 만들기, 번호 부여(i) 만큼
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

//게임 데이터 기록 인터페이스
interface square {
    squares: string[]
}

@observer
export default class Game extends React.Component<any, square> {
    //게임 이력 초기값 null
    @observable
    private history: square[] = [{"squares": Array(9).fill(null)}];

    //히스토리 넘버링
    @observable
    private stepNumber: number = 0;

    //유저 패턴
    @observable
    private xIsNext: boolean = true;

    @observable
    private loginId: string | null = sessionStorage.getItem("id");

    componentDidMount(): void {
        // @ts-ignore
        SDK.analysticLogger([window.navigator.userAgent, "pv", window.location.href]);
    }

    //버튼(사각형) 클릭 액션
    @action
    handleClick(i: number) {
        const history = this.history.slice(0, this.stepNumber + 1); //게임 이력 추가
        const current = history[history.length - 1]; //현재 위치 기록
        const squares = current.squares.slice(); //현재 상태 합산
        if (this.calculateWinner(squares) || squares[i]) { //승자 확인
            return;
        }
        //게임이 안 끝났으면
        squares[i] = this.xIsNext ? 'X' : 'O'; //다음 플레이어 확인
        this.history = [...history, {squares}]; //이력 갱신
        this.stepNumber = history.length;
        this.xIsNext = !this.xIsNext;
    }

    //게임 복기 기능
    @action
    jumpTo(step: number) {
        this.stepNumber = step;
        this.xIsNext = (step % 2) === 0;
    }

    //승자 계산기, 한줄이 전부 같은 플레이어가 선택한 경우.
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
        const history = this.history;
        const current = history[this.stepNumber];
        const winner = this.calculateWinner(current.squares);
        //현재 위치
        const moves = history.map((step, move) => {
            const desc = `Go to ${move ? `move # ${move}` : `game start`}`;
            return (
                <li key={move}>
                    <Button variant={"outlined"} color={"secondary"} onClick={() => this.jumpTo(move)}>{desc}</Button>
                </li>
            );
        });
        //게임 상태
        let status = winner ? `Winner: ${winner}` : `Next player: ${this.xIsNext ? "X" : "O"}`;

        if (validateLogin()) return <div className="Game">
            <CssBaseline />
            <Link to={"/"} className={"link"}>로그인 후 이용해 주세요.</Link>
        </div>;
        return <div className="Game">
            <CssBaseline />
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
        </div>
    }

}