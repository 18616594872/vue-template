export interface MonitorType {
    id: number,
        name: string,
        titleImg ? : string
}

export interface Codition {
    tunnelId: number | null | undefined,
    storeId: number | null | undefined,
    areaId: number | null | undefined,
    objtypeId: number
}

export interface EquipmentDataList {
    card: EquipmentProp[],
    table: EquipmentCardData
}

export interface EquipmentProp {
    area: string,
    areaId: number,
    control?: boolean,
    curValue: any,
    datatypeId: number,
    description: string,
    id: number,
    name: string,
    store: string,
    storeId: number,
    tunnel: string,
    tunnelId: number,
    time: string,
    objtypeName?: string,
    objtypeId?: number,
    maxNormal?: number
    maxValue?: number
    minNormal?: number
    minValue?: number,
    reset?: boolean,
    unit?: string
}

export interface EquipmentCardData {
    total: number, // 数据总数
    pageSize: number, //每页条数 
    equipProp: EquipmentProp[]
}