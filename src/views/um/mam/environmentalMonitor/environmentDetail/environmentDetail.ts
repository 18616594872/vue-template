import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    customerDataList
} from '@/api/listCustomer.ts'
import {
    Page
} from '@/types/common.interface'
import {
    ExtendDate
} from '@/utils/common'
import { equipmentTypeDataList } from '@/api/environmentDetail'

@Component({})
export default class About extends Vue {

    // data
    page: Page = {
        current: 1,
        pageSize: 8,
        total: 0
    }
    equipTypeDataTitle: any[] = [
        {
            title: "对象名",
            key: "name",
            align: "center"
        },
        {
            title: "所属管廊",
            key: "tunnel",
            align: "center"
        },
        {
            title: "所属区域",
            key: "area",
            align: "center"
        },
        {
            title: "舱室",
            key: "store",
            align: "center"
        },
        {
            title: "具体位置",
            key: "location",
            align: "center"
        },
        {
            title: "创建时间",
            align: "center",
            render: (h: any, params: any) => {
                return h(
                    "div",
                    new ExtendDate(params.row.crtTime).format(
                        "yyyy-MM-dd hh:mm:ss"
                    )
                );
            }
        },
        {
            title: "数值",
            key: "curValue",
            align: "center"
        },
        {
            title: "是否正常",
            align: "center",
            key: "isNormal"
        },
        {
            title: "操作",
            align: "center",
            render: (h: any, params: any) => {
                return h("div", [
                    h(
                        "Button",
                        {
                            class: "edit",
                            props: {
                                type: "error",
                                size: "small"
                            },
                            style: {
                                marginRight: "0.4vmin"
                            },
                            on: {
                                click: () => {
                                    console.log(params)
                                }
                            }
                        },
                        "查看历史数据"
                    )
                ]);
            }
        }
    ]
    equipTypeDataList: any[] = []

    mounted() {
        this.getEquipTypeDataList()
    }

    getEquipTypeDataList(){
        equipmentTypeDataList().then(
            (result: any) => {
                let {
                    code,
                    data
                } = result.data
                if (code === 200) {
                    let [{list, total}] = data

                    this.equipTypeDataList = list
                    console.log()
                    this.page.total = total
                }
            },
            (error: any) => {
                (this as any).Log.warn(error)
            }
        )
    }

}