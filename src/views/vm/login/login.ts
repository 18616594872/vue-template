import {
    Component,
    Vue,
    Watch
} from 'vue-property-decorator'
import {
    FormValidate,
    RuleValidate
} from '@/types/views/login.interface'

@Component({})
export default class About extends Vue {

    // data
    checked: boolean = false
    loading: boolean = false
    logining: boolean = false
    formValidate: FormValidate = {
        userName: "",
        passWord: ""
    }
    ruleValidate: RuleValidate = {
        userName: [{
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
        }],
        passWord: [{
            required: true,
            message: "密码不能为空",
            trigger: "blur"
        }]
    }
    errTipMes: string = ''
    // methods
    handleSubmit(name: string) {
        let ref: any = this.$refs[name];

        ref.validate((valid: boolean) => {
            if (valid) {
                this.loading = true
                let loginParams: FormValidate = {
                    userName: this.formValidate.userName,
                    passWord: this.formValidate.passWord
                };
                this.$store.dispatch("login", loginParams).then((result: any) => {

                        this.errTipMes = ''
                        this.loading = false
                        sessionStorage.setItem('toPath', '/mam/overview')
                        this.$router.push({
                            path: "/mam"
                        });

                    })
                    .catch((err: any) => {
                        this.errTipMes = "用户名或密码错误"
                        this.loading = false
                    });
            } else {
            }
        });
    }
    changeLogBtnState() {
        this.loading = false
        this.errTipMes = ''
    }
}