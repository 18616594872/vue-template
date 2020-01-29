import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class About extends Vue {

    // prop
    @Prop()name!: string
    @Prop({
        default: true
    })showFlag!: boolean
    @Prop({
        default: ''
    })turnTo!: string
    
}
