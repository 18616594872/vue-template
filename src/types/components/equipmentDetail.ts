export interface EquipDataInterface {
    id: string,
    objtypeName: string,
    ObjName: string,
    ObjVal: number,
    objtypeId: number,
    clickStatus: boolean,
    datatypeId: string,
    minValue: number,
    maxValue: number,
    time: string,
    location: string,
    unit: string,
    minNormal?: number,
    maxNormal?: number
}

export interface ImgStatus {
    objtypeId: number,
    fun: any
}
