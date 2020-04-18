import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    listRouter,
    listRole
} from '@/api/permission'
import {
    deepCop
} from '@/utils/common'

const definaRole: any = {
    name: '',
    desc: '',
    routes: []
}

@Component({})
export default class About extends Vue {

    visableModal: boolean = false
    ModalType: string = 'new'
    role: any = definaRole
    rolesList: string = ''
    roleColumns: Array < any > = [

        {
            title: '角色名称',
            key: 'name',
            align: 'center'
        },
        {
            title: '描述',
            key: 'description',
            align: 'center'
        },
        {
            title: '操作',
            align: 'center',
            render: (h: any, params: any) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: "primary",
                            size: "small"
                        },
                        style: {
                            marginRight: "5px"
                        },
                        on: {
                            click: () => {
                                this.edit(params)
                            }
                        }
                    }, '编辑权限'),
                    h('Button', {
                        props: {
                            type: "primary",
                            size: "small"
                        },
                        on: {
                            click: () => {
                                this.del(params)
                            }
                        }
                    }, '删除')
                ])
            }
        }
    ]
    rolesData: Array < any > = []

    created() {
        this.init()
    }
    async init() {
        await this.getListRole()
        definaRole.routes = this.parseRoutes(await this.getListRouter()) // 保存默认的routes    
    }
    addRole() {
        this.role = deepCop(definaRole)
        this.$nextTick(() => {
            this.ModalType = 'new'
            this.visableModal = true
        })
    }
    getListRouter() {
        return listRouter()
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
    getListRole() {
        return listRole()
            .then((res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    this.rolesData = data
                }
            })
            .catch((error: any) => {
                (this as any).Log.warn(error)
            })
    }
    parseRoutes(routers: Array < any > ) {
        return Array.isArray(routers) && routers.reduce((arr, route) => {
            if (route.hidden) {
                return arr
            }
            let o = < any > {}
            o.title = route.name
            o.checked = false

            o.children = route.children && this.parseRoutes(route.children)

            return arr.concat(o)
        }, [])
    }
    edit(params: any) {
        let routes = this.selectedRoutes(deepCop(definaRole.routes), params.row.routes)
        let [editRole] = this.rolesData.filter((role: any) => role.name === params.row.name)

        this.role = {
            name: editRole.name,
            desc: editRole.description,
            routes: routes
        }

        this.$nextTick(() => {
            this.ModalType = 'edit'
            this.visableModal = true
        })

    }
    selectedRoutes(routers: Array < any > , routerName: Array < string > ): Array < object > {
        if (!routers.length) {
            return routers
        }
        routers.forEach((o: any) => {
            if (o.children) {
                this.selectedRoutes(o.children, routerName)
            } else {
                routerName.find(name => name === o.title) && (o.checked = true)
            }
        })

        return routers
    }
    del({row}: any) {
        this.rolesData.filter((role: any, index: number, arr: any) => (role.name === row.name) && (arr.splice(index, 1)))
    }
    addOrEditRole() {
        let nodesName = this.getActiveNodes((this.$refs.routeTree as any).getCheckedNodes()) // 获取所有的选中节点

        if (this.ModalType === 'new') { // 添加新角色
            this.rolesData.push(Object.assign(this.role, {
                routes: nodesName
            }))
        } else {
            this.rolesData.filter((role: any, index: number, arr: any) => (role.name === this.role.name) && (arr.splice(index, 1, Object.assign(this.role, {
                routes: nodesName
            }))))
        }
        this.role = deepCop(definaRole)
    }
    getActiveNodes(Nodes: Array < any > ): Array < string > {
        if (!Array.isArray(Nodes)) {
            return []
        }

        let nodesName: Array < string > = []
        Nodes.forEach((node: any) => {
            nodesName.push(node.title)
            node.children && nodesName.push(...this.getActiveNodes(node.children))
        })
        return nodesName
    }

}