import { Routes, Route } from "react-router";
import IndexPage from "./IndexPage";
import ModelosPage from "./pages/ModelosPage";
import PerfilPage from "./pages/perfil/PerfilPage";
import { UserProvider } from "./contexts/UserContext";
export default function Router() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/modelos" element={<ModelosPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Routes>
    </UserProvider>
  );
}
