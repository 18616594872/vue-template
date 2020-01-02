import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    FormValidate,
    RuleValidate
} from '@/types/views/login.interface'
import Cookies from 'js-cookie'

const COOKIES_KEY: string = 'user'

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
        this.getCookie();
        this.loadDefault();
    }

    //methods
    handleSubmit(name: any) {
        let ref: any = this.$refs[name];

        ref.validate((valid: boolean) => {
            if (valid) {
                this.loading = true
                this.checked ? this.setCookie(this.formValidate.userName, this.formValidate.passWord, 7) :
                    this.clearCookie();
                let loginParams: FormValidate = {
                    userName: this.formValidate.userName,
                    passWord: this.formValidate.passWord
                };
                this.$store.dispatch("login", loginParams).then((result: any) => {

                        localStorage.setItem("userName", loginParams.userName)
                        localStorage.setItem("password", loginParams.passWord)

                        this.errTipMes = ''
                        this.loading = false
                        this.$router.push({
                            path: "/VMMain"
                        });

                    })
                    .catch((err) => {
                        this.errTipMes = "用户名或密码错误"
                        this.loading = false;
                    });
            } else {
                console.log("输入不合法!");
            }
        });
    }
    changeLogBtnState() {
        this.loading = false
        this.errTipMes = ''
    }
    //设置cookie
    setCookie(c_name: string, c_pwd: string, exdays: number) {
        Cookies.set(
            COOKIES_KEY, {
                name: c_name,
                pwd: c_pwd
            }, {
                expires: exdays
            }
        );
    }
    //读取cookie
    getCookie() {
        if (Cookies.getJSON(COOKIES_KEY)) {
            let {
                name,
                pwd
            } = Cookies.getJSON(COOKIES_KEY);
            this.formValidate.userName = name;
            this.formValidate.passWord = pwd;
        }
    }
    //清除cookie
    clearCookie() {
        Cookies.remove(COOKIES_KEY);
    }

    loadDefault() {
        if (Cookies.getJSON(COOKIES_KEY)) {
            this.checked = true;
        }
    }


}