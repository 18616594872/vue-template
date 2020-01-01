import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    LoginData,
    FormValidate,
    RuleValidate
} from '@/types/views/login.interface'
import Cookies from 'js-cookie'

@Component({})
export default class About extends Vue {

    // data
    data: LoginData = {
        pageName: 'Login'
    }
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
        let _this: any = this;
        let sha256: any = require("js-sha256").sha256;
        let ref: any = this.$refs[name];

        ref.validate((valid: any) => {
            if (valid) {
                this.loading = true;
                this.checked ? this.setCookie(this.formValidate.userName, this.formValidate.passWord, 7) :
                    this.clearCookie();
                let loginParams: any = {
                    username: _this.formValidate.userName,
                    password: sha256(_this.formValidate.passWord)
                };
                this.$store.dispatch("login", loginParams).then((result: any) => {

                        localStorage.setItem("userName", loginParams.username)
                        localStorage.setItem("password", loginParams.password)

                        this.errTipMes = ''
                        this.loading = false
                        _this.$router.push({
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
    setCookie(c_name: any, c_pwd: any, exdays: any) {
        Cookies.set(
            "user", {
                name: c_name,
                pwd: c_pwd
            }, {
                expires: exdays
            }
        );
    }
    //读取cookie
    getCookie() {
        if (Cookies.getJSON("user")) {
            let {
                name,
                pwd
            } = Cookies.getJSON("user");
            this.formValidate.userName = name;
            this.formValidate.passWord = pwd;
        }
    }
    //清除cookie
    clearCookie() {
        Cookies.remove("user");
    }

    loadDefault() {
        if (Cookies.getJSON("user")) {
            this.checked = true;
        }
    }


}