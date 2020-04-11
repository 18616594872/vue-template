import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class About extends Vue {

    visableModal: boolean = false
    ModalType: string = 'new'
    role:any = {
        name: '',
        desc: '',
        routes: []
    }

    addRole(){
        this.ModalType = 'new'
        this.visableModal = true
    }
    
}
