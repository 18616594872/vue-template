import {
    Component,
    Vue,
    Prop
} from 'vue-property-decorator'
import equipmentDetail from '@/components/um/equipmentDetail.vue'

@Component({
    components: {
        equipmentDetail
    }
})
export default class About extends Vue {

    // prop
    @Prop({
        required: true,
    })
    equipmentDataList!: any[]
    
    mounted() {
    }

}