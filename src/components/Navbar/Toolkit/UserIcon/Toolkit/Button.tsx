import { Container } from "@/components/Container/Container";
import styles from "./Button.module.css";

interface ButtonProps {
    title: string
    style?: React.CSSProperties
    onClick?: (event: React.MouseEvent<HTMLElement>)=>void
}

export const Button = (
    {
        title,
        style,
        onClick
    }: ButtonProps
) => {
    return (
        <Container
            style={{
                width: '96%',
                marginLeft: '2%',
            }}
            onClick={
                (event: React.MouseEvent<HTMLElement>) => {
                    onClick && onClick(event)
                }
            }
        >
            <p
                className={styles.button}
                style={style}
            >
                {title}
            </p>
        </Container>
    );
}