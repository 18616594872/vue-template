export interface EquipmentType {
    typeId: number,
    name: string,
    url: string,
    open: number,
    close: number,
    fault?: number,
    other?: number
}

export interface Title {
    name: string,
    showFlag: boolean,
    turnTo: string
}


