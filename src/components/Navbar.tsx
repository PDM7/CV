import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";
import { MoonStar, Sun } from "lucide-react";

export default function Navbar() {
  const nav = useNavigate();
  const { usuario, logout } = useUser();
  const { theme, toggleTheme } = useTheme();

  const avatarSrc = usuario?.avatar || "https://icon-library.com/images/contact-app-icon/contact-app-icon-5.jpg";
  const nomeUsuario = usuario?.nome || "Usuário";

  return (
    <header className="navbar bg-base-300 px-4">
      {/* LOGO */}
      <div className="flex-1">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => nav("/")}>
          MeuCurriculo
        </h1>
      </div>

      <div className="flex items-center gap-4">

        {/* SWITCH DE TEMA */}
        <label className="swap swap-rotate cursor-pointer">
          <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
          <Sun className="swap-off h-8 w-8" />
          <MoonStar className="swap-on h-8 w-8 " />
        </label>

        {/* AVATAR + MENU */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={avatarSrc}
                alt="avatar"
                onError={(e) => (e.currentTarget.src = "/vazio.png")}
              />
            </div>
          </label>

          <ul
            tabIndex={0}
            className="mt-3 z-50 p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-48"
          >
            {usuario ? (
              <div>
                <li className="px-3 py-1 text-sm opacity-70">{nomeUsuario}</li>
                <li>
                  <button onClick={() => nav("/perfil")}>Perfil</button>
                </li>
                <li>
                  <button onClick={logout}>Sair</button>
                </li>
              </div>
            ) : (
              <li>
                <button onClick={() => nav("/login")}>Login</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
