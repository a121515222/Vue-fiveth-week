
export default {
    data() {
        return {
            bsModal: '',
            product: {},
            qty:1,
            apiInfo: {
                url: 'https://vue3-course-api.hexschool.io/v2',
                path: 'chun-chia'
            },
            isLoading:'',
        }
    },
    methods: {
        guestModalOpen(id) {
            axios.get(`${this.apiInfo.url}/api/${this.apiInfo.path}/product/${id}`).then((res) => {
                this.product = res.data.product;
                this.bsModal.show();
            }).catch((error) => { console.dir(error) });

        },
        guestModalClose() {
            this.bsModal.hide();
        },
        addCart(id){
            let sendCart = {
                data: {
                  "product_id": "",
                  "qty": 1
                }
              };
            sendCart.data.product_id = id;
            sendCart.data.qty = this.qty;
            this.$emit('sendId',id);
            this.isLoading = id;
            axios.post(`${this.apiInfo.url}/api/${this.apiInfo.path}/cart`,sendCart).then((res)=>{
                this.$emit('sendId','');
                this.isLoading = '';
                this.qty = 1;
            }).catch((error)=>{console.dir(error.response)});
        }
    },
   
    mounted() {
        this.bsModal = new bootstrap.Modal(this.$refs.guestProductModal);
        
    },
    template: `<div class="modal fade"  tabindex="-1"  aria-hidden="true" ref="guestProductModal" >
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" >{{product.title}}</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="guestModalClose()"></button>
        </div>
        <div class="modal-body">
        <img class="img-fluid" :src="product.imageUrl" alt="">
        <div class="d-flex">
            <p>{{product.title}}<span class="badge bg-primary">{{product.category}}</span></p>

        </div>
        <p>????????????:{{product.description}}</p>
        <p>????????????:{{product.content}}</p>
        <div v-if="product.origin_price===product.price">
        <p>??????:{{product.origin_price}}</p>
        </div>
        <div v-else>
        <p> ??????{{product.origin_price}}?????????{{product.price}}</p>
        </div>
        
        </div>
        <div class="modal-footer gap-3">
          <button type="button" class="btn btn-success" @click="qty-=1" :disabled="qty<2"><i class="fa-solid fa-minus"></i></button> 
          <span style="min-width:20px"> {{qty}}</span>
          <button type="button" class="btn btn-success" @click="qty+=1" :disabled="qty>=100"><i class="fa-solid fa-plus"></i></button> 
          <button type="button" class="btn btn-success" @click="addCart(product.id)" :disabled="product.id===isLoading">
          <span v-show="product.id===isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ???????????????</button>
          <button type="button" class="btn btn-secondary" @click="guestModalClose()">??????</button>
        </div>
      </div>
    </div>
  </div>`

}