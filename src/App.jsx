import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import FindStore from './pages/FindStore'
import StoreDetail from './pages/StoreDetail'
import Order from './pages/Order'
import Franchise from './pages/Franchise'
import NotFound from './pages/NotFound'
import ChatBot from './components/ChatBot'

export default function App() {
  return (
    <BrowserRouter basename="/sunset-cafe">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find-a-store" element={<FindStore />} />
        <Route path="/store-detail/:id" element={<StoreDetail />} />
        <Route path="/store-detail" element={<StoreDetail />} />
        <Route path="/order" element={<Order />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatBot />
    </BrowserRouter>
  )
}
