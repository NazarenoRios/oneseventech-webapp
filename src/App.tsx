import { Routes, Route } from 'react-router-dom'
import { Products } from './pages/Products'
import Navbar from './common/Navbar'
import Checkout from 'pages/Checkout'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/checkout/:id' element={<Checkout />} />
      </Routes>
    </div>
  )
}

export default App
