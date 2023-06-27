import { Container } from "@/components/Container/Container";
import styles from "./LogoImagePage.module.css";
import { Image } from "./Toolkit/Image";

interface LogoImagePageProps {
    margin?: string,
    children: JSX.Element | JSX.Element[]
}

export const LogoImageSection = (
    {
        margin,
        children
    }: LogoImagePageProps
) => {
    return (
        <section
            className={styles.container}
        >
            <Image />

            <Container
                style={{
                    width: "50%",
                    float: "left",
                    marginTop: margin
                }}
            >
                {children}
            </Container>
        </section>
    );
}