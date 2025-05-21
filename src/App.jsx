import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRout";
import Layout from "./components/layout/Layout";
import Login from "./components/login/Login";
import { ToastContainer } from "react-toastify";
import History from "./components/history/History";
import Buyrutmalar from "./components/buyrutmalar/Buyrutmalar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
        <Route path="/buyrutmalar" element={<Buyrutmalar />} />
        <Route path="/history" element={<History/>}/>
        </Route>
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
