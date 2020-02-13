
export interface ModuleItem {
    id: string, 
    navBarParentName: string, 
    children: SubFunModuleItem[]
}

export interface SubFunModuleItem {
    id: string,
    navBarName: string,
    url?: string,
    children?: DetailSubFunModuleItem[]
}

export interface DetailSubFunModuleItem {
    id: string,
    menuName: string,
    url: string
}