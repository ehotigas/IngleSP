import { Container } from "@/components/Container/Container";
import { AiOutlineUser } from "react-icons/ai";


export const Avatar = () => {
    return (
        <Container
            style={{
                float: "left",
                width: "180px",
                height: "180px",
                backgroundColor: "#eceeee",
                borderRadius: "180px",
                textAlign: "center",
                marginLeft: "40px",
                marginTop: "-100px",
                zIndex: 1
            }}
    >
        <Container
            style={{
                float: "left",
                width: "164px",
                height: "164px",
                backgroundColor: "#76dcc2",
                borderRadius: "180px",
                textAlign: "center",
                marginLeft: "8px",
                marginTop: "8px"
            }}
        >
            <AiOutlineUser
                style={{
                    fontSize: "100px",
                    marginTop: "40px"
                }}
            />
        </Container>
    </Container>
    );
}