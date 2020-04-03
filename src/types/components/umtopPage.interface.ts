
export interface ModuleItem {
    id: string, 
    navBarName: string, 
    path: string,
    children: SubFunModuleItem[]
}

export interface SubFunModuleItem {
    id: string,
    secondMenuName: string,
    path: string,
    children?: SubFunModuleItem[]
}
