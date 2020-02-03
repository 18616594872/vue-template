import {
    Component,
    Vue
} from "vue-property-decorator"
import {
    PlanManageData,
    TotalNumData,
    SimulateSpeed
} from '@/types/views/planManage.interface'
import {
    listAlarmData,
    listPlanData
} from '@/api/planManage'

@Component({})
export default class About extends Vue {

    planManageIMG: string = require('@/assets/images/vm/plan-bg.png')
    guideIcon: string = require('@/assets/images/vm/guide-icon.png')

    alarmData: any[] = []

    TotalNum: TotalNumData = {
        totalNormalNum: 0,
        totalUnNormalNum: 0,
        totalHiddenNum: 0,
        totalRepairNum: 0,
        totalOtherNum: 0
    }

    PData: PlanManageData = {
        model: 1,
        planInfo: [
        ]
    }

    btnInfo: any[] = [{
            btnContent: '模拟'
        },
        {
            btnContent: '停止'
        },
        {
            btnContent: '暂停'
        }
    ]

    SPData: SimulateSpeed = {
        model: 1,
        speedOption: [{
                id: 1,
                speed: '正常x1.0'
            },
            {
                id: 2,
                speed: '加速x1.25'
            }
        ]
    }
    mounted() {
        this.listAlarmData()
        this.listPlanData()
    }

    listAlarmData() {
        return listAlarmData().then(res => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.alarmData = data
                this.alarmData.forEach(item => {
                    this.TotalNum.totalNormalNum += item.normalNum
                    this.TotalNum.totalUnNormalNum += item.unNormalNum
                    this.TotalNum.totalHiddenNum += item.hiddenNum
                    this.TotalNum.totalRepairNum += item.repairNum
                    this.TotalNum.totalOtherNum += item.othersNum
                })
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

    listPlanData() {
        return listPlanData().then(res => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.PData.planInfo = data
            }
        }).catch((error: any) => {
            (this as any).Log.warn(error)
        })
    }

}