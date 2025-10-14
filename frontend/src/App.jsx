import Navbar from "./components/Navbar";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import Footer from './components/Footer';
import Contact from './pages/ContactPage';
import Services from "./pages/ServicesPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CreateProduct from "./pages/CreateProductPage";
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import About from './pages/About';
import CategoryPage from './pages/CategoryPage';
import { Toaster } from 'react-hot-toast';


export default function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/services" element={<Services></Services>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path='/admin' element={<ProtectedRoute adminOnly={true}><CreateProduct /></ProtectedRoute>}></Route>
        <Route path='/admin/products' element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>}></Route>
        <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/create-product" element={<CreateProduct></CreateProduct>}></Route>
        {/* Category pages: dynamic slugs like /bedroom, /dining-room etc. */}
        <Route path="/:category" element={<CategoryPage></CategoryPage>}></Route>
      </Routes>
      <Footer></Footer>
      <Toaster />
    </div>
  )
}
