<template>
  <div class="mt-2">
    <h2>生徒登録</h2>
    <div class="mt-2">
      <v-file-input
        v-model="fileName"
        accept=".csv"
        truncate-length="10"
        :disabled="isFile"
        :clearable="isFile"
        :label="message"
        @change="loadCsvFile"
      />
      <v-btn color="error" class="ml-2" @click="reset">
        <v-icon>mdi-trash-can-outline</v-icon>リセット</v-btn
      >
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
            <tr v-for="student in students" :key="student.id">
              <td>{{ student.id }}</td>
              <td>{{ student.name }}</td>
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
      message: 'csvファイルをアップロードしてください。',
      students: [],
      isFile: false,
      fileName: null,
    }
  },
  async fetch() {
    this.students = await this.$db.collection('dbStudents').get()
  },

  methods: {
    reset() {
      this.$store.dispatch('students/resetStudents')
      this.students = []
      this.isFile = false
      this.fileName = null
      this.message = 'csvファイルをアップロードしてください。'
    },
    loadCsvFile(e) {
      this.message = 'アップロードされています。'
      this.students = []
      this.isFile = true
      const file = e

      if (!file.type.match('text/csv')) {
        this.message = 'CSVファイルを選択してください'
        return
      }

      const reader = new FileReader()
      reader.readAsText(file)
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
      this.isFile = true
    },
    addStudents(newStudents) {
      this.$store.dispatch('students/addStudents', newStudents)
    },
  },
}
</script>