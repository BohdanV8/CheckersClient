import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button, Container, ListGroup, Card } from 'react-bootstrap';
import $api from "../http";
import { Context } from "../App";
const Lobby = observer(() => {
    const { gameStore } = useContext(Context);
    const [openGames, setOpenGames] = useState([]);
    const navigate = useNavigate();

    // Завантажуємо список ігор при відкритті сторінки
    useEffect(() => {
        fetchOpenGames();
        gameStore.createHubConnection(); // Ініціалізуємо з'єднання заздалегідь
        
        return () => {
             // Можна не розривати, якщо хочеш щоб конект жив
        }
    }, []);

    const fetchOpenGames = async () => {
        try {
            const response = await $api.get('/Game/openGames');
            setOpenGames(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    const createGame = async () => {
        const id = await gameStore.createGame();
        if (id) {
            navigate(`/game/${id}`);
        }
    };

    const joinGame = async (gameId) => {
        try {
            await gameStore.joinGame(gameId);
            navigate(`/game/${gameId}`);
        } catch (e) {
            alert("Не вдалося приєднатися");
        }
    };
    return (
        <Container className="mt-5">
            <Card>
                <Card.Header>Checkers Lobby</Card.Header>
                <Card.Body>
                    <Button variant="primary" onClick={createGame} className="mb-3">
                        Create New Game
                    </Button>
                    <Button variant="secondary" onClick={fetchOpenGames} className="mb-3 ms-2">
                        Refresh List
                    </Button>

                    <h4>Open Games:</h4>
                    <ListGroup>
                        {openGames.length === 0 && <p>No open games available.</p>}
                        {openGames.map(game => (
                            <ListGroup.Item key={game.id} className="d-flex justify-content-between align-items-center">
                                <span>Game {game.id.substring(0, 8)}... (Waiting for Black)</span>
                                <Button variant="success" size="sm" onClick={() => joinGame(game.id)}>
                                    Join Game
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    )
})

export default Lobby