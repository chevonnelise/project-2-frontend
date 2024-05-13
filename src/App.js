import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './Pages/shop/Shop';
import Home from './Pages/Home';
import About from './Components/Home/About';
import Contact from './Pages/Contact';
import Cart from './Pages/cart/Cart';
import Login from './Pages/Login';
import Footer from './Components/Footer/Footer';
import Register from './Pages/Register';
import Checkout from './Pages/cart/Checkout';
import ShopSeller from './Pages/shopseller/ShopSeller';
import AddProduct from './Pages/shopseller/AddProduct';
import EditProduct from './Pages/shopseller/EditProduct';
import { ShopContextProvider } from './Context/ShopContext';
import { UserContextProvider } from './Context/UserContext';


function App() {
  return (
    <div>
      <UserContextProvider>
        <ShopContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shopseller" element={<ShopSeller />} />
              <Route path="/shopseller/add" element={<AddProduct />} />
              <Route path="/shopseller/edit/:productid" element={<EditProduct />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Checkout />} />
            </Routes>
            <Footer />
          </Router>
        </ShopContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
