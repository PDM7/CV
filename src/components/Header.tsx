import { useTheme } from "../ThemeContext";
import { useState } from "react";
import { Sun, MoonStar, UserIcon, LogOutIcon } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

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
  const nav = useNavigate();
  const { logout } = useUser();
  const avatarSrc = perfil.foto;
  const [imgError, setImgError] = useState(false);

  const menuItems = [
    { label: "Item 1", href: "#" },
    {
      label: "Parent",
      submenu: [
        { label: "Submenu 1", href: "#" },
        { label: "Submenu 2", href: "#" },
      ],
    },
    { label: "Item 3", href: "#" },
  ];
  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Desktop */}
      <div className="navbar-start hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item, i) => (
            <li key={i}>
              {item.submenu ? (
                <details>
                  <summary>{item.label}</summary>
                  <ul className="p-2">
                    {item.submenu.map((sub, j) => (
                      <li key={j}>
                        <a href={sub.href}>{sub.label}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <a href={item.href}>{item.label}</a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile */}
      <div className="navbar-center">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            {menuItems.map((item, i) => (
              <li key={i}>
                {item.submenu ? (
                  <>
                    <a>{item.label}</a>
                    <ul className="p-2">
                      {item.submenu.map((sub, j) => (
                        <li key={j}>
                          <a href={sub.href}>{sub.label}</a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a href={item.href}>{item.label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Curriculum</a>
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
