import About from "../components/pages/About";
import Home from "../components/pages/Home";
import Games from "../components/pages/Games"
import Profile from "../components/pages/Profile";
import Lobby from "../components/Lobby";
import GamePage from "../components/pages/GamePage";
export const publicRoutes = [
    { path: "/", element: Home},
    { path: "/profile", element: Profile},
    { path: "/about", element: About},
    { path: "/games", element: Games},
    { path: "/lobby", element: Lobby},
    { path: "/game/:id", element: GamePage}
]