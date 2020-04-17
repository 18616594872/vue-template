import {
    routes
} from './role'

function getRoutersName(routes, path){
    let routersName = []
    for(let route of routes){
        if(path && (route.path.indexOf(path) !== -1)){
            continue
        }
        route.name && routersName.push(route.   name)
        route.children &&  routersName.push(...getRoutersName(route.children))
    }
    return routersName
}

const roles = [{
        name: 'admin',
        description: '管理员',
        routes: getRoutersName(routes)
    },
    {
        name: 'editor',
        description: '普通用户',
        routes: getRoutersName(routes,'visual')
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