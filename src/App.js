import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CardList from "./pages/CardList";
import AddCard from "./pages/AddCard";
import EditCard from "./pages/EditCard";
import Login from "./pages/Login";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<CardList />} />
        <Route path="/cards/new" element={<AddCard />} />
        <Route path="/editcard/:id" element={<EditCard />} />
        <Route path="/login" element={<Login />} />
        {/* TODO: Complete the routes */}
      </Routes>
    </BrowserRouter>
  );
}
