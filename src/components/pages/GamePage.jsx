import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../App";
import { observer } from 'mobx-react-lite';
import { Container, Badge } from 'react-bootstrap';
import { Piece } from "../../utils/gameEnums"
import "../../styles/main.css"
const GamePage = observer(() => {
    const {id} = useParams();
    const { store, gameStore } = useContext(Context)
    useEffect(() => {
        if(store.isLoading)
            return
        // Якщо перезавантажили сторінку - треба завантажити гру і підключити SignalR
        const init = async () => {
            gameStore.createHubConnection();
            const gameData = await gameStore.loadGame(id);
            if (gameData && store.user.id) {
                // Визначаємо колір гравця
                if (gameData.playerWhiteId === store.user.id) gameStore.myColor = 1;
                else if (gameData.playerBlackId === store.user.id) gameStore.myColor = 2;
                
                // Вступаємо в групу
                gameStore.joinGroup(id);
            }
        };
        init();

        return () => {
            gameStore.stopHubConnection();
        }
    }, [id, store.isLoading, store.user]);

    const handleCellClick = (row, col) => {
        const piece = gameStore.board[row][col];

        // 1. Якщо ми вже вибрали шашку і клікнули на пусту (намагаємось походити)
        if (gameStore.selectedCell && piece === Piece.Empty) {
            gameStore.makeMove(row, col);
            return;
        }

        // 2. Якщо клікнули на свою шашку - вибираємо її
        const isMyWhite = gameStore.myColor === 1 && (piece === Piece.White || piece === Piece.WhiteKing);
        const isMyBlack = gameStore.myColor === 2 && (piece === Piece.Black || piece === Piece.BlackKing);

        if (isMyWhite || isMyBlack) {
            gameStore.selectCell(row, col);
        }
    };

    // Рендер клітинки
    const renderCell = (row, col) => {
        const piece = gameStore.board[row] ? gameStore.board[row][col] : 0;
        const isBlackCell = (row + col) % 2 !== 0;
        const isSelected = gameStore.selectedCell?.row === row && gameStore.selectedCell?.col === col;
        const isMustMovePiece = 
        gameStore.continueJumpFrom && 
        gameStore.continueJumpFrom.row === row && 
        gameStore.continueJumpFrom.col === col;
        const cellClass = `cell 
        ${isBlackCell ? 'cell-black' : 'cell-white'} 
        ${isSelected ? 'selected' : ''}
        ${isMustMovePiece ? 'must-move' : ''} 
    `;
        return (
            <div 
                key={`${row}-${col}`} 
                className={`cell ${isBlackCell ? 'cell-black' : 'cell-white'} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleCellClick(row, col)}
            >
                {piece !== Piece.Empty && (
                    <div className={`piece 
                        ${piece === Piece.White ? 'piece-white' : ''}
                        ${piece === Piece.Black ? 'piece-black' : ''}
                        ${piece === Piece.WhiteKing ? 'piece-white-king' : ''}
                        ${piece === Piece.BlackKing ? 'piece-black-king' : ''}
                    `}></div>
                )}
            </div>
        );
    };

    if (!gameStore.board.length) return <div>Loading board...</div>;

    return (
        <Container className="d-flex flex-column align-items-center mt-4">
            <h2>Game Room: {id.substring(0, 8)}</h2>
            
            <div className="mb-3">
                <Badge bg={gameStore.currentTurn === 1 ? "light" : "dark"} text={gameStore.currentTurn === 1 ? "dark" : "light"} className="p-2 fs-5 border">
                    Turn: {gameStore.currentTurn === 1 ? "White" : "Black"}
                </Badge>
                <span className="mx-3">|</span>
                <Badge bg="info">You are: {gameStore.myColor === 1 ? "White" : "Black"}</Badge>
            </div>

            {gameStore.status === 0 && <div className="alert alert-warning">Waiting for opponent...</div>}

            <div className="board">
                {gameStore.board.map((row, rowIndex) => 
                    row.map((_, colIndex) => renderCell(rowIndex, colIndex))
                )}
            </div>
        </Container>
    );
})

export default GamePage;