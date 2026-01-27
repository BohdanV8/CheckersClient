import React, { createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Store from "./store/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import GameStore from "./store/gameStore";
const store = new Store();
const gameStore = new GameStore();
export const Context = createContext({
  store,
  gameStore
});
const App = observer(() => {
  useEffect(() => {
    store.checkAuth();
  }, []);
  return (
    <Context.Provider value={{ store, gameStore }}>
      <BrowserRouter>
        <Header />
        <AppRouter />
        {/* <Footer /> */}
      </BrowserRouter>
    </Context.Provider>
  );
});

export default App;
