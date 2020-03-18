import {
    Component,
    Vue
} from 'vue-property-decorator'
import UMTopPage from "@/components/um/umtopPage.vue" // 组件
import {
    Route
} from 'vue-router'

@Component({
    components: {
        UMTopPage
    }
})
export default class About extends Vue {

    beforeRouteUpdate(to: Route, from: Route, next: () => void) {
        sessionStorage.setItem('fromPath', from.path)
        next()
    }
}