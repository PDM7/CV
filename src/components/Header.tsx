import { useTheme } from "../ThemeContext";
import { useState } from "react";
import { Sun, MoonStar, UserIcon, LogOutIcon, Home } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

type CurriculumHeaderProps = {
  onClick: () => void;
};

export function CurriculumHeader({ onClick }: CurriculumHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between p-3 shadow-md bg-base-200 no-print">
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl" href="/">
          <Home />
          Curriculum
        </a>
      </div>
      <div className="navbar-end space-x-5">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            onClick={toggleTheme}
            aria-label={`Ativar tema ${theme === "custom" ? "claro" : "escuro"}`}
          />
          <Sun className="swap-off h-8 w-8" />
          <MoonStar className="swap-on h-8 w-8 " />
        </label>

        <button type="button" className="btn btn-secondary" onClick={onClick}>
          Exportar
        </button>
      </div>
    </nav>
  );
}

export default function Navbar() {
  const { perfil } = useUser();
  const { theme, toggleTheme } = useTheme();
  const nav = useNavigate();
  const { logout } = useUser();
  const avatarSrc = perfil.foto;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm justify-between">
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl" href="/">
          <Home />
          Curriculum
        </a>
      </div>

      <div className="navbar-end space-x-5">
        {/* Theme toggle */}

        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            onClick={toggleTheme}
            aria-label={`Ativar tema ${
              theme === "custom" ? "claro" : "escuro"
            }`}
          />
          <Sun className="swap-off h-8 w-8" />
          <MoonStar className="swap-on h-8 w-8 " />
        </label>

        {/* Profile */}
        <div className="dropdown dropdown-hover dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 transition-transform hover:scale-105 flex items-center justify-center bg-gray-100 dark:bg-gray-800"
          >
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

          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm"
          >
            <li>
              <a
                onClick={() => nav("/perfil")}
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition"
              >
                <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                Perfil
              </a>
            </li>

            <hr className="my-1 border-gray-200 dark:border-gray-700" />

            <li>
              <a
                onClick={logout}
                className="flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-700 rounded-md px-2 py-1 transition"
              >
                <LogOutIcon className="w-5 h-5" />
                Sair
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
