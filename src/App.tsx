import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { LangProvider } from '@/contexts/LanguageContext'

import Layout from './components/Layout'
import Index from './pages/Index'
import ServiceDesk from './pages/ServiceDesk'
import Projetos from './pages/Projetos'
import Consultorias from './pages/Consultorias'
import Parcerias from './pages/Parcerias'
import Desenvolvimento from './pages/Desenvolvimento'
import SobreNos from './pages/SobreNos'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
  >
    <LangProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/service-desk" element={<ServiceDesk />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/consultorias" element={<Consultorias />} />
            <Route path="/parcerias" element={<Parcerias />} />
            <Route path="/desenvolvimento" element={<Desenvolvimento />} />
            <Route path="/sobre-nos" element={<SobreNos />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </LangProvider>
  </BrowserRouter>
)

export default App
