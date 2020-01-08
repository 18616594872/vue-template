const tokens = {
    admin: {
        token: 'admin'
    },
    editor: {
        token: 'editor'
    }
}

const users = {
    'admin': {
        name: 'admin',
        routeList:'', // current user rights, super admin is empty by default
        description: 'Super Admin',
    },
    'editor': {
        roles: 'test',
        routeList:'',
        description: 'Test Admin',
    }
}

export default [
    // user login
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
            const info = users[token]

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 200,
                data: info
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