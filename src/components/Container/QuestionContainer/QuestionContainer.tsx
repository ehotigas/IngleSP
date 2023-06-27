import { Container } from "../Container";

interface QuestionProps {
    children?: React.ReactNode
    time: string
    title?: string
}

export const QuestionContainer = (
    {
        children,
        time,
        title
    }: QuestionProps
) => {
    return (
        <Container
            style={{
                width: "70%",
                marginLeft: "15%",
                backgroundColor: "#eceeee",
                marginTop: "10vh",
                overflow: "hidden",
                marginBottom: "20vh",
                borderBottom: "solid 5px #76dcc2",
                borderRadius: "10px 10px 0 0",
                minHeight: "500px"
            }}
        >
            <Container
                style={{
                    height: "50px",
                    backgroundColor: "#76dcc2",
                    borderTop: "solid 5px #76dcc2",
                    marginBottom: "20px",
                    borderBottom: "solid 5px #76dcc2",
                }}
            >
                <Container
                    style={{
                        color: "#fff",
                        fontSize: "28px",
                        marginTop: "10px",
                        width: "20%",
                        marginLeft: "15px",
                        float: "left"
                    }}
                >
                    {title}
                </Container>
                <Container
                    style={{
                        color: "#fff",
                        fontSize: "28px",
                        marginTop: "10px",
                        width: "20%",
                        marginRight: "15px",
                        float: "right",
                        textAlign: "right"
                    }}
                >
                    {time}
                </Container>
            </Container>
            {children}
        </Container>
    );
}