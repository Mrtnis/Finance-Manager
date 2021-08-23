<template>
  <div class="row mb-5">
    <div class="col-md">
      <router-link class="btn btn-back py-2 px-4" to="/sallary">Back To Menu</router-link>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 mb-5">
      <div class="card shadow">
        <div class="fw-bolder mb-3 pt-4 ms-3">Your saving</div>
        <div class="current-money ms-3 fw-bolder">Rp. {{ Intl.NumberFormat().format(bank) }}</div>
        <div class="mt-5 ms-3 row">
          <div class="shape-bank"></div>
          <div class="shape-bank-second"></div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row">
        <div class="col">
          <h6 class="text-muted mb-4">
            <i class="bi bi-wallet2"></i> <b>Rp. {{ Intl.NumberFormat().format(my_sallary) }}</b>
          </h6>
        </div>
      </div>
      <div class="sallary mb-3">
        <label for="bank" class="form-label text-muted"><b>Input field below to add your saving</b></label>
        <input @keyup.enter="save" type="number" class="form-control py-2" id="bank" placeholder="Example : 5000000" v-model.number="moneySaving" />
        <small class="mt-1" v-if="error">
          <span class="text-danger"><b>Sallay can't be empty or zero</b></span>
        </small>
        <div @click="save" class="btn btn-save px-5 py-2 mt-3">Save</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bank',
  data() {
    return {
      bank: 0,
      moneySaving: null,
      error: false,
      my_sallary: 0,
    };
  },
  mounted() {
    this.getBank();
    this.getSallary();
  },
  methods: {
    getBank() {
      this.bank = localStorage.getItem('my_bank') || 0;
    },
    getSallary() {
      this.my_sallary = localStorage.getItem('my_sallary');
    },
    save() {
      const sallary = localStorage.getItem('my_sallary');
      if (this.moneySaving == null || this.moneySaving == '' || this.moneySaving == 0) {
        Swal.fire('Ooopss!', "Input can't be empty or zero. ", 'error');
      } else if (this.moneySaving > sallary) {
        Swal.fire('Ooopss!', 'Your sallary is not enough. ', 'error');
      } else {
        const mybank = localStorage.getItem('my_bank') || 0;
        const addBank = parseInt(mybank) + this.moneySaving;
        localStorage.setItem('my_bank', addBank);
        const reduce = sallary - this.moneySaving;
        localStorage.setItem('my_sallary', reduce);
        this.getBank();
        this.getSallary();
        this.moneySaving = null;
        Swal.fire('Yeeeaaaayyyy!', 'Your saving is added. ', 'success');
      }
    },
  },
};
</script>

<style scoped>
.text-bank {
  text-align: center;
  align-self: center;
}
.bi-wallet2 {
  color: #4361ee;
  font-size: 25px;
  margin-right: 10px;
}
.card {
  border-color: #4361ee;
  color: #4361ee;
  border-width: 2px;
  border-radius: 15px;
  height: 200px;
  width: 350px;
}
.shape-bank {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: red;
}
.shape-bank-second {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: rgb(255, 174, 68);
  margin-left: -10px;
}
input {
  border-radius: 10px;
  width: 60%;
}
</style>
