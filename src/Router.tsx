import { Routes, Route } from "react-router";
import IndexPage from "./pages/IndexPage";
import PerfilPage from "./pages/profile/PerfilPage";
import { UserProvider } from "./contexts/UserContext";
import Vitae from "./pages/modelos/vitae";
import Lattes from "./pages/modelos/lattes";
import TelaLogin from "./pages/Login";
import Cadastrar from "./pages/Cadastrar";
import TelaInicio from "./pages/init";
export default function Router() {
  return (
    <Routes>
      <Route path="/inicio" element={<TelaInicio />} />
      <Route
        path="/*"
        element={
          <UserProvider>
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/vitae" element={<Vitae />} />
              <Route path="/lattes" element={<Lattes />} />
              <Route path="/perfil" element={<PerfilPage />} />
              <Route path="/login" element={<TelaLogin />} />
              <Route path="/cadastrar" element={<Cadastrar />} />
            </Routes>
          </UserProvider>
        }
      />
    </Routes>
  );
}
