import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";

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
          <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64 17l-.71.71a1 1 0 01-1.42 0l-.71-.71a1 1 0 010-1.42l.71-.71M18.36 7l.71-.71a1 1 0 000-1.42l-.71-.71a1 1 0 00-1.42 0l-.71.71M12 3v-1M12 22v-1M4 12H3M22 12h-1M6.36 6.36l-.71-.71M18.36 18.36l-.71-.71"></path>
          </svg>
          <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73 8.15 8.15 0 01-8.14-8.14A8 8 0 019.86 2.3a1 1 0 00-.61-1.48A10.14 10.14 0 1022 14.31a1 1 0 00-.36-1.31z"></path>
          </svg>
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
