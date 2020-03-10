import {
    Component,
    Vue
} from 'vue-property-decorator'
import publicMonitorDetails from '@/components/um/publicMonitorDetails/publicMonitorDetails.vue'
import securityList from './securityList/securityList.vue'
import {
    MonitorType,
    Codition,
    EquipmentProp,
    EquipmentDataList
} from '@/types/views/environmentalMonitor.interface.ts'
import {
    equipmentTypeList,
    equipmentTypeDataList
} from '@/api/environmentalMonitor'

@Component({
    components: {
        publicMonitorDetails,
        securityList
    }
})
export default class About extends Vue {

    // data
    monitorTypeList: MonitorType[] = []
    equipTypeList: EquipmentDataList = {
        card: [],
        table: {
            total: 0, // 数据总数
            pageSize: 0, //每页条数 
            equipProp: []
        }
    }
    showCard: boolean = true // 展示详情 或 表格

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
                }
            })
            .catch((error: any) => {
                // (this as any).Log.warn(error)
                this.monitorTypeList = [{
                        id: 56,
                        name: "智能井盖"
                    },
                    {
                        id: 63,
                        name: "布防"
                    },
                    {
                        id: 64,
                        name: "联动"
                    },
                    {
                        id: 41,
                        name: "声光报警"
                    },
                    {
                        id: 57,
                        name: "红外"
                    }
                ]
            })
    }
    getDetailList(condition: Codition) {
        let {
            equipTypeList
        } = this
        equipmentTypeDataList(condition).then(
            (result: any) => {
                let {
                    code,
                    data
                } = result.data
                if (code === 200) {
                    equipTypeList.table = data

                    equipTypeList.card.splice(0)
                    data.equipProp.forEach((a: EquipmentProp) => {
                        let o = < any > {}
                        o = a
                        o.clickStatus = false
                        o.objtypeId = condition.objtypeId
                        o.time =
                            a.time == undefined || a.time == "" ?
                            "" :
                            new Date(a.time).format(
                                "yyyy-MM-dd hh:mm:ss"
                            )
                        o.objtypeName =
                            a.tunnel + a.area + a.store
                        equipTypeList.card.push(o)
                    })

                }
            },
            (error: any) => {
                (this as any).Log.warn(error)
                let arr = {
                    '63': {
                        total: 1, // 数据总数
                        pageSize: 10, //每页条数 
                        equipProp: [{
                            area: "22区",
                            areaId: 1020,
                            control: true,
                            curValue: {
                                run: {
                                    index: 1,
                                    descript: "输入值",
                                    value: false
                                }
                            },
                            datatypeId: 200,
                            description: "",
                            id: 222015100,
                            name: "布防/撤防",
                            reset: false,
                            store: "污水舱",
                            storeId: 1011,
                            tunnel: "古城大街",
                            tunnelId: 1,
                            time: 1575363603000,
                        }]
                    },
                    '57': {
                        total: 1, // 数据总数
                        pageSize: 10, //每页条数 
                        equipProp: [{
                            area: "22区",
                            areaId: 1020,
                            control: false,
                            curValue: 0,
                            datatypeId: 2,
                            description: "K3+640",
                            id: 222233101,
                            name: "微波红外入侵探测器",
                            reset: false,
                            store: "综合舱排风口",
                            storeId: 1016,
                            tunnel: "古城大街",
                            tunnelId: 1,
                            time: 1575363603000,
                        }]
                    },
                    '56': {
                        total: 1, // 数据总数
                        pageSize: 10, //每页条数 
                        equipProp: [{
                            area: "22区",
                            areaId: 1020,
                            control: true,
                            curValue: {
                                close: {
                                    index: 1,
                                    descript: "关足",
                                    value: false
                                },
                                fault1: {
                                    index: 3,
                                    descript: "故障",
                                    value: false
                                },
                                fault2: {
                                    index: 4,
                                    descript: "运行故障",
                                    value: false
                                },
                                open: {
                                    index: 2,
                                    descript: "开足",
                                    value: true
                                }
                            },
                            datatypeId: 200,
                            description: "K3+515",
                            id: 222113300,
                            name: "智能井盖",
                            reset: true,
                            store: "污水舱进风口",
                            storeId: 1012,
                            tunnel: "古城大街",
                            tunnelId: 1,
                            time: 1575363603000,
                        }]
                    }
                }
                let data: any = arr[condition.objtypeId]

                equipTypeList.table = data

                equipTypeList.card.splice(0)
                data.equipProp.forEach((a: EquipmentProp) => {
                    let o = < any > {}
                    o = a
                    o.clickStatus = false
                    o.objtypeId = condition.objtypeId
                    o.time =
                        a.time == undefined || a.time == "" ?
                        "" :
                        new Date(a.time).format(
                            "yyyy-MM-dd hh:mm:ss"
                        )
                    o.objtypeName =
                        a.tunnel + a.area + a.store
                    equipTypeList.card.push(o)
                })

            }
        )
    }

    getPageStatus(show: boolean) {
        this.showCard = show
    }

}