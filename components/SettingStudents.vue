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
            <!-- <tr v-for="(worker, index) in students" :key="index">
              <td v-for="(column, i) in worker" :key="i">{{ column }}</td>
            </tr> -->
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

  methods: {
    loadCsvFile(e) {
      this.message = ''
      this.students = []
      const file = e.target.files[0]

      if (!file.type.match('text/csv')) {
        this.message = 'CSVファイルを選択してください'
        return
      }

      const reader = new FileReader()
      reader.readAsText(file, 'Shift_JIS')
      reader.onload = () => {
        const lines = reader.result.split('\n')
        // 最初の行を削除する
        lines.shift()
        lines.forEach((element, index) => {
          // 区切り文字はカンマ
          const studentData = element.split(',')
          this.students.push({
            id: index + 1,
            name: studentData[1].slice(0, -1),
          })
        })
        // storeにstudentsデータを送る
        this.addStudents(this.students)
      }
    },
    addStudents(newStudents) {
      this.$store.dispatch('students/addStudents', newStudents)
    },
  },
}
</script>