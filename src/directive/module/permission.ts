import store from '@/store'

export default {
    permission: {
        inserted(el: HTMLElement, binding: any) {
            const {
                value
            } = binding
            console.log('ss')
            const dirPermissions = store.getters && store.getters.permissions
            if (value && value instanceof Array && value.length > 0) {
                const directive = value
                const hasPermission =  directive && directive.some((promission: string) => {  // :* 表示通配权限
                    return promission === ':*' || dirPermissions.includes(promission)
                })
    
                if (!hasPermission) {
                    el.parentNode && el.parentNode.removeChild(el)
                }
            } else {
                throw new Error(`need promission! Like v-permission="[':add:search']"`)
            }
        }
    }
}