import { Container } from "@/components/Container/Container";
import image from "@assets/homeImage.png";

export const Image = () => {
    return (
        <Container
            style={{
                width: "50%",
                float: "left",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                marginTop: "14vh",
                marginBottom: "14vh"
            }}
        >
            <img
                src={image.src}
                style={{
                    margin: "0",
                    width: "85%",
                    borderRight: "1px solid #a5aaad"

                }}
            />
        </Container>
    );
}