import {
    Component,
    Vue
} from 'vue-property-decorator'
import UMTopPage from "@/components/um/umtopPage.vue" // 组件

@Component({
    components: {
        UMTopPage
    }
})
export default class About extends Vue {

}