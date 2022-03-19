import Products from "./Components/Products/Products";
import WelcomeScreen from "./Components/WelcomeScreen/WelcomeScreen";
import { HashRouter, Route, Routes } from "react-router-dom";
import Panel from "./Components/Admin/Panel";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<Panel />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
