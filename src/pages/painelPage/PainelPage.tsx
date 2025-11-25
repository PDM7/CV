import Navbar from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { CardCurriculo } from "../../components/cardCurriculo/cardCurriculo";


import styles from "./styles.module.css";
import { Container_Layout } from "../../layout/container";

export function Filtros() {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4 text-base-content">Filtra por</h2>
      <div className="flex gap-3 flex-wrap">
        <button className="btn btn-outline btn-sm border-base-300 hover:border-base-300 text-base-content hover:bg-base-200">
          Habilidade
        </button>
        <button className="btn btn-outline btn-sm border-base-300 hover:border-base-300 text-base-content hover:bg-base-200">
          Empresa
        </button>
        <button className="btn btn-outline btn-sm border-base-300 hover:border-base-300 text-base-content hover:bg-base-200">
          Data
        </button>
        <button className="btn btn-outline btn-sm border-base-300 hover:border-base-300 text-base-content hover:bg-base-200">
          Tipo
        </button>
      </div>
    </div>
  );
}



export function CardClient() {
  const navigate = useNavigate();
  const { exportarPerfil } = useUser();
  const cardsData = [
    {
      id: 1,
      title: "Curriculum Vitae",
      text: "Clique para acessar este excelente modelo de currículo profissional.",
      route: "/vitae",
      icon: "📄",
      badge: "Popular",
    },
    {
      id: 2,
      title: "Curriculum Lattes",
      text: "Modelo de currículo acadêmico baseado no currículo Lattes.",
      route: "/lattes",
      icon: "🎓",
      badge: "Acadêmico",
    },
    // {
    //   id: 3,
    //   title: "Modelo Personalizado",
    //   text: "Crie um currículo único com nosso modelo personalizável.",
    //   route: "/personalizado",
    //   icon: "✨",
    //   badge: "Novo"
    // },
    {
      id: 4,
      title: "Meu Perfil",
      text: "Gerencie suas informações pessoais e preferências.",
      route: "/perfil",
      icon: "👤",
      badge: "Perfil",
    },
    // {
    //   id: 5,
    //   title: "Cartas de Apresentação",
    //   text: "Modelos profissionais de cartas de apresentação.",
    //   route: "/cartas",
    //   icon: "✉️",
    //   badge: "Complemento"
    // },
    // {
    //   id: 6,
    //   title: "Portfólio",
    //   text: "Apresente seus projetos e trabalhos anteriores.",
    //   route: "/portfolio",
    //   icon: "💼",
    //   badge: "Profissional"
    // }
  ];

  const handleClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className={[styles.page].join(" ")}>
      <Container_Layout
        className={styles.container}
        children={
          <>
            <div className={[styles.grid].join(" ")}>
              {cardsData.map((card) => (
                <CardCurriculo
                  key={card.id}
                  title={card.title}
                  icon={card.icon}
                  text={card.text}
                  onClick={() => handleClick(card.route)}
                />
              ))}

              <CardCurriculo
                buttonLabel="Salvar"
                title={"Exportar perfil"}
                icon={<>📥</>}
                text={"Salve suas informações para usar mais tarde."}
                onClick={exportarPerfil}
              />


            </div>
          </>

        }
      />
      {/* Header Section */}
      {/* <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Painel de Controle
          </h1>
          <p className="text-base-content/60">
            Gerencie seus currículos e documentos profissionais
          </p>
        </div> */}

      {/* Empty State (para quando não houver cards) */}
      {/* {cardsData.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-base-content/20">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-base-content mb-2">
              Nenhum modelo encontrado
            </h3>
            <p className="text-base-content/60">
              Tente ajustar os filtros ou criar um novo modelo
            </p>
          </div>
        )} */}




    </div>
  );
}

export function PainelPage() {
  return (
    <main className="transition-colors duration-300">
      <Navbar />
      <CardClient />
    </main>
  );
}

export default PainelPage;
