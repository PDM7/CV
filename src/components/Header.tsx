import { useTheme } from "../ThemeContext";
import { useState } from "react";
import {SunMedium, MoonStar, UserIcon} from "lucide-react";
import { useUser } from "../contexts/UserContext";

export function CurriculumHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`flex items-center justify-between p-3 shadow-md bg-base-200`}
    >
      <span className="text-xl font-bold">Currículo</span>
      <div className="flex gap-2">
        <button className="btn btn-square btn-ghost" onClick={toggleTheme}>
          {theme === "custom" ? "🌙" : "☀️"}
        </button>

        <button type="button" className="btn btn-primary">
          Salvar
        </button>
        <button type="button" className="btn btn-secondary">
          Exportar
        </button>
      </div>
    </nav>
  );
}

export default function Navbar() {
  const { perfil } = useUser();
  const { theme, toggleTheme } = useTheme();
  const avatarSrc = perfil.foto;
  const [imgError, setImgError] = useState(false);

  return (
    <nav className="flex items-center justify-between p-3 shadow-md bg-base-200">
      <span className="text-xl font-bold">Currículo</span>
      <div className="flex gap-3 items-center">
        <button
          className="btn-ghost w-10 h-10 flex items-center justify-center rounded-full 
                     hover:bg-gray-300/20 dark:hover:bg-gray-700/20 transition-colors"
          onClick={toggleTheme}
          aria-label={`Ativar tema ${theme === "custom" ? "claro" : "escuro"}`}
        >
          {theme === "custom" ? <MoonStar /> : <SunMedium />}
        </button>

        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 transition-transform hover:scale-105 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          {avatarSrc && !imgError ? (
            <img
              className="w-full h-full object-cover"
              src={avatarSrc}
              alt="Avatar"
              onError={() => setImgError(true)}
            />
          ) : (
            <UserIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
          )}
        </div>
      </div>
    </nav>
  );
}
