import { CurriculumHeader } from "../components/Header";
import { useNavigate } from "react-router-dom";
interface CardProps {
  title: string;
  text: string;
  onClick?: () => void;
}
export function Filtros() {
  return (
    <div>
      Filtra por
      <button>Habilidade</button>
      <button>Empresa</button>
      </div>
  );
}
export function Card({ title, text, onClick }: CardProps)  {
  return (
    <div className="max-w-sm bg-white shadow-md rounded-2xl p-6 flex flex-col space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="text-gray-600">{text}</p>
      <div className="flex justify-end">
        <button
          onClick={onClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {"≻"}
        </button>
      </div>
    </div>
  );
}
export function CardClient() {
const navigate = useNavigate();
  // JSON de dados dos cards
  const cardsData = [
    {
      id: 1,
      title: "Curriculum Vitae",
      text: "Clique para acessar este excelente modelo de currículo.",
      route: "/vitae",
    },
    {
      id: 2,
      title: "Curriculum Lattes",
      text: "Clique para acessar este modelo de currículo acadêmico baseado no currículo Lattes.",
      route: "/lattes",
    },
    {
      id: 3,
      title: "Novo",
      text: "MODELO PERSONALIZADO",
      route: "/personalizado",
    },
    {
      id: 4,
      title: "Perfil",
      text: "PERFIL",
      route: "/perfil",

    },
    {id: 5,
      title: "Login",
      text: "LOGIN",
      route: "/login",}
  ];
  const handleClick = (route: string) => {
    navigate(route);
  };
  return (
    <div className="border rounded-2xl p-8 border-base-300 bg-base-100 m-5 text-base-content">
      <h1 className="font-medium mb-5">{"Painel"}</h1>
      <Filtros />
      <div className="flex flex-wrap gap-6 mb-4">
        {cardsData.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            text={card.text}
            onClick={() => handleClick(card.route)}
          />
        ))}
      </div>
    </div>
  );
}
export function PainelPage() {
  return (
    <main className="min-h-screen bg-base-300">
      <CurriculumHeader />
      <CardClient />
    </main>
  );
}
export default PainelPage;