import { Container } from "../Container/Container";
import { Icon } from "./Toolkit/Icon";


interface UserCardProps {
    score: string
    style?: React.CSSProperties
    username: string
}

export const UserCard = (
    {
        score,
        style,
        username
    }: UserCardProps
) => {
    return (
        <Container
            style={{
                width: "70%",
                height: "80px",
                backgroundColor: "#bebebe",
                borderRadius: "10px",
                ...style
            }}
        >
            <Icon
                color={style?.backgroundColor}
            />
            <Container
                style={{
                    color: "#fff",
                    fontSize: "27px",
                    float: "left",
                    width: "40%",
                    marginTop: "20px",
                    marginLeft: "20px"
                }}
            >
                {username}
            </Container>
            <Container
                style={{
                    color: "#fff",
                    fontSize: "27px",
                    float: "right",
                    width: "20%",
                    marginTop: "20px",
                    marginRight: "20px",
                    textAlign: "right"
                }}
            >
                {score} pts
            </Container>
        </Container>
    );
}