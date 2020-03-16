import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    customerDataList
} from '@/api/listCustomer'
import {
    Page
} from '@/types/common.interface'

@Component({})
export default class ListCustomer extends Vue {

    page: Page = {
        current: 1,
        pageSize: 8,
        total: 0
    }
    conditions: any = {
        bank: null,
        name: null,
        startTime: null,
        endTime: null
    }
    pageStyle: any = {
        position: "absolute",
        bottom: "1vmin",
        right: "2.5vmin",
        color: "#fff"
    }
    companyColumn: any[] = [{
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
        }
    ]
    customerData: any[] = []

    get params() {
        return {
            pageNum: this.page.current,
            pageSize: this.page.pageSize,
            name: this.conditions.name,
            bank: this.conditions.bank,
            startTime: new Date(this.conditions.startTime).getTime(),
            endTime: new Date(this.conditions.endTime).getTime()
        }
    }

    mounted() {
        this.queryList()
    }

    queryList() {
        if (
            new Date(this.conditions.startTime) >
            new Date(this.conditions.endTime)
        ) {
            this.$Message.error("开始时间必须小于结束时间！")
            return
        }
        customerDataList().then(
            (result: any) => {
                let {
                    code,
                    data
                } = result.data
                if (code === 200) {
                    let [{list, total}] = data

                    this.customerData = list
                    this.page.total = total
                }
            },
            (error: any) => {
                (this as any).Log.warn(error)
            }
        );
    }

    handlePage(value: number) {
        this.queryList();
    }

    handlePageSize(value: number) {
        this.page.pageSize = value;
        this.queryList();
    }
}