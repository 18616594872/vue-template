
export interface ModuleItem {
    id: string, 
    name: string, 
    path: string,
    component: Function,
    hidden?: boolean,
    children: Array< SubFunModuleItem >
}

export interface SubFunModuleItem {
    name: string,
    path: string,
    component: Function,
    hidden?: boolean,
    children?: Array< SubFunModuleItem >,
    meta?:Object
}
