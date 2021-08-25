<template>
  <div class="row mb-5">
    <div class="col-md">
      <router-link class="btn btn-back py-2 px-4" to="/sallary">Back To Menu</router-link>
    </div>
  </div>
  <div class="row mb-4">
    <div class="col-md-6">
      <div class="card shadow border-0">
        <div class="card-body mt-3">
          <h5 class="text-center fw-bolder">Report Your Finance In {{ new Date().toLocaleString('default', { month: 'long' }) }}</h5>
          <hr class="mx-5 d-md-block d-none" />
          <hr class="mx-5 d-md-block d-none" />
          <hr class="d-sm-block d-md-none" />
          <hr class="d-sm-block d-md-none" />
          <table class="table table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Rp. 50.000</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Rp. 50.000</td>
              </tr>
            </tbody>
          </table>
          <div class="row">
            <div class="col">
              <div class="date">
                <small>{{ getDate }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <div class="btn btn-save"><small>Print Report</small></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Report',
  data() {
    return {
      date: new Date().getDate(),
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      dailyStorage: [],
    };
  },
  mounted() {
    this.updateStorage();
  },
  methods: {
    updateStorage() {
      this.dailyStorage = JSON.parse(localStorage.getItem('daily')) || [];
      console.log(this.dailyStorage);
    },
  },
  computed: {
    getDate() {
      return this.date + ' ' + this.month + ' ' + this.year;
    },
  },
};
</script>

<style scoped>
.row {
  justify-content: center;
}
.card {
  border-radius: 20px;
}
.btn-save {
  float: right;
}
.date {
  float: right;
}
</style>
