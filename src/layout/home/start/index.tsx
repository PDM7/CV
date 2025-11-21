
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
              <span>ocurriculo.online</span>
            </h1>
            <p>
              Um framework versátil, simples e seguro, permitindo a criação de
              currículos de forma estruturada.
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
