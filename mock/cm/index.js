import {
    routes
} from './role'

export default [{
    url: 'cm/permission/routes',
    type: 'get',
    response: () => {
        return {
            code: 200,
            data: routes
        }
    }
}]