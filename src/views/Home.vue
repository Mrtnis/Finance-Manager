<template>
  <div class="mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card border-0">
          <div class="card-body">
            <h3 class="welcome fw-bolder card-title">We can't wait to manage your finance.</h3>
            <h6 class="card-subtitle mb-2 text-muted">Please fill the username and sallary below</h6>
            <div class="mt-5">
              <div class="row">
                <div class="col">
                  <label for="username" class="form-label text-muted"><b>Input your name</b></label>
                  <input @keyup.enter="save" @keyup="checkUsername" type="text" class="form-control p-3" id="username" placeholder="Example : Jimmy Neutron" v-model="username" />
                  <small class="mt-1" v-if="error.username">
                    <span class="text-danger"><b>Username can't be empty</b></span>
                  </small>
                </div>
              </div>
              <div class="row mt-4">
                <div class="col">
                  <label for="sallary" class="form-label text-muted"><b>Insert your sallary</b></label>
                  <input @keyup.enter="save" @keyup="checkSallary" type="number" class="form-control p-3" id="sallary" placeholder="Example : 5000000" v-model.number="sallary" />
                  <small class="mt-1" v-if="error.sallary">
                    <span class="text-danger"><b>Sallay can't be empty or zero</b></span>
                  </small>
                </div>
              </div>
            </div>
            <div @click="save" class="btn btn-save px-5 py-2 mt-3">Save</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      username: '',
      sallary: null,
      error: {
        username: false,
        sallary: false,
      },
    };
  },
  methods: {
    checkUsername() {
      this.error.username = this.username == '' ? true : false;
    },
    checkSallary() {
      this.error.sallary = this.sallary == '' || this.sallary == 0 ? true : false;
    },
    save() {
      if (this.username == '') {
        Swal.fire('Ooopss!', "Username can't be empty. ", 'error');
      } else if (this.sallary == null || this.sallary == '' || this.sallary == 0) {
        Swal.fire('Ooopss!', "Sallary can't be empty. ", 'error');
      } else {
        localStorage.setItem('my_name', this.username);
        localStorage.setItem('my_sallary', this.sallary);
        localStorage.setItem('date_login', Date());
        this.$router.push({ name: 'Sallary' });
        this.username = '';
        this.sallary = null;
        Swal.fire('Good Job!', "Let's go to manage your finance with us. ", 'success');
      }
    },
  },
};
</script>

<style scoped>
input {
  border-radius: 10px;
}
.btn-save {
  border-radius: 10px;
  background-color: #4361ee;
  color: white;
}

/* For mobile phones: */
@media only screen and (max-width: 768px) {
  .fitur {
    margin-left: 35%;
  }
}
</style>
