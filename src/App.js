import React, { createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Store from "./store/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
const store = new Store();
export const Context = createContext({
  store,
});
const App = observer(() => {
  useEffect(() => {
    store.checkAuth();
  }, []);
  return (
    <Context.Provider value={{ store }}>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </Context.Provider>
  );
});

export default App;
