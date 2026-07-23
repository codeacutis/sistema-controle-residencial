import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/staticcomponents/Navbar";
import Footer from "./components/staticcomponents/Footer";
import TelaPessoas from "./pages/TelaPessoas";
import TelaTransacoes from "./pages/TelaTransacoes";
import TelaTotais from "./pages/TelaTotais";
import { TelaNotFound } from "./pages/TelaNotFound";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="*" element={<TelaNotFound />}/>
          <Route path="/" element={<TelaPessoas />}/>
          <Route path="/transacoes" element={<TelaTransacoes />}/>
          <Route path="/totais" element={<TelaTotais />}/>
        </Routes>
      </main>
      <Footer />
    </>
  );
}
