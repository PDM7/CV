

import { Card_Elements } from "../../../components/home/section2/card";
import { Container_Layout } from "../../container";
import styles from "./styles.module.css";

export function Section2_Home_Layout() {
    return (
        <div className={styles.section} style={{ backgroundImage: "url(/home/section2/fundo.png)" }}>
            <Container_Layout className={styles.container}>
                <div className={styles.text}>
                    <h2 className={styles.title}>
                        Criar um currículo nunca foi <span> tão fácil! </span>
                    </h2>
                    <p className={styles.description}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                    </p>
                </div>

                <div className={styles.cards}>
                    <Card_Elements
                        imageSrc="/home/section2/icons/pdf.png"
                        title="Importe em PDF"
                        description="Faça upload de um currículo existente"
                    />

                    <Card_Elements
                        imageSrc="/home/section2/icons/link.png"
                        title="Importe em Linkedin"
                        description="Faça upload de um currículo existente"
                        className={styles.cardCenter}
                    />

                    <Card_Elements
                        imageSrc="/home/section2/icons/github.png"
                        title="Importe do GitHub"
                        description="Faça upload de um currículo existente"
                    />
                </div>
            </Container_Layout>
        </div>
    )
}
