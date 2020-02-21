import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    getPayType,
    getContractStatus,
    contractDatagrid
} from '@/api/listContract.ts'
import {
    Page,
    keyVal
} from '@/types/common.interface'

@Component({})
export default class ListContract extends Vue {

    page: Page = {
        current: 1,
        pageSize: 8,
        total: 0
    }
    contractList: any[] = []
    conditions: any = {
        payment: null,
        contractId: null,
        contractName: null,
        startTime: null,
        endTime: null,
        companyId: null,
        contractStatus: null
    }
    selectList: any = {
        payTypes: [],
        contractStatus: []
    }
    customerName: string = ""
    pageStyle: any = {
        position: "absolute",
        bottom: "1vmin",
        right: "2.5vmin",
        color: "#fff"
    }
    isNullData: boolean = false
    contractColumn: any = [{
            title: "合同名称",
            key: "name",
            align: "center"
        },
        {
            title: "企业名称",
            align: "center",
            render: (h: any, params: any) => {
                return h("div", {}, params.row.company.name);
            }
        },
        {
            title: "联系方式",
            align: "center",
            render: (h: any, params: any) => {
                return h("div", params.row.company.phone);
            }
        },
        {
            title: "合同状态",
            key: "contractStatusName",
            align: "center"
        },
        {
            title: "付款方式",
            key: "payTypeName",
            align: "center"
        }
    ]
    contractData: any[] = []

    get param() {
        return {
            pageNum: this.page.current,
            pageSize: this.page.pageSize,
            id: this.conditions.contractId ?
                this.conditions.contractId : null,
            name: this.conditions.contractName,
            startTime: new Date(this.conditions.startTime).getTime(),
            endTime: new Date(this.conditions.endTime).getTime(),
            companyId: this.conditions.companyId,
            payType: this.conditions.payment,
            contractStatus: this.conditions.contractStatus
        }
    }

    mounted() {
        this.getSelectOptions()
        this.search()
        this.$nextTick(() => {
            let width = (document.getElementById("payment") as any).offsetWidth;
            (document.getElementById("cusInput") as any).style.width = width + "px";
        });
        window.onresize = function () {
            let width = (document.getElementById("payment") as any).offsetWidth;
            (document.getElementById("cusInput") as any).style.width = width + "px";
        };
    }

    getSelectOptions() {
        this.getPayTypeList().then((res: keyVal[]) => {
            this.selectList.payTypes = res
        })
        this.getContractStatusList().then((res: keyVal[]) => {
            this.selectList.contractStatus = res
        })
    }

    resetPageAndSearch() {
        this.page.current = 1;
        this.search();
    }

    search() {
        if (!this.customerName && this.conditions.companyId) {
            this.conditions.companyId = null;
        }
        if (
            new Date(this.conditions.startTime) >
            new Date(this.conditions.endTime)
        ) {
            this.$Message.error("开始时间必须小于结束时间！");
            return;
        }
        this.getContractDatagrid().then((result: any) => {
            this.contractList = [];
            this.contractData = result.list;
            if (!result.list.length) {
                this.isNullData = true;
            } else {
                this.isNullData = false;
            }
            result.list.forEach((contract: any) => {
                this.contractList.push({
                    id: contract.id,
                    companyName: contract.company.name,
                    name: contract.name,
                    contact: contract.company.mail,
                    tel: contract.company.phone,
                    payType: contract.payTypeName,
                    contractStatus: contract.contractStatusName,
                    contractStartTime: new Date(contract.contractStartTime).format(
                        "yyyy-MM-dd"
                    ),
                    contractEndTime: new Date(contract.contractEndTime).format(
                        "yyyy-MM-dd"
                    ),
                    crtTime: new Date(contract.crtTime).format(
                        "yyyy-MM-dd hh:mm:ss"
                    )
                });
                this.page.total = result.total;
            });
        });
    }

    turnPage(id: string, type: string) {
        switch (type) {
            case 'add':
                this.$router.push({
                    name: '添加合同',
                    params: {
                        pageType: type
                    }
                })
                break;
            case 'read':
                this.$router.push({
                    name: '查看合同',
                    params: {
                        pageType: type,
                        id
                    }
                })
                break;
            case 'edit':
                this.$router.push({
                    name: '编辑合同',
                    params: {
                        pageType: type,
                        id
                    }
                })
                break;
        }
    }

    del(id: string) {
        this.$Modal.confirm({
            title: "合同信息",
            content: "<p>确定删除吗？</p>",
            onOk: () => {
                let _this = this;
                this.delelteContract(id).then(
                    result => {
                        _this.resetPageAndSearch();
                    },
                    error => {
                        _this.Log.info(error);
                    }
                );
            }
        });
    }

    handlePage(value: number) {
        this.page.current = value;
        this.search();
    }

    handlePageSize(value: number) {
        this.page.pageSize = value;
        this.resetPageAndSearch();
    }

    getcompanyId(data: any) {
        this.conditions.companyId = data.id;
        this.customerName = data.name.toString();
    }

    getPayTypeList() {
        return getPayType()
            .then((res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    return data
                }
            })
            .catch((error: any) => {
                (this as any).Log.warn(error)
            })
    }

    getContractStatusList() {
        return getContractStatus()
            .then((res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    return data
                }
            })
            .catch((error: any) => {
                (this as any).Log.warn(error)
            })
    }

    getContractDatagrid() {
        return contractDatagrid()
            .then((res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    return data
                }
            })
            .catch((error: any) => {
                (this as any).Log.warn(error)
            })
    }

    delelteContract(id: string) {
        return new Promise((resolve: any, reject: any) => {
            delelteContract(id)
                .then((res: any) => {
                    let {
                        code,
                        data
                    } = res.data
                    if (code === 200) {
                        this.$Message.success('删除成功')
                    }
                })
                .catch((err) => {
                    this.Log.info(err)
                })
        })
    }
}