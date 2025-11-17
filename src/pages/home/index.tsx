import { Section2_Home_Layout } from "../../layout/home/section2";
import { Start_Home_Layout } from "../../layout/home/start ";

import styles from "./styles.module.css";

export function Home_page() {
    return (
        <div 
            className={styles.container}
        >
            <Start_Home_Layout/>
            <Section2_Home_Layout/>
            
        </div>



    )
}