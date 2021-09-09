<template>
  <div class="row mb-4">
    <div class="col-md-6">
      <div class="card shadow border-0" id="print">
        <div class="card-body mt-3">
          <h5 class="text-center fw-bolder">Report Your Finance In {{ new Date().toLocaleString('default', { month: 'long' }) }}</h5>
          <hr class="mx-5 d-md-block d-none" />
          <hr class="mx-5 d-md-block d-none" />
          <hr class="d-sm-block d-md-none" />
          <hr class="d-sm-block d-md-none" />
          <table class="table table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Money</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in monthlyStorage" :key="index">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ data.date }}</td>
                <td>{{ data.desc }}</td>
                <td>Rp. {{ Intl.NumberFormat().format(data.money) }}</td>
              </tr>
              <tr>
                <th colspan="3">Total</th>
                <th>Rp. {{ Intl.NumberFormat().format(total) }}</th>
              </tr>
            </tbody>
          </table>
          <div class="row">
            <div class="col">
              <div class="date">
                <small>{{ getDateToday }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Print',
  data() {
    return {
      date: new Date().getDate(),
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      monthlyStorage: [],
    };
  },
  mounted() {
    this.updateStorage();
    setTimeout(() => {
      window.print();
    }, 1000);
  },
  methods: {
    updateStorage() {
      const allData = JSON.parse(localStorage.getItem('daily')) || [];
      this.monthlyStorage = allData.filter((item) => {
        return item.month == this.month && item.year == this.year;
      });
    },
  },
  computed: {
    getDateToday() {
      return this.date + ' ' + this.month + ' ' + this.year;
    },
    total() {
      return this.monthlyStorage.reduce(function (item, data) {
        return item + data.money;
      }, 0);
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
