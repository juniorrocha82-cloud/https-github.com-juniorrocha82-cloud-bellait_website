import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LanguageProvider } from './contexts/LanguageContext'
import Index from './pages/Index'
import SobreNos from './pages/SobreNos'
import Parcerias from './pages/Parcerias'
import Consultorias from './pages/Consultorias'
import Desenvolvimento from './pages/Desenvolvimento'
import Projetos from './pages/Projetos'
import ServiceDesk from './pages/ServiceDesk'
import TermosECondicoes from './pages/TermosECondicoes'
import Artigos from './pages/Artigos'
import ArtigoDetail from './pages/ArtigoDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/sobre-nos" element={<SobreNos />} />
            <Route path="/parcerias" element={<Parcerias />} />
            <Route path="/consultorias" element={<Consultorias />} />
            <Route path="/desenvolvimento" element={<Desenvolvimento />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/service-desk" element={<ServiceDesk />} />
            <Route path="/termos-e-condicoes" element={<TermosECondicoes />} />
            <Route path="/artigos" element={<Artigos />} />
            <Route path="/artigos/:slug" element={<ArtigoDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  )
}
