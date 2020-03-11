import {
    Component,
    Vue
} from 'vue-property-decorator'
import publicMonitorDetails from '@/components/um/publicMonitorDetails/publicMonitorDetails.vue'
import mechanicalList from './mechanicalList/mechanicalList.vue'
import {
    MonitorType,
    Codition
} from '@/types/views/environmentalMonitor.interface.ts'
import {
    equipmentTypeList,
    equipmentTypeDataList
} from '@/api/environmentalMonitor'

@Component({
    components: {
        publicMonitorDetails,
        mechanicalList
    }
})
export default class About extends Vue {

    // data
    monitorTypeList: MonitorType[] = []
    equipTypeList: {
        card: any[],
        table: any[]
    } = {
        card: [],
        table: []
    }
    showCard: boolean = true // 展示详情 或 表格

    mounted() {
        this.getMonitorTypeList()
    }

    getMonitorTypeList() {
        equipmentTypeList(1)
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
                (this as any).Log.warn(error)
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
                    data.forEach((a: any) => {
                        let o = < any > {}
                        o = a
                        o.ObjName = a.name
                        o.ObjVal = a.curValue
                        o.id = a.id
                        o.control = a.control
                        o.reset = a.reset
                        o.datatypeId = a.datatypeId
                        o.maxValue = a.maxValue
                        o.minValue = a.minValue
                        o.location = a.description
                        o.unit = a.unit
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
                    '58': [{
                        area: "22区",
                        areaId: 1020,
                        areaLeath: 165,
                        control: true,
                        curValue: {
                            close: {
                                index: 1,
                                descript: "关足",
                                value: false
                            },
                            fault: {
                                index: 3,
                                descript: "故障",
                                value: true
                            },
                            open: {
                                index: 2,
                                descript: "开足",
                                value: false
                            }
                        },
                        datatypeId: 200,
                        description: "K3+640",
                        id: 222234200,
                        maxNormal: "-",
                        maxValue: "-",
                        minNormal: "-",
                        minValue: "-",
                        name: "电动百叶",
                        reset: true,
                        store: "综合舱排风口",
                        storeId: 1016,
                        time: 1575363603000,
                        tunnel: "古城大街",
                        tunnelId: 1,
                        unit: ""
                    }],
                    '10': [{
                        area: "22区",
                        areaId: 1020,
                        areaLeath: 165,
                        control: true,
                        curValue: {
                            fault: {
                                index: 3,
                                descript: "故障",
                                value: false
                            },
                            remote: {
                                index: 5,
                                descript: "就地/遥控",
                                value: true
                            },
                            run: {
                                index: 1,
                                descript: "运行/停止",
                                value: true
                            }
                        },
                        datatypeId: 200,
                        description: "K3+640",
                        id: 222234100,
                        maxNormal: "-",
                        maxValue: "-",
                        minNormal: "-",
                        minValue: "-",
                        name: "风机",
                        reset: false,
                        store: "综合舱排风口",
                        storeId: 1016,
                        time: 1575363603000,
                        tunnel: "古城大街",
                        tunnelId: 1,
                        unit: ""
                    }],
                    '59': [{
                        area: "22区",
                        areaId: 1020,
                        areaLeath: 165,
                        control: true,
                        curValue: {
                            fault: {
                                index: 3,
                                descript: "故障",
                                value: false
                            },
                            remote: {
                                index: 5,
                                descript: "就地/遥控",
                                value: false
                            },
                            run: {
                                index: 1,
                                descript: "运行/停止",
                                value: false
                            }

                        },
                        datatypeId: 200,
                        description: "K3+640",
                        id: 222014500,
                        maxNormal: "-",
                        maxValue: "-",
                        minNormal: "-",
                        minValue: "-",
                        name: "排水泵",
                        reset: false,
                        store: "污水舱",
                        storeId: 1011,
                        time: 1575363603000,
                        tunnel: "古城大街",
                        tunnelId: 1,
                        unit: ""
                    }]
                }
                let data: any[] = arr[condition.objtypeId]

                equipTypeList.table = data

                equipTypeList.card.splice(0)
                data.forEach((a: any) => {
                    let o = < any > {}
                    o = a
                    o.ObjName = a.name
                    o.ObjVal = a.curValue
                    o.id = a.id
                    o.control = a.control
                    o.reset = a.reset
                    o.datatypeId = a.datatypeId
                    o.maxValue = a.maxValue
                    o.minValue = a.minValue
                    o.location = a.description
                    o.unit = a.unit
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