// Login.Data 参数类型
export interface LoginData {
    pageName: string
}

// VUEX Login.State 参数类型
export interface FormValidate {
    userName: string,
    passWord: any
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