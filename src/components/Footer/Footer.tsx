"use client"
import { Container } from "@/components/Container/Container";
import { SocialMedia } from "./Toolkit/SocialMedia";
import { ContactUs } from "./Toolkit/ContactUs";
import styles from "./Footer.module.css";
import { Icon } from "../Navbar/Toolkit/Icon/Icon";

export const Footer = () => {
    return (
        <footer
            className={styles.footer}
        >
            <Container
                style={{
                    width: "81%",
                    display: "block"
                }}
            >
                <Icon
                    color="#fff"
                    style={{
                        marginTop: "20px",
                        width: "50%"
                    }}
                />

                <ContactUs
                    style={{
                        marginTop: "30px",
                    }}
                />
                <SocialMedia/>
            </Container>
        </footer>
    );
}