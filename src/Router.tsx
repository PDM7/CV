import { Routes, Route } from "react-router";
import IndexPage from "./pages/IndexPage";
import PainelPage from "./pages/PainelPage";
import PerfilPage from "./pages/profile/PerfilPage";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/painel" element={<PainelPage />} />
      <Route path="/perfil" element={<PerfilPage />} />
    </Routes>
  );
}
