export interface EquipDataInterface {
    id: number,
    objtypeName: string,
    ObjName: string,
    ObjVal: any,
    objtypeId: number,
    clickStatus: boolean,
    datatypeId: number,
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
