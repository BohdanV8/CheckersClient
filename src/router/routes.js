import About from "../components/pages/About";
import Home from "../components/pages/Home";
import Posts from "../components/pages/Posts";
import Profile from "../components/pages/Profile";

export const publicRoutes = [
    { path: "/", element: Home},
    { path: "/profile", element: Profile},
    { path: "/about", element: About},
    { path: "/posts", element: Posts}
]