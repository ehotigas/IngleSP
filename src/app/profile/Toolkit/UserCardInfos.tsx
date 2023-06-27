import { Container } from "@/components/Container/Container";
import { Button } from "@/components/Input/Button/Button";
import { useSession } from "next-auth/react";
import { User } from "@/types/global";
import { Avatar } from "./Avatar";

export const UserCardInfos = () => {
    const { data: session } = useSession();
    const user: User | undefined = session?.user;
    return (
        <Container
            style={{
                width: "260px",
                float: "left",
                height: "440px"
            }}
        >
            <Avatar/>
            <h2
                style={{
                    textAlign: "center",
                    marginBottom: 0
                }}
            >
                {user?.full_name}
            </h2>

            <p
                style={{
                    textAlign: "center",
                    margin: 0,
                    fontSize: "12px"
                }}
            >
                {user?.is_superuser && "admin"}
            </p>

            <h4
                style={{
                    textAlign: "center",
                    margin: 0,
                    fontSize: "12px",
                    marginTop: "15px"
                }}
            >
                {user?.school_name}
            </h4>
            <h6
                style={{
                    textAlign: "center",
                    margin: 0,
                    fontSize: "12px"
                }}
            >
                {`score: `}
            </h6>

            <Button
                text="Save Changes"
                style={{
                    width: "80%",
                    marginLeft: "10%",
                    marginTop: "20px",
                    height: "25px",
                    border: "none",
                    backgroundColor: "#76dcc2"
                }}
            />
        </Container>
    );
}