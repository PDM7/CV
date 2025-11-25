
import styles from "./styles.module.css";

interface CardProps {
    title: React.ReactNode;
    text: React.ReactNode;
    className?: string;
    icon: React.ReactNode;
    buttonLabel?: string;
    onClick?: () => void;
}

export function CardCurriculo({ title, text, onClick, className, icon, buttonLabel }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={[styles.card, className].join(" ")}
        >
            <div className={styles.titleContainer}>
                <div className={styles.iconContainer}>
                    {icon}
                </div>

                <div className={styles.textContainer}>
                    <h3>{title}</h3>
                    <p> {text} </p>
                </div>

            </div>


            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                }}
                className={styles.buttonOpen}
                title={`Acessar ${title}`}
            >
                {buttonLabel || <>
                    Acessar
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>

                </>}
            </button>
        </div>
    );
}