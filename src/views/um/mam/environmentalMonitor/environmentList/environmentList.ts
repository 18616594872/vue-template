import {
    Component,
    Vue,
    Prop,
    Watch
} from 'vue-property-decorator'
import equipTypeComponent from '@/components/um/equipTypeComponent/equipTypeComponent.vue'
import {
    Page
} from '@/types/common.interface'
import {
    EquipmentDataList,
    EquipmentProp
} from '@/types/views/environmentalMonitor.interface.ts'

@Component({
    components: {
        equipTypeComponent
    }
})
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
            key: "description",
            align: "center"
        },
        {
            title: "创建时间",
            align: "center",
            render: (h: any, params: any) => {
                return h(
                    "div",
                    new Date(params.row.time).format(
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
    showCard: boolean = true
    curTableList: EquipmentProp[] = []
    // prop
    @Prop({
        required: true,
    })
    equipmentDataList!: EquipmentDataList
    @Prop({
        required: true,
        default: true
    })
    showElement!: boolean

    // watch 
    @Watch('showElement')
    onChang(newValue: boolean){
        this.showCard = newValue
    }
    @Watch('equipmentDataList.table', {
        deep: true
    })
    onTableChang() {      
        this.initPage()

    }
    mounted() {
        this.initPage()
        
    }
    initPage() {
        let {
            equipmentDataList: {
                table
            },
            page
        } = this
        this.filterData(1) // 默认从0页筛选
        page.pageSize = table.pageSize // 每页最大数
        page.total = table.total // 总数

    }
    filterData(index: number) {
        let {
            equipmentDataList: {
                table: {
                    pageSize,
                    equipProp
                }
            }
        } = this
        this.curTableList = Array.from(equipProp).slice((index - 1) * pageSize, index * pageSize)
    }
    handlePage(value: number) {
        this.page.current = value
        this.filterData(value)
    }
    handlePageSize(value: number) {
        this.page.pageSize = value
        this.filterData(value)
    }

}