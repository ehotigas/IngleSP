'use client'
import { LogoImageSection } from "@/components/PageLayout/LogoImageSection";
import { SubmitButton } from "@/components/Input/SubmitButton/SubmitButton";
import { Input } from "@/components/Input/Input/Input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./page.module.css";
import { useState } from "react";
import Link from "next/link";
import { NextPage } from "next";


interface UserLogin {
    email: string,
    password: string
}

interface PageState {
    error: string,
    processing: boolean
}

const errorMap = {
    "CredentialsSignin": "Invalid email or password"
}

const Signin: NextPage = (

) => {
    const router = useRouter();
    const [authState, setAuthState] = useState<UserLogin>(
        {
            email: '',
            password: ''
        }
    );
    const [pageState, setPageState] = useState<PageState>(
        {
            error: '',
            processing: false
        }
    )

    const handleFieldChange = (
        fieldName: keyof UserLogin
    ) => {
        return (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {
            setAuthState(
                {
                    ...authState,
                    [fieldName]: event.target.value
                }
            )
        }
    }

    const simplifyError = (
        error: keyof typeof errorMap
    ): string => {
        return errorMap[error] ?? "Unknown error occurred"
    }

    const handleClickButton = async () => {
        setPageState(old => ({...old, processing: true, error: ''}));
        signIn(
            'credentials',
            {
                ...authState,
                redirect: false
            }
        ).then(
            (response: any) => {
                if (response.ok) {
                    // Authenticate user
                    router.push("/")
                } else {
                    setPageState(old => ({ ...old, processing: false, error: response.error }))
                }
            }
        ).catch(
            (error: any) => {
                console.log(error);
                console.log(error.message);
                setPageState(
                    state => ({
                        ...state,
                        processing: false,
                        error: error.message ?? "Something went wrong!"
                    })
                )
            }
        )
    }
    return (
        <LogoImageSection
            margin="14vh"
        >
            <div
                className={styles.titleContainer}
            >
                <h2
                    className={styles.title}
                >
                    Login
                </h2>
                <p
                    className={styles.welcomeBack}
                >
                    Welcome Back
                </p>
                <Input
                    fieldName="email"
                    onChange={handleFieldChange('email')}
                />
                <Input
                    fieldName="password"
                    type="password"
                    onChange={handleFieldChange('password')}
                />
                <Link
                    href='/forgotPass'
                >
                    <p
                        className={`${styles.welcomeBack} ${styles.forgotPass}`}
                    >
                        Forgot Password?
                    </p>
                </Link>
                {
                    pageState.error !== '' &&
                    <p
                        style={{
                            color: "red",
                            
                        }}
                    >
                        {
                            simplifyError(pageState.error as keyof typeof errorMap)
                        }
                    </p>
                }
                <SubmitButton
                    text="Login"
                    onClick={handleClickButton}
                />
            </div>
        </LogoImageSection>
    );
}

export default Signin;