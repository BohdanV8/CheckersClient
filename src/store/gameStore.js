import { makeAutoObservable, runInAction } from "mobx";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import $api, { API_URL } from "../http";

export default class GameStore {
    hubConnection = null;
    board = []; // Двовимірний масив 8x8
    gameId = null;
    currentTurn = 1; // 1 - White, 2 - Black
    myColor = null; // За кого граємо ми (1 або 2)
    status = 0; // 0 - Waiting, 1 - InProgress, 2 - Finished
    winner = null;
    selectedCell = null; // {row, col} - яку шашку ми виділили
    continueJumpFrom = null
    constructor() {
        makeAutoObservable(this);
    }
    // --- SignalR Setup ---
    createHubConnection() {
        if (this.hubConnection) return;

        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${API_URL.replace('/api', '')}/gameHub`) // У тебе URL бекенда + /gameHub
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.start()
            .then(() => {
                console.log("SignalR Connected");
                this.addSignalRListeners();
                if (this.gameId) this.joinGroup(this.gameId);
            })
            .catch(err => console.error("SignalR Connection Error: ", err));
    }
    addSignalRListeners() {
        if (!this.hubConnection) return;

        this.hubConnection.on("OpponentJoined", (playerId) => {
            console.log("Player joined:", playerId);
            runInAction(() => {
                this.status = 1; // InProgress
            });
        });

        this.hubConnection.on("GameUpdated", (game) => {
            console.log("Game Updated:", game);
            runInAction(() => {
                this.board = game.board;
                this.currentTurn = game.currentTurn;
                this.status = game.status;
                // Скидаємо виділення після ходу
                this.selectedCell = null;
            });
        });
    }
    async joinGroup(gameId) {
        if (this.hubConnection && this.hubConnection.state === "Connected") {
            try {
                await this.hubConnection.invoke("JoinGame", gameId);
                console.log("Joined SignalR Group:", gameId);
            } catch (e) {
                console.error(e);
            }
        }
    }
    stopHubConnection() {
        if (this.hubConnection) {
            this.hubConnection.stop();
            this.hubConnection = null;
        }
    }

    // --- API Actions ---

    async createGame() {
        try {
            const response = await $api.post('/Game/create');
            runInAction(() => {
                this.gameId = response.data.id;
                this.board = response.data.board;
                this.myColor = 1; // Той хто створює - Білий
                this.status = response.data.status;
                this.currentTurn = response.data.currentTurn;
            });
            this.joinGroup(this.gameId);
            return response.data.id;
        } catch (e) {
            console.error(e);
        }
    }
    async joinGame(gameId) {
        try {
            const response = await $api.post(`/Game/join?gameId=${gameId}`);
            // Після успішного джойну, треба отримати актуальний стан гри
            await this.loadGame(gameId);
            runInAction(() => {
                 this.myColor = 2; // Той хто приєднується - Чорний
            });
            this.joinGroup(gameId);
        } catch (e) {
            console.error(e);
            throw e; // Прокинемо помилку в компонент
        }
    }
    async loadGame(gameId) {
        try {
            const response = await $api.get(`/Game/getGame?gameId=${gameId}`);
            runInAction(() => {
                this.gameId = response.data.id;
                this.board = response.data.board;
                this.currentTurn = response.data.currentTurn;
                this.status = response.data.status;
                // Визначити колір гравця можна перевіривши ID юзера, 
                // але поки спростимо логіку або збережемо userId в AuthStore
            });
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }
    async makeMove(toRow, toCol) {
        if (!this.selectedCell) return;

        const move = {
            gameId: this.gameId,
            fromRow: this.selectedCell.row,
            fromCol: this.selectedCell.col,
            toRow: toRow,
            toCol: toCol
        };

        try {
            await $api.post('/Game/makeMove', move);
            // Ми не оновлюємо дошку тут вручну! 
            // Ми чекаємо поки SignalR пришле подію "GameUpdated".
        } catch (e) {
            console.error("Move failed:", e.response?.data || e.message);
            alert(e.response?.data || "Невалідний хід");
        }
    }
    selectCell(row, col) {
        // Логіка виділення клітинки
        // Якщо клікнули на ту ж саму - знімаємо виділення
        if (this.selectedCell && this.selectedCell.row === row && this.selectedCell.col === col) {
            this.selectedCell = null;
            return;
        }
        this.selectedCell = { row, col };
    }
    // Встановлює колір гравця (викликається з компонента при завантаженні, якщо ми знаємо user.id)
    setPlayerColor(userId) {
       // Цю логіку краще робити, маючи доступ до даних гри, де записані ID білого і чорного
    }
}