import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    FormValidate,
    RuleValidate
} from '@/types/views/login.interface'
import {
    setCookie,
    getCookie,
    clearCookie,
    loadDefault
} from '@/utils/common.ts'


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

    mounted() {
        getCookie()
        loadDefault()
    }

    //methods
    handleSubmit(name: string) {
        let ref: any = this.$refs[name];

        ref.validate((valid: boolean) => {
            if (valid) {
                this.loading = true
                this.checked ? setCookie(this.formValidate.userName, this.formValidate.passWord, 7) :
                    clearCookie()
                let loginParams: FormValidate = {
                    userName: this.formValidate.userName,
                    passWord: this.formValidate.passWord
                };
                this.$store.dispatch("login", loginParams).then((result: any) => {

                        localStorage.setItem("userName", loginParams.userName)
                        localStorage.setItem("passWord", loginParams.passWord)

                        this.errTipMes = ''
                        this.loading = false
                        this.$router.push({
                            path: "/VMMain"
                        });

                    })
                    .catch((err) => {
                        this.errTipMes = "用户名或密码错误"
                        this.loading = false
                    });
            } else {
                console.log("输入不合法!")
            }
        });
    }
    changeLogBtnState() {
        this.loading = false
        this.errTipMes = ''
    }



}