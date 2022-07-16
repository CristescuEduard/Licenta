import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Register from "./containers/Register/register";
import Login from "./containers/LogIn/login";
import Admin from "./containers/Admin/Admin";
import Stock from "./containers/Stock/Stock";
import SpacingGrid from "./containers/KitchenOrders/KitchenOrder";
import Bar from "./containers/Bar/Bar";
import Recipe from "./containers/Recipes/Recipe";
import Statistics from "./containers/Statistics/Statistics";
import NavBarMain from "./components/NavBarMain/NavBarMain";
import Incercare from "./containers/Incercare/incercare";

function App() {
    return (
        <div>
            <div className="App">
                <ChakraProvider>
                    <Router>
                        <Routes>
                            <Route path="/" exact element={<Login />}></Route>
                            <Route
                                path="/register"
                                exact
                                element={<Register />}
                            ></Route>
                            <Route
                                path="/admin/tables"
                                exact
                                element={<Admin />}
                            ></Route>
                            <Route
                                path="/admin/stock"
                                exact
                                element={<Stock />}
                            ></Route>
                            <Route
                                path="/kitchen/orders"
                                exact
                                element={<SpacingGrid />}
                            ></Route>
                            <Route
                                path="/bar/orders"
                                exact
                                element={<Bar />}
                            ></Route>
                            <Route
                                path="/admin/statistics"
                                exact
                                element={<Incercare />}
                            ></Route>
                            <Route
                                path="/kitchen/recipes"
                                exact
                                element={<Recipe />}
                            ></Route>
                        </Routes>
                    </Router>
                </ChakraProvider>
            </div>
        </div>
    );
}

export default App;
