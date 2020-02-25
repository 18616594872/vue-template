import {
    Component,
    Vue
} from 'vue-property-decorator'
import publicMonitorDetails from '@/components/um/publicMonitorDetails.vue'
import environmentDetail from './environmentDetail/environmentDetail.vue'
import environmentList from './environmentList/environmentList.vue'
import {
    MonitorType
} from '@/types/views/environmentalMonitor.interface.ts'
import {
    equipmentTypeList
} from '@/api/environmentalMonitor'

@Component({
    components: {
        publicMonitorDetails,
        environmentDetail,
        environmentList
    }
})
export default class About extends Vue {

    // data
    monitorTypeList: MonitorType[] = []
    monitorTypeImg: any[] = [
        {
            id: 1,
            defaultStatus: '1',
            checkStatus: '-1'
        },
        {
            id: 2,
            defaultStatus: '2',
            checkStatus: '-2'
        },
        {
            id: 3,
            defaultStatus: '3',
            checkStatus: '-3'
        },
        {
            id: 4,
            defaultStatus: '4',
            checkStatus: '-4'
        },
        {
            id: 5,
            defaultStatus: '5',
            checkStatus: '-5'
        },
        {
            id: 6,
            defaultStatus: '6',
            checkStatus: '-6'
        }
    ]

    mounted() {
        this.getMonitorTypeList()
    }
    getMonitorTypeList() {
        equipmentTypeList()
            .then((res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    this.monitorTypeList = data
                    // this.monitorTypeList = data.map((item: MonitorType, index: number) => {
                    //     if(index === 0){
                    //         return item.titleImg = this.monitorTypeImg[index].checkStatus
                    //     }
                    //     return item.titleImg = this.monitorTypeImg[index].defaultStatus

                    // })
                    // console.log(this.monitorTypeList)
                }
            })
            .catch((error: any) => {
                (this as any).Log.warn(error)
            })
    }

}