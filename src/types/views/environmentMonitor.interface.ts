export interface baseData {
    value?: string,
    isTrue?: boolean
}

interface securtiyData {
    tunnelKey: string,
    tunnelName:string,
    isNormal: boolean,
    list:any[]
}

interface environInfo {
    tunnelKey: string,
    tunnelName: string,
    isNormal: boolean,
    list: any[]
}

export interface EnvironmentMonitorData extends baseData{
    environmentMonitorInfo?: environInfo[]
}

export interface SecurityMonitorData extends baseData{
    securityMonitorInfo?: securtiyData[]
}



