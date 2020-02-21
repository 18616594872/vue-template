export interface Page {
    // 当前页码
    current: number,
    // 每页条数
    pageSize: number,
    // 数据总数
    total: number
}

export interface Contract {
    name: string,
    contractStartTime: Date,
    contractEndTime: string,
    payType: "1",
    companyId: number,
    cableName: string,
    cableLength: string,
    areaIds: string[],
    storeId: string,
    id: string,
    cableId: string,
    contractStatus: string,
    cableStatus: string,
    tunnelId: number,
    operateUsername: string,
    path: string
}

export interface keyVal {
    key: string,
    val: string | number
}