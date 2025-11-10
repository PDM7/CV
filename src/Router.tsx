import { Routes, Route } from "react-router";
import IndexPage from "./pages/IndexPage";
import PerfilPage from "./pages/profile/PerfilPage";
import { UserProvider } from "./contexts/UserContext";
import Vitae from "./pages/modelos/vitae";
import Lattes from "./pages/modelos/lattes";
import TelaLogin from "./pages/Login";
export default function Router() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/vitae" element={<Vitae/>} />
        <Route path="/lattes" element={<Lattes/>} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Routes>
    </UserProvider>
  );
}
