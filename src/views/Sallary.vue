<template>
  <div class="mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card border-0">
          <div class="card-body">
            <h4 class="welcome card-title">
              Choose what service that you want, <b>{{ username }}</b
              >.
            </h4>
            <h6 class="card-subtitle mb-2 text-muted mt-2">
              <div class="row">
                <div class="col-md">
                  <i class="bi bi-wallet2"></i> <b>Rp. {{ Intl.NumberFormat().format(sallary) }}</b>
                </div>
              </div>
              <div class="row g-2 mt-2">
                <div class="col-auto">
                  <input type="number" @keyup.enter="addSallary" class="form-control" v-model.number="newSallary" placeholder="Add your sallary" />
                </div>
                <div class="col-auto">
                  <button type="submit" class="btn btn-save mb-3" @click="addSallary">Add Sallary</button>
                </div>
              </div>
            </h6>
            <div class="mt-4">
              <div class="row">
                <div class="col-md-4">
                  <div class="card shadow fitur-box">
                    <router-link to="/daily" class="btn">
                      <div class="card-body">
                        <i class="bi bi-cash-coin"></i>
                        <div class="fitur-text">Daily</div>
                      </div>
                    </router-link>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card shadow fitur-box">
                    <router-link to="/bank" class="btn">
                      <div class="card-body">
                        <i class="bi bi-bank2"></i>
                        <div class="fitur-text">Bank</div>
                      </div>
                    </router-link>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card shadow fitur-box">
                    <router-link to="/report" class="btn">
                      <div class="card-body">
                        <i class="bi bi-file-earmark-check"></i>
                        <div class="fitur-text">Report</div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mb-4">
        <div class="col-md-6">
          <div @click="logout" class="btn btn-back py-2 px-4">Logout</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sallary',
  data() {
    return {
      username: localStorage.getItem('my_name'),
      sallary: 0,
      newSallary: null,
    };
  },
  mounted() {
    this.updateSallary();
  },
  methods: {
    updateSallary() {
      this.sallary = localStorage.getItem('my_sallary');
    },
    logout() {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Your data will be deleted when you logout',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want logout!',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('my_name');
          localStorage.removeItem('my_sallary');
          localStorage.removeItem('date_login');
          localStorage.removeItem('my_bank');
          localStorage.removeItem('daily');
          this.$router.push({ name: 'Home' });
          Swal.fire('Logout!', 'You has been logout.', 'success');
        }
      });
    },
    addSallary() {
      if (this.newSallary === '' || this.newSallary === 0 || this.newSallary === null) {
        Swal.fire('Oooops!', "New sallary can't be null or zero. ", 'error');
      } else {
        const oldSallary = localStorage.getItem('my_sallary');
        const add = parseInt(oldSallary) + this.newSallary;
        localStorage.setItem('my_sallary', add);
        this.updateSallary();
        Swal.fire('Yeeaaayy!', 'Your sallary has been added.', 'success');
        this.newSallary = null;
      }
    },
  },
};
</script>

<style scoped>
.fitur-box {
  border-radius: 10px;
  border-color: #4361ee;
  margin-bottom: 20px;
  text-align: center;
  align-self: center;
}
.bi {
  color: #4361ee;
  font-size: 50px;
}
.fitur-text {
  font-weight: bolder;
}
.bi-wallet2 {
  font-size: 25px;
}
.btn-back {
  float: right;
}
input {
  border-radius: 10px;
}
</style>
