export interface UserLoginReq {
    email?: string
    password?: string
}

export interface User extends UserLoginReq {
    full_name: string
    id: number
    is_active : boolean
    is_staff: boolean
    is_superuser: boolean
    school_name: string
    segment: string
    username: string
    detail?: string
}

interface UserData extends Omit<User, 'password'> {

}

export interface UserRes {
    user: UserData,
}

// export interface User {
//     name: string
//     email: string
//     school: string
//     username: string
//     superUser: boolean
//     score?: float
// }

export interface newUser {
    name: string
    email: string
    school: string
    username: string
    superUser: boolean
    score?: float
    password: string
    confirmPassword: string
    segment: string
}

export interface UserLoginRes {
    expiry: string
    token: string
    user_id: string
}

export interface QuestionCategory {
    name: string
}

export interface MultipleChoiceAnswer {
    id: number
    answer_text: string
    is_correct: boolean
    userAnswer: boolean
}

export interface MultipleChoiceQuestion {
    id: number
    title: string
    category: QuestionCategory
    question_text: string
    answers_multiple: MultipleChoiceAnswer[]
}

export interface PlacementTest {
    id: number,
    title: string
    multiple_choice_questions: MultipleChoiceQuestion[]
}