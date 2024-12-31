import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './componentes/Home'
import { Balance } from './componentes/Balance'
import { Producto } from './componentes/Producto'
import { QueryClient, QueryClientProvider } from 'react-query'
import './index.css'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home></Home>} >
        <Route path="/producto" element={<Producto />} />
        <Route path="/balance" element={<Balance />} />
        </Route>
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>

  </StrictMode>
)
