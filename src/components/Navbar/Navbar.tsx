"use client"
import { Container } from "@/components/Container/Container";
import { UserIcon } from "./Toolkit/UserIcon/UserIcon";
import { RightMenu } from "./Toolkit/RightMenu";
import styles from "./NavBar.module.css";
import { Icon } from "./Toolkit/Icon/Icon";
import { useSession } from "next-auth/react";


export const NavBar = () => {
    const { data: session } = useSession();
    return (
        <nav
            className={styles.navbar}
        >   
            <Container
                style={{
                    width: "90%",
                    float: "left",
                    marginLeft: "5%"
                }}
            >
                <Icon />
                {
                    session ?
                    <UserIcon /> :
                    <RightMenu />
                }
            </Container>
        </nav>
    );
}
