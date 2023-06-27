import { Container } from "@/components/Container/Container";
import { Button } from "./Button/Button";

export const RightMenu = (
    {
        
    }
) => {
    return (
        <Container
            style={{
                float: "right",
                display: "block",
                width: "50%",
                marginTop: "40px"
            }}
        >
            <Button
                text="Sign Up"
                to="/signup"
            />
            <Button
                text="Sign In"
                to="/signin"
            />
        </Container>
    );
}