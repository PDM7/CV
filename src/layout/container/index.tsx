import React from "react";
import styles from "./styles.module.css";

interface IProps {
    children: React.ReactNode[] | React.ReactNode,
    className?: string
}


// burro de merda!!!!
export function Container_Layout({ children, className }: IProps) {
    return (
        <div className={[styles.container, className].join(" ")}> 
            {children}
        </div>
    )
}