import { Container } from "@/components/Container/Container";

interface ConnectionProps {
    locked: boolean
}

export const Connection = (
    {
        locked
    }: ConnectionProps
) => {
    return (
        <Container
            style={{
                width: "7px",
                height: "70px",
                backgroundColor: "green"
            }}
        >

        </Container>
    );
}