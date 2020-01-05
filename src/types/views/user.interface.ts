// VUEX User.State 参数类型
export interface UserState {
    token?: string,
    name?: string,
    routelist?: string[],
    queueName?: string
}
export interface UserInfo {
    username: string,
    password: string 
}

export interface RouteInfo {
    routers: any[],
    addRouters: any[]
}