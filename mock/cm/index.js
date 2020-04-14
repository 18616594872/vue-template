import {
    routes
} from './role'

const roles = [{
        name: 'admin',
        description: '管理员',
        routes: (function(path){
            let routersName = []
            function getRoutersName(routes,path){
                for(let route in routes){
                    if(route.path === path){
                        return
                    }
                    route.children ? getRoutersName(route.children) : routersName.push(route.name)
                }
            }
            getRoutersName(routes)
        
            return routersName
        })('/oam').toString()
    },
    {
        name: 'editor',
        description: '普通用户',
        routes: []
    }
]

export default [{
    url: '/cm/permission/routes',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: routes
        }
    }
},{
    url: '/cm/permission/roles',
    type: 'get',
    response: () => {
        return {
            code: 200,
            msg: "success",
            data: roles
        }
    }
}]