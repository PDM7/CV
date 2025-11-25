
import { Container_Layout } from "../../container";
import styles from "./styles.module.css";

export function Start_Home_Layout() {
    return (
      <div
        className={styles.start}
        style={{ backgroundImage: "url(/home/start/fundo.png)" }}
      >
        <Container_Layout className={styles.container}>
          <div className={styles.collumn}>
            <h1 id={styles.title}>
              <span>Ocurriculo.online</span>
            </h1>
            <p>Uma solução open source pensada para apoiar estudantes no início da carreira.
O Currículo Online oferece uma experiência simples, estruturada e prática para criar currículos acadêmicos e profissionais.
            </p>

            <button
              onClick={() => {
                window.location.href = "/inicio";
              }}
            >
              Começar
            </button>
          </div>

          <div className={styles.collumn}>
            <img src="/home/img1.png" alt="" />
          </div>
        </Container_Layout>
      </div>
    );
}
