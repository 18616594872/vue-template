
export interface FormValidate {
    userName: string,
    passWord: string
}

export interface Validate {
    required: boolean,
    message: string,
    trigger: string
}

export interface RuleValidate {
    userName: Validate[]
    passWord: Validate[]
}