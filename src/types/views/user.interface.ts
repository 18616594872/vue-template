// VUEX User.State 参数类型
export interface UserState {
    token?: string | false,
    name?: string,
    routelist?: string[],
    queueName?: string,
    permissions: Array<Object>,
}
export interface UserInfo {
    userName: string,
    passWord: string 
}

export interface RouteInfo {
    routers: any[],
    addRouters: any[]
}