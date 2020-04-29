import {
    routes
} from './role'

function getRoutersName(routes, path) {
    let routersName = []
    for (let route of routes) {
        if (path && (route.path.indexOf(path) !== -1)) {
            continue
        }
        route.name && routersName.push(route.name)
        route.children && routersName.push(...getRoutersName(route.children))
    }
    return routersName
}

const tokens = {
    admin: {
        token: 'admin'
    },
    editor: {
        token: 'editor'
    }
}

let roles = [{
        name: 'admin',
        desc: '管理员',
        routes: getRoutersName(routes),
        permission: []
    },
    {
        name: 'editor',
        desc: '普通用户',
        routes: getRoutersName(routes, 'mam'),
        permission: []
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
    }, {
        url: '/cm/permission/roles',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: "success",
                data: roles
            }
        }
    }, {
        url: '/cm/permission/updateRoles',
        type: 'post',
        response: config => {
            const {
                updateRoles
            } = config.body

            roles = updateRoles
            return {
                code: 200,
                msg: "success",
                data: roles
            }
        }
    }, // user login
    {
        url: '/auth/shiro/login',
        type: 'post',
        response: config => {
            const {
                userName
            } = config.body

            const token = tokens[userName]

            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: 'Account and password are incorrect.'
                }
            }

            return {
                code: 200,
                msg: "success",
                data: token
            }
        }
    },
    // get user info
    {
        url: '/auth/shiro/login\.*',
        type: 'get',
        response: config => {
            const {
                token
            } = config.query
            let info = null

            for (let role of roles) {
                role.name === token && (info = role)
            }

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 200,
                data: [info]
            }
        }
    },
    // user logout
    {
        url: '/user/logout',
        type: 'post',
        response: config => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    }
]