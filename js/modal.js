export default {
    data(){
        return{
            inputData:JSON.parse(JSON.stringify(this.inputProduct)),
            bsModal:'', 
        };
    },
    methods:{
        open(){
            this.bsModal.show()
        },
        close(){
            this.bsModal.hide()
        },
        editPorductList(){
            this.$emit('send-input-data')
        },
        addImg(){
            this.inputProduct.imagesUrl.push('');
          },
          deleteImg(){
            this.inputProduct.imagesUrl.pop();
          },
    },
    watch:{
        inputProduct(){
            this.inputData=this.inputProduct;
        }
    },
    props:["inputProduct","isNew"],
    mounted(){
        this.bsModal =  new bootstrap.Modal(this.$refs.productModal) 
    },
    template:` <div class="modal fade" id="modalInputData" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="productModal">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{isNew?"新增產品":"編輯產品"}}</h5>
                <button type="button" class="btn-close" @click="close()"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-4 my-3">
                        <p>主要圖片</p>
                        <div> <img :src="inputProduct.imageUrl" :alt="inputProduct.title" :title="inputProduct.title" class="img-fluid"> </div>
                        <div class="from-group my-3">
                            <label class="form-label w-100" for="productImageUrl" >主要產品圖片</label>
                            <input type="text" id="productImageUrl" placeholder="請輸入主要產品圖片網址" v-model.trim="inputProduct.imageUrl" class="form-control" >
                        </div>
                        <template v-if="inputProduct.imagesUrl.length>0">
                            <div class="from-group my-3" v-for="(item,index) in inputProduct.imagesUrl" :key="item+1">
                                <p>其他圖片{{index+1}}</p>
                                <img :src="item" class="img-fluid" :alt="inputProduct.title">
                                <label class="form-label w-100" for="productImageUrl" >其他產品圖片{{index+1}}</label>
                                <input type="text" id="productImageUrl" placeholder="請輸其他產品圖片網址" v-model.trim="inputProduct.imagesUrl[index]" class="form-control" >
                            </div>
                        </template>
                        <button v-if="inputProduct.imageUrl!=='' && inputProduct.imagesUrl.length<5" class="btn btn-outline-success w-100 d-block my-3" @click="addImg()">新增圖片</button>
                        <button v-if="inputProduct.imagesUrl.length!==0" class="btn btn-outline-danger w-100 d-block" @click="deleteImg()">刪除圖片</button>
                    </div>
                    <div class="col-8 my-3" >
                        <div class="from-group my-3">
                            <label class="form-label w-100" for="productName" >產品名稱</label>
                            <input type="text" id="productName" placeholder="請輸入產品名稱" v-model.trim="inputProduct.title" class="form-control" >
                        </div>

                        <div class="from-group my-3">
                            <label class="form-label w-100" for="productCategory" >產品分類</label>
                            <input type="text" id="productCategory" placeholder="請輸入產品分類" v-model.trim="inputProduct.category" class="form-control">
                        </div>
                        <div class="from-group my-3">
                            <label class="form-label w-100" for="productContent" >產品內容</label>
                            <input type="text" id="productContent" placeholder="請輸入產品內容" v-model.trim="inputProduct.content" class="form-control">
                        </div>
                        <div class="d-flex gap-2">
                            <div class="from-group my-3 w-50">
                                <label class="form-label w-100" for="productOrigin_price" >產品原價</label>
                                <input type="number" id="productOrigin_price" placeholder="請輸入產品原價" v-model.number="inputProduct.origin_price" class="form-control">
                            </div>
                            <div class="from-group my-3 w-50">
                                <label class="form-label w-100" for="productPrice" >產品售價</label>
                                <input type="number" id="productPrice" placeholder="請輸入產品售價" v-model.number="inputProduct.price" class="form-control">
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <div class="from-group my-3 w-50">
                                <label for="is_enabled" class=" w-100">產品狀態</label>
                                <select name="productStatus" id="is_enabled" class="form-select" v-model.number="inputProduct.is_enabled">
                                    <option  value="" disabled >請選擇產品狀態</option>
                                    <option  value=0>未上架</option>
                                    <option  value=1>已上架</option>
                                    <option  value=2>缺貨中</option>
                                    <option  value=3>補貨中</option>
                                    <option  value=4>促銷中</option>
                                    <option  value=5>待下架</option>
                                </select>
                            </div>
                            <div class="from-group my-3 w-50">
                                <label class="form-label w-100" for="productUnit" >產品單位</label>
                                <input type="text" id="productUnit" placeholder="請輸入產品單位" v-model.trim="inputProduct.unit" class="form-control">
                            </div>
                        </div>
                        <div class="from-group my-3">
                            <label class="form-label w-100" for="productDescription" >產品分類</label>
                            <textarea name="productDescription" class="form-control" style="height:80px" id="productDescription"  placeholder="請輸入產品描述" v-model="inputProduct.description"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="close()">關閉</button>
                <button type="button" class="btn btn-primary" @click="editPorductList()">確定</button>
            </div>
        </div>
    </div>
</div>`
}