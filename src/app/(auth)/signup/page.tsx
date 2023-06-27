"use client"
import { SubmitButton } from "@/components/Input/SubmitButton/SubmitButton";
import { LogoImageSection } from "@/components/PageLayout/LogoImageSection";
import { DropDown } from "@/components/Input/DropDown/DropDown";
import { Input } from "@/components/Input/Input/Input";
import { useRouter } from "next/navigation";
import { newUser } from "@/types/global";
import styles from "./page.module.css";
import { useState } from "react";
import { NextPage } from "next";


const verifyUserFields = (
    user: newUser
): string[] => {
    const errs: string[] = [];
    Object.keys(user).forEach(
        (element: string) => {
            element
        }
    )
    return errs;
}

const SignUp: NextPage = () => {
    const router = useRouter();
    const [errs, setErrs] = useState<string[]>([]);
    const [user, setUser] = useState<newUser>(
        {
            name: "",
            email: "",
            school: "",
            username: "",
            superUser: false,
            password: "",
            confirmPassword: "",
            segment: ""
        }
    );
    const onChange = (
        attribute: keyof newUser
    ) => {
        return (
            event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
        ) => {
            setUser({ ...user, [attribute]: event.target.value })
        }
    }
    const handleClickButton = () => {
        // update backEnd
        setErrs([]);
        setErrs(verifyUserFields(user));
        if (errs.length !== 0)
            return;
        const body = JSON.stringify(
            {
                username: user.username,
                name: user.name,
                segment: user.segment,
                school: user.school,
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword
            }
        );
        fetch(
            "http://localhost:3000/api/user",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            }
        ).then(
            (res: Response) => {
                if (res.ok) {
                    router.push("/signin");
                }
                setErrs([...errs, "Server Error"]);
            }   
        ).catch(
            () => {
                setErrs([...errs, "Server Error"]);
            }
        )
    }

    return (
        <LogoImageSection
            margin="1.5vh"
        >
            <div
                className={styles.titleContainer}
            >
                <h2
                    className={styles.title}
                >
                    Sign Up
                </h2>
                <p
                    className={styles.welcomeBack}
                >
                    Welcome
                </p>
                <Input
                    fieldName="name"
                    onChange={onChange("name")}
                />
                <Input
                    fieldName="username"
                    onChange={onChange("username")}
                />
                <Input
                    fieldName="email"
                    onChange={onChange("email")}
                />
                <Input
                    fieldName="password"
                    onChange={onChange("password")}
                    type="password"
                />
                <Input
                    fieldName="confirm-password"
                    onChange={onChange("confirmPassword")}
                    type="password"
                />
                {/* segmento: EM ou fundamental */}
                <Input
                    fieldName="school"
                    onChange={onChange("school")}
                />
                <DropDown
                    values={['Fundamental', 'Ensino Médio']}
                    onChange={onChange("segment")}
                />
                <SubmitButton
                    text="Sign Up"
                    onClick={
                        () => {
                            handleClickButton();
                        }
                    }
                />
            </div>
        </LogoImageSection>
    );
}

export default SignUp;