import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    listRouter,
    listRole,
    updateRole,
    addNewRole
} from '@/api/permission'
import {
    deepCop
} from '@/utils/common'

const defineRole: any = {
    name: '',
    desc: '',
    routes: [],
    permission: []
}

@Component({})
export default class About extends Vue {

    visableModal: boolean = false
    ModalType: string = 'new'
    operationType: string = 'role'
    role: any = defineRole
    roleColumns: Array < any > = [

        {
            title: '角色名称',
            key: 'name',
            align: 'center'
        },
        {
            title: '描述',
            key: 'desc',
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
                                this.editRoutes(params)
                            }
                        }
                    }, '编辑权限'),
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
                                this.editPermission(params)
                            }
                        }
                    }, '指令权限'),
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
    permission: Array < any > = []
    showPermission: boolean = false

    created() {
        this.init()
    }
    async init() {
        await this.getListRole()
        defineRole.routes = this.parseRoutes(await this.getListRouter()) // initializes the route permission    
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
            if (route.hidden) { // not shown in routing permission selection
                return arr
            }
            let o = < any > {}
            o.title = route.name
            o.checked = false

            o.children = route.children && this.parseRoutes(route.children)

            return arr.concat(o)
        }, [])
    }
    addRole() {
        this.role = deepCop(defineRole)
        this.$nextTick(() => {
            this.ModalType = 'new'
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
                routerName.find(name => name === o.title) &&
                    ((this.operationType === 'role') ?
                        (o.checked = true) :
                        this.role.permission.push({
                            [o.title]: [`${o.title}:add`, `${o.title}:del`, `${o.title}:update`, `${o.title}:list`],
                            add: `${o.title}:add`,
                            del: `${o.title}:del`,
                            update: `${o.title}:update`,
                            list: `${o.title}:list`
                        }))
            }
        })

        return routers
    }
    editRoutes(params: any) {
        this.operationType = 'role'
        let routes = this.selectedRoutes(deepCop(defineRole.routes), params.row.routes)
        let [editRole] = this.rolesData.filter((role: any) => role.id === params.row.id)

        this.role = Object.assign({}, editRole, {
            routes
        })

        this.$nextTick(() => {
            this.ModalType = 'edit'
            this.visableModal = true
        })

    }
    editPermission(params: any) {
        let [{
            id,
            permission
        }] = this.rolesData.filter((role: any) => (role.id === params.row.id))
        
        this.role.permission = permission
        this.role.id = id

        this.$nextTick(() => {
            this.showPermission = true
        })

    }
    del({
        row
    }: any) {
        this.rolesData.filter((role: any, index: number, arr: any) => (role.name === row.name) && (arr.splice(index, 1)))
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
    async addOrEditRole() {
        let allCheckedNodeName = this.getActiveNodes((this.$refs.routeTree as any).getCheckedNodes()) // filter all selected nodes
        let prevPermission: any = deepCop(this.role.permission)
        this.operationType = 'permission'
        this.role.permission.length = 0
        this.selectedRoutes(this.role.routes, allCheckedNodeName) // filters the current user directive permissions

        if (this.ModalType === 'new') { // add a new role

            await addNewRole({
                newRole: Object.assign(this.role, {
                    routes: allCheckedNodeName
                })
            })

        } else { // modify the role directive premissions
            /**
             * permissions synchronization
             * the old directive premissions and new directive premissions have the same routing permission
             * the old directive permission is synchronized to the new directive permission
             */
            prevPermission.length && prevPermission.forEach((oldPermission: any) => {
                this.role.permission.forEach((newPermission: any, index: number, newArray: Array < any > ) => {
                    let oldkey = Object.keys(oldPermission)
                    if (oldkey.includes(this.gatherKey(newPermission))) {
                        newArray[index] = oldPermission
                    }
                })
            })

            await updateRole({
                id: this.role.id,
                updateRole: Object.assign(this.role, {
                    routes: allCheckedNodeName
                })
            })
        }
        await this.getListRole()
        this.role = deepCop(defineRole)
    }
    async submitPermission() {
        this.showPermission = false

        let [ role ] = this.rolesData.filter((role: any) => (role.id === this.role.id))

        await updateRole({
            id: this.role.id,
            updateRole: role
        })
        await this.getListRole()
        this.role = deepCop(defineRole)
    }
    gatherKey(o: any): any {
        for (let i in o) {
            return typeof o[i] !== 'string' && i
        }
        return ''
    }

}