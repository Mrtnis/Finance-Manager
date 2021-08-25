<template>
  <div class="row mb-5">
    <div class="col-md">
      <router-link class="btn btn-back py-2 px-4" to="/sallary">Back To Menu</router-link>
    </div>
  </div>
  <!-- sallary info -->
  <div class="row">
    <div class="col">
      <h6 class="text-muted mb-4">
        <i class="bi bi-wallet2"></i> <b>Rp. {{ Intl.NumberFormat().format(my_sallary) }}</b>
      </h6>
    </div>
  </div>
  <div class="row mb-5">
    <div class="col-md-4 mb-4">
      <div class="card">
        <div class="card-body">
          <div class="row mt-3">
            <div class="col">
              <label class="mb-2 fw-bold"><small>What's your expenses today?</small></label>
              <input @keyup.enter="addDaily" type="text" class="form-control" placeholder="Example: Breakfast, lunch or dinner" v-model="data.desc" />
              <label class="mb-2 fw-bold"><small>How much money did you use?</small></label>
              <input @keyup.enter="addDaily" type="number" class="form-control" placeholder="Example: 50000" v-model.number="data.money" />
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div @click="addDaily" class="btn btn-add px-4 py-2 btn-sm">Add daily expenses</div>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <!-- table -->
      <div class="card" v-if="dailyTable.length">
        <div class="card-body">
          <div class="mb-4 fw-bolder h5 text-center">Your expenses today</div>
          <hr class="mx-5" />
          <div class="table-responsive">
            <small>
              <table class="table table-striped">
                <thead>
                  <tr class="text-center">
                    <th>Number</th>
                    <th>Description</th>
                    <th>Money</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center align-middle" v-for="(expense, index) in dailyTable" :key="index">
                    <td class="p-3">{{ index + 1 }}</td>
                    <td>{{ expense.desc.toUpperCase() }}</td>
                    <td>Rp. {{ Intl.NumberFormat().format(expense.money) }}</td>
                    <td @click="deleteExpense(expense.id)"><i class="bi bi-x text-danger btn"></i></td>
                  </tr>
                </tbody>
              </table>
            </small>
          </div>
          <div class="row">
            <div class="col">
              <div class="total">Rp. {{ Intl.NumberFormat().format(total) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-md-6">
          <div class="alert alert-warning" role="alert">No daily expenses yet.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Daily',
  data() {
    return {
      dailyTable: [],
      dailyStorage: [],
      my_sallary: 0,
      data: {
        id: new Date().getTime(),
        desc: '',
        money: null,
        hour: new Date().getHours(),
        day: new Date().getDay(),
        month: new Date().toLocaleString('default', { month: 'long' }),
      },
    };
  },
  mounted() {
    this.updateDaily();
    this.updateTable();
    this.getSallary();
  },
  methods: {
    updateDaily() {
      this.dailyStorage = JSON.parse(localStorage.getItem('daily')) || [];
    },
    updateTable() {
      this.dailyTable = this.dailyStorage.filter((item) => {
        return item.day == this.data.day && item.month == this.data.month;
      });
    },
    getSallary() {
      this.my_sallary = localStorage.getItem('my_sallary');
    },
    addDaily() {
      if (this.data.desc === '') {
        Swal.fire('Ooopss!', "Description can't be empty. ", 'error');
        if (this.data.money === null || this.data.money === '' || this.data.money === 0) {
          Swal.fire('Ooopss!', "Expenses can't be empty or zero. ", 'error');
        }
      } else if (this.data.money === null || this.data.money === '' || this.data.money === 0) {
        Swal.fire('Ooopss!', "Expenses can't be empty or zero. ", 'error');
      } else {
        const my_money = localStorage.getItem('my_sallary');
        if (this.data.money > my_money) {
          Swal.fire('Ooopss!', 'Your sallary is not enough. ', 'error');
        } else {
          this.dailyStorage.push(this.data);
          localStorage['daily'] = JSON.stringify(this.dailyStorage);
          this.updateDaily();
          this.updateTable();
          const reduce = my_money - this.data.money;
          localStorage.setItem('my_sallary', reduce);
          this.getSallary();
          Swal.fire('Yeeeaaaayyyy!', 'Your daily expenses have been added. ', 'success');
          this.data.desc = '';
          this.data.money = null;
          this.$router.go();
        }
      }
    },
    deleteExpense(param) {
      Swal.fire({
        text: 'Are you sure to delete this data?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes, I'm Sure",
      }).then((result) => {
        if (result.isConfirmed) {
          this.dailyStorage = this.dailyStorage.filter((item) => {
            return item.id !== param;
          });
          localStorage['daily'] = JSON.stringify(this.dailyStorage);
          this.updateDaily();
          this.updateTable();
          Swal.fire('Delete', 'Your data has been deleted.', 'success');
        }
      });
    },
  },
  computed: {
    total() {
      return this.dailyTable.reduce(function (item, data) {
        return item + data.money;
      }, 0);
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}
.total {
  float: right;
  margin-right: 5%;
  font-weight: bolder;
}
.card-footer {
  background-color: transparent;
}
.alert-warning {
  border-radius: 10px;
}
.bi-wallet2 {
  color: #4361ee;
  font-size: 25px;
  margin-right: 10px;
}
input {
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 13px;
}
.btn-add {
  float: right;
  border-radius: 10px;
  color: white;
  background-color: #4361ee;
}
</style>
