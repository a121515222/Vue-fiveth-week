
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({ // 用來做一些設定
    generateMessage: localize('zh_TW'), //啟用 locale 
    validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});
export default {
    data() {
        return {
            apiInfo: {
                url: 'https://vue3-course-api.hexschool.io/v2',
                path: 'chun-chia'
            },
            user: {
                name: '',
                tel: '',
                email: '',
                address: '',

            },
            message: ''
        }
    },
    components: {
        VForm: Form,
        VField: Field,
        ErrorMessage: ErrorMessage,
    },
    methods: {
        phoneCheck(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        },
        onSubmit() {
            let sendData = {
                data: {
                    user: {
                        name: '',
                        tel: '',
                        email: '',
                        address: '',
                    },
                    message:'',
                    orderid:''
                }
            }
            sendData.data.user.name = this.user.name;
            sendData.data.user.tel = this.user.tel;
            sendData.data.user.email = this.user.email;
            sendData.data.user.address = this.user.address;
            sendData.message = this.message ;

            axios.post(`${this.apiInfo.url}/api/${this.apiInfo.path}/order`,sendData)
            .then((res) => {
                this.orderid = res.data.orderId
               alert(res.data.message)

                console.log(res.data)
            }).catch((error) => { console.dir(error) });
            this.$refs.form.resetForm();
            this.message = '';
        }
    },
    mounted() {

    },
    template: `
    <div class="row">
<v-form ref="form" v-slot="{ errors }" @submit="onSubmit" class="d-flex flex-column col-8 mx-auto">
    <div class="my-3 position-relative">
    <label class="form-label" for="name">姓名</label>
    <v-field
        id="name"
        name="姓名"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['姓名'] }"
        placeholder="請輸入 姓名" rules="required"
        v-model="user.name"
    >
    </v-field>
<error-message name="姓名" class="invalid-feedback" style="position:absolute; left:14px ;bottom:-20px"></error-message>
    </div>
    
    <div class="my-3 position-relative">
    <label class="form-label" for="tel">電話</label>
    <v-field
        id="tel"
        name="電話"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['電話'] }"
        placeholder="請輸入電話" 
        :rules="phoneCheck"
        v-model="user.tel"
    >
    </v-field>
<error-message name="電話" class="invalid-feedback" style="position:absolute; left:14px ;bottom:-20px"></error-message>
    </div>

    <div class="my-3 position-relative">
    <label class="form-label" for="email">信箱</label>
    <v-field
        id="email"
        name="信箱"
        type="email"
        class="form-control"
        :class="{ 'is-invalid': errors['信箱'] }"
        placeholder="信箱" rules="email|required"
        v-model="user.email"
    >
    </v-field>
<error-message name="信箱" class="invalid-feedback" style="position:absolute; left:14px ;bottom:-20px"></error-message>
    </div>

    <div class="my-3 position-relative">
    <label class="form-label" for="address">地址</label>
    <v-field
        id="address"
        name="地址"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['地址'] }"
        placeholder="請輸入 地址" rules="required"
        v-model="user.address"
    >
    </v-field>
<error-message name="地址" class="invalid-feedback" style="position:absolute; left:14px ;bottom:-20px"></error-message>
    </div>


    <div class="my-3 position-relative">
    <label class="form-label" for="message">留言</label>
    <textarea class="form-control" id="message" style="height:100px" v-model="message"></textarea>
    </div>
    <button class="btn btn-primary align-self-end" type="submit" 
    :disabled="Object.keys(errors).length > 0" :class="{buttonDisabledCursor : Object.keys(errors).length > 0}">送出表單</button>
<v-form>  
</div>`

}