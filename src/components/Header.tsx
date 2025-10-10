import { useTheme } from "../ThemeContext";

export function CurriculumHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`flex items-center justify-between p-3 shadow-md bg-base-200`}>
      <span className="text-xl font-bold">Currículo</span>
      <div className="flex gap-2">
        <button 
          className="btn btn-square btn-ghost"
          onClick={toggleTheme}
        >
          {theme === 'custom' ? '🌙' : '☀️'}
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
