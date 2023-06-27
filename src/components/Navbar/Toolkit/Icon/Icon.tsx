import { Container } from "@/components/Container/Container";
import { GiAbstract114 } from "react-icons/gi";
import styles from "./Icon.module.css";
import Link from "next/link";

interface IconProps {
    color?: string
    style?: React.CSSProperties
}

export const Icon = (
    {
        color,
        style
    }: IconProps
) => {
    return (
        <Container
            style={{
                float: "left",
                display: "block",
                width: "50%",
                marginTop: "22px",
                ...style
            }}
        >
            <Link
               href="/"
            >
                <GiAbstract114
                    className={styles.imageIcon}
                    style={{
                        color: color
                    }}
                />
                <p
                    className={styles.name}
                    style={{
                        color: color
                    }}
                >
                    IngleSP
                </p>
            </Link>        
        </Container>
    );
}