import { Container } from "@/components/Container/Container";
import styles from "./test.module.css";
import { useRouter } from "next/navigation";

interface TestProps {
    style?: React.CSSProperties
    text?: string
    to: string
}

export const Test = (
    {
        style,
        text,
        to
    }: TestProps
) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(to);
    }
    return (
        <div
            className={styles.test}
            onClick={handleClick}
            style={style}
        >
            <Container
                style={{
                    width: "7px",
                    height: "70px",
                    float: "left",
                    backgroundColor: "#e5e5e5"
                }}
            >
            </Container>
            <Container
                style={{
                    width: "223px",
                    float: "left",
                    textAlign: "center",
                    marginTop: "19px",
                    fontSize: "22px"
                }}
            >
                {text}<br/>
                {/* score: ({0}) */}
            </Container>
            <Container
                style={{
                    width: "70px",
                    float: "right",
                    height: "70px",
                    textAlign: "center",
                    fontSize: "20px",
                    backgroundColor: "#e5e5e5"
                }}
            >
                <p>
                {0}
                </p>
            </Container>
        </div>
    );
}