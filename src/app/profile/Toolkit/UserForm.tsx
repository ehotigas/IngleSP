import { DropDown } from "@/components/Input/DropDown/DropDown";
import { Container } from "@/components/Container/Container";
import { Input } from "@/components/Input/Input/Input";
import { useSession } from "next-auth/react";
import { User } from "@/types/global";
import { Label } from "./Label";

export const UserForm = () => {
    const { data: session } = useSession();
    const user: User | undefined = session?.user;
    return (
        <Container
            style={{
                width: "calc(100% - 260px)",
                float: "left",
                height: "100px"
            }}
        >
            <Label
                text="Name"
            />
            <Input
                fieldName="name"
                style={{
                    width: "90%",
                    marginTop: 0
                }}
                value={user?.full_name}
            />
            <Label
                text="Username"
            />
            <Input
                fieldName="username"
                style={{
                    width: "90%",
                    marginTop: 0
                }}
                value={user?.username}
            />
            <Label
                text="Email"
            />
            <Input
                fieldName="email"
                style={{
                    width: "90%",
                    marginTop: 0
                }}
                value={user?.email}
            />
            <Label
                text="School"
            />
            <Input
                fieldName="school"
                style={{
                    width: "90%",
                    marginTop: 0
                }}
                value={user?.school_name}
            />
            <Label
                text="Grade"
            />
            <DropDown
                values={['Fundamental', 'Ensino Médio']}
                style={{
                    width: "90%",
                    marginTop: 0
                }}
            />

            <Label
                text="Password"
            />
            <Input
                fieldName="password"
                style={{
                    width: "90%",
                    marginTop: 0
                }}
                type="password"
            />
        </Container>
    );
}