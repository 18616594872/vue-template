import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    EnvironmentMonitorData,
    SecurityMonitorData,
    EquState
} from '@/types/views/environmentMonitor.interface'
import {
    listEnvironmentMonitorData,
    listSecurityData
} from '@/api/environmentMonitor'

@Component({})
export default class About extends Vue {

    environmentMonitorIMG: string = require("@/assets/images/vm/tunnel-bg.png")
    collapseIMG: string = require("@/assets/images/vm/env-info-bg.png")
    titleIMG: string = require("@/assets/images/vm/info-title.png")
    pageTitleIMG: string = require("@/assets/images/vm/page-title-bg.png")
    environmentSpotIMG: string = require("@/assets/images/vm/spot-bg.png")
    tunnelIcon: string = require("@/assets/images/vm/tunnel-icon.png")

    // data
    EMData: EnvironmentMonitorData = {
        value: '1',
        environmentMonitorInfo: []

    }
    SEData: SecurityMonitorData = {
        value: '1',
        securityMonitorInfo: []
    }

    equState: EquState = {
        id: '',
        objTypeId: ''
    }

    SpotData: any[] = [{
            spotKey: '温度',
            spotVal: '30℃'
        },
        {
            spotKey: '湿度',
            spotVal: '13%RH'
        },
        {
            spotKey: '氧气',
            spotVal: '13%'
        },
        {
            spotKey: '甲烷',
            spotVal: '36LEL'
        },
        {
            spotKey: '硫化氢',
            spotVal: '3ppm'
        },
        {
            spotKey: '一氧化碳',
            spotVal: '3ppm'
        }
    ]

    canvasPos: any = {
        position: 'absolute',
        left: '',
        top: ''
    }

    isWithCanvas: boolean = false

    objType: any[] = [{
            id: 1,
            typeName: '温度',
            normalMin: -15,
            mormalMax: 40
        },
        {
            id: 2,
            typeName: '湿度',
            normalMin: 5,
            normalMax: 95
        },
        {
            id: 3,
            typeName: '氧气',
            normalMin: 15,
            normalMax: 28
        },
        {
            id: 5,
            typeName: '甲烷',
            normalMin: 0,
            normalMax: 50
        },
        {
            id: 4,
            typeName: '硫化氢',
            normalMin: 0,
            normalMax: 50
        },
        {
            id: 6,
            typeName: '一氧化碳',
            normalMin: 0,
            normalMax: 100
        }
    ]
    cameraAngle: any = {
        longitude: 112.488275,
        latitude: 37.713998,
        height: -3.13,
        roll: 6.283185,
        pitch: -0.174532,
        heading: 1.780236
    }

    isShow: number = -1

    mounted() {
        this.listEnvironmentMonitorData()
        this.listSecurityData()
    }

    listEnvironmentMonitorData() {
        return listEnvironmentMonitorData().then(res => {
            let {
                code,
                data,
                msg
            } = res.data
            if (code === 200) {
                this.EMData.environmentMonitorInfo = data
            }
        }).catch(error => {
            (this as any).Log.warn(error)
        })
    }

    listSecurityData() {
        return listSecurityData().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.SEData.securityMonitorInfo = data
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

    choosedfault(index: number) {
        this.isShow = index
    }

    zoomTo(idString: string) {
        let elementId = idString.split(',')[0];
        let typeId = idString.split(',')[1];
        (this.$refs.envMonitorBim as any).zoomTo(elementId)
        this.equState = {
            id: elementId,
            objTypeId: typeId
        }
    }
}