import PerfilForm from "./components/PerfilForm";
import { useState } from "react";
import CurriculoView from "./components/CurriculoView";
import Navbar from "../../components/Header";

export default function PerfilPage() {

   const [mostrarCurriculo, setMostrarCurriculo] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center my-4">
        <button 
          className="btn btn-secondary"
          onClick={() => setMostrarCurriculo(!mostrarCurriculo)}
        >
          {mostrarCurriculo ? "📝 Editar Perfil" : "👁️ Visualizar Currículo"}
        </button>
      </div>

       {mostrarCurriculo ? (
        <CurriculoView />
      ) : (
        <PerfilForm />
      )} 
    </div>
  );
}
