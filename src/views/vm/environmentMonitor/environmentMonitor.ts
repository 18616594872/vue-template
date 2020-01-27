import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    EnvironmentMonitorData,
    SecurityMonitorData,
    EquState
} from '@/types/views/environmentMonitor.interface'
import BrokenLine from '@/components/common/brokenLine/brokenLine.vue'
import {
    listEnvironmentMonitorData,
    listSecurityData
} from '@/api/environmentMonitor'

@Component({
    components: {
        BrokenLine
    }
})
export default class About extends Vue {

    environmentMonitorIMG: string = require("@/assets/images/bv/tunnel-bg.png")
    collapseIMG: string = require("@/assets/images/bv/env-info-bg.png")
    titleIMG: string = require("@/assets/images/bv/info-title.png")
    pageTitleIMG: string = require("@/assets/images/bv/page-title-bg.png")
    environmentSpotIMG: string = require("@/assets/images/bv/spot-bg.png")
    tunnelIcon: string = require("@/assets/images/bv/tunnel-icon.png")

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

    getMousePos(event: any) {
        let e = event || window.event;
        let c = document.getElementsByTagName('canvas')[0] as HTMLCanvasElement
        let widthNum = 100
        let heightNum = 100
        let dot = 8
        c.setAttribute('height', heightNum + 'px')
        c.setAttribute('width', widthNum + 'px')
        c.style.left = e.pageX + 'px'
        c.style.top = e.pageY + 'px'
        let ctx = c.getContext("2d") as CanvasRenderingContext2D;
        // 绘制点
        ctx.beginPath();
        // 绘制定点
        ctx.arc(widthNum / 2, dot, dot, 0, 2 * Math.PI)
        ctx.strokeStyle = "#00f0ff";
        ctx.fillStyle = "#00f0ff";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        // 绘制折线
        ctx.beginPath();
        // 折线开始位置
        ctx.moveTo(widthNum / 2, dot);
        // 第一个折
        ctx.lineTo(dot, heightNum / 2);
        // 第二个折
        ctx.lineTo(dot, heightNum)
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#00f0ff";
        ctx.stroke();
        ctx.closePath();
        this.isWithCanvas = true
        let s = document.getElementsByClassName('spot-wrap')[0] as HTMLDivElement
        s.style.left = Number(e.pageX) - 100 + 'px'
        s.style.top = Number(e.pageY) + Number(heightNum) + 'px'
    }

    mounted() {
        // this.init()
        this.listEnvironmentMonitorData()
        this.listSecurityData()
    }

    listEnvironmentMonitorData() {
        return new Promise((resolve, reject) => {
            listEnvironmentMonitorData().then(res => {
                let {
                    code,
                    data,
                    msg
                } = res.data
                if (code === 200) {
                    this.EMData.environmentMonitorInfo = data
                    resolve()
                }
            }).catch(error => {
                reject(error)
            })
        })
    }

    listSecurityData() {
        return new Promise((resolve, reject) => {
            listSecurityData().then((res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    this.SEData.securityMonitorInfo = data
                    resolve()
                }
            }).catch((error: any) => {
                reject(error)
            })
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