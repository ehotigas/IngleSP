import { Container } from "@/components/Container/Container";
import Link from "next/link";

interface ContactUsProps {
    style?: React.CSSProperties
}

export const ContactUs = (
    {
        style
    }: ContactUsProps
) => {
    return (
        <Container
            style={{
                float: "right",
                display: "block",
                width: "30%",
                textAlign: "center",
                ...style
            }}
        >
            <h3
                style={{
                    color: "#fff",
                    margin: "0 auto",
                    textAlign: "right",
                }}
            >
                Contact Us
            </h3>
            <p
                style={{
                    color: "#fff",
                    textAlign: "right",
                    fontSize: "12px"
                }}
            >
                julio.domiciano@unifesp.br<br />
                (12) 99185-8204
            </p>

            <h3
                style={{
                    color: "#fff",
                    margin: "0 auto",
                    textAlign: "right",
                    marginTop: "40px"
                }}
            >
                Feedback
            </h3>
            <p
                style={{
                    color: "#fff",
                    textAlign: "right",
                    fontSize: "12px"
                }}
            >
                Click
                <Link
                    href=""
                    style={{
                        color: "#eceeee",
                        margin: "5px"
                    }}
                >
                    here
                </Link>
                to send feedback
            </p>
        </Container>
    );
}