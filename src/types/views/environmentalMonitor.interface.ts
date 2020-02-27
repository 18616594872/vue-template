export interface MonitorType {
    id: number,
    title: string,
    titleImg?: string
}

export interface Codition {
    tunnelId: number | null | undefined,
    storeId: number | null | undefined,
    areaId: number | null | undefined,
    objtypeId: number
}