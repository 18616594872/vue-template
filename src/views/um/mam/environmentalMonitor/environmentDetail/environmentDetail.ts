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
            title: "企业名称",
            key: "name",
            align: "center"
        },
        {
            title: "信用代码",
            key: "creditNo",
            align: "center"
        },
        {
            title: "开户行",
            key: "bank",
            align: "center"
        },
        {
            title: "账号",
            key: "account",
            align: "center"
        },
        {
            title: "注册地址",
            key: "address",
            align: "center"
        },
        {
            title: "注册电话",
            key: "phone",
            align: "center"
        },
        {
            title: "邮箱",
            key: "mail",
            align: "center"
        },
        {
            title: "操作",
            align: "center",
            render: (h: any) => {
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
                                    alert('')
                                }
                            }
                        },
                        "编辑"
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
        customerDataList().then(
            (result: any) => {
                let {
                    code,
                    data
                } = result.data
                if (code === 200) {
                    let [{list, total}] = data

                    this.equipTypeDataList = list
                    this.page.total = total
                }
            },
            (error: any) => {
                (this as any).Log.warn(error)
            }
        )
    }

}