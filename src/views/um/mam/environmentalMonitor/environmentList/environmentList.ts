import {
    Component,
    Vue,
    Prop,
    Watch
} from 'vue-property-decorator'
import equipTypeComponent from '@/components/um/equipTypeComponent.vue'
import {
    Page
} from '@/types/common.interface'

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
    // prop
    @Prop({
        required: true,
    })
    equipmentDataList!: any[]
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

    mounted() {
    }

}