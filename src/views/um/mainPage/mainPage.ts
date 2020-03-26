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

    toUrl: string = ''
    
    beforeRouteUpdate(to: Route, from: Route, next: () => void) {
        this.toUrl =  from.path
        next()
    }
}