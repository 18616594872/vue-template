export interface contractDataList{
    list: contractDetail[],
    totle: number
}

export interface contractDetail {
    id: number,
    name: string,
    company: companyDetail,
    contractStatusName: string,
    crtTime: string,
    payTypeName: string
}

export interface companyDetail {
    name: string,
    phone: string
}