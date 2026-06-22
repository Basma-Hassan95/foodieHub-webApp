import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { CartProvider } from "./CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Receipt from "./pages/Receipt";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import FoodDetail from "./pages/FoodDetail";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/receipt" element={<Receipt />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/food/:id" element={<FoodDetail />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;