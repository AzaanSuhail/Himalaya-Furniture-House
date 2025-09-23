import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from 'react-router-dom';
import ProductCarousel from "./components/Carousel";
import Home from './pages/HomePage';
import Footer from './components/Footer';
import Contact from './pages/ContactPage';
import Services from "./pages/ServicesPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CreateProduct from "./pages/CreateProductPage";

export default function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/services" element={<Services></Services>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path='/admin' element={<CreateProduct></CreateProduct>}></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/create-product" element={<CreateProduct></CreateProduct>}></Route>
      </Routes>
      <Footer></Footer>

    </div>
  )
}
