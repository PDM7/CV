
import styles from "./styles.module.css";

interface IProps {
    title: string;
    description: string;
    imageSrc: string;
    className?: string;
}

export function Card_Elements({ title, description, imageSrc, className }: IProps) {
    return (
        <div className={[styles.card, className].join(" ")}>   
            <img src={imageSrc} alt="card-image"/>

            <div className={styles.text}>
                <h4> {title} </h4>
                <p> {description} </p>
            </div>
        </div>
    )
}
