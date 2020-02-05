import {
    Component,
    Vue
} from "vue-property-decorator"
import {
    TotalNumData
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

    PData: any = {
        model: 1,
        planInfo: []
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

    mounted() {
        this.listAlarmData()
        this.listPlanData()
    }

    listAlarmData() {
        return listAlarmData().then((res: any) => {
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