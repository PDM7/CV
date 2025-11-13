
import { Container_Layout } from "../../container";
import styles from "./styles.module.css";

export function Start_Home_Layout() {
    return (
        <div className={styles.start} style={{ backgroundImage: "url(/home/start/fundo.png)" }}>
            <Container_Layout className={styles.container}>
                <div className={styles.collumn}>
                    <h1 id={styles.title}>Nome do criador de currículo</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>

                    <button onClick={() => {
                        window.location.href = "/inicio"
                    }}>Começar</button>
                </div>

                <div className={styles.collumn}>
                    <img src="/home/img1.png" alt="" />
                </div>

            </Container_Layout>
        </div>
    )
}