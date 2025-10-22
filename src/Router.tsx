import { Routes, Route } from "react-router";
import IndexPage from "./pages/IndexPage";
import PainelPage from "./pages/PainelPage";
import PerfilPage from "./pages/profile/PerfilPage";
import TelaLogin from "./pages/login/Login";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/painel" element={<PainelPage />} />
      <Route path="/perfil" element={<PerfilPage />} />
      <Route path="/login" element={<TelaLogin />} />
    </Routes>
  );
}
