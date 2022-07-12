<template>
  <div>
    <h2>生徒登録</h2>
    <div class="mt-2">
      <input type="file" @change="loadCsvFile" />
      <p>{{ message }}</p>
    </div>
    <div>
      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(worker, index) in students" :key="index">
              <td v-for="(column, i) in worker" :key="i">{{ column }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: '',
      students: [],
    }
  },
  computed: {
    // students: {
    //   get() {
    //     return this.$store.getters['students/students']
    //   },
    //   set(value) {
    //     const newStudents = value
    //     this.$store.commit('students/addStudents', newStudents)
    //   },
    // },
  },
  methods: {
    loadCsvFile(e) {
      this.message = ''
      const file = e.target.files[0]

      if (!file.type.match('text/csv')) {
        this.message = 'CSVファイルを選択してください'
        return
      }

      const reader = new FileReader()
      reader.readAsText(file)

      reader.onload = () => {
        const lines = reader.result.split('\n')
        lines.shift()
        const linesArr = []
        for (let i = 0; i < lines.length; i++) {
          linesArr[i] = lines[i].split(',')
        }
        this.students = linesArr
      }
    },
  },
}
</script>