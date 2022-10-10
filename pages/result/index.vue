<template>
  <v-container class="result-page">
    <h2>採点一覧</h2>
    <div class="btn-group d-flex justify-end mt-5">
      <v-btn color="error" width="150" @click="clear">
        <v-icon>mdi-trash-can-outline</v-icon>クリア</v-btn
      >
      <v-btn color="primary" class="ml-2" @click="exportCSV()">
        <v-icon class="mr-1">mdi-monitor-arrow-down-variant</v-icon>
        エクスポート</v-btn
      >
    </div>
    <v-simple-table fixed-header height="700px" class="mt-5">
      <template #default>
        <thead>
          <tr>
            <th
              v-for="category in categories"
              :key="category.index"
              class="text-left"
            >
              {{ category }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.name">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.chishiki }}</td>
            <td>{{ student.shiko }}</td>
            <td>
              {{
                student.isAttending ? student.chishiki + student.shiko : '欠席'
              }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      categories: ['No.', 'Name', '知識・理解', '思考・表現', '合計'],
    }
  },
  computed: {
    students() {
      return this.$store.getters['students/students']
    },
  },
  methods: {
    clear() {
      const message = '本当に削除してよろしいですか。'
      const result = confirm(message)
      if (result) {
        this.$store.dispatch('students/resetStudents')
      }
    },
    exportCSV() {
      // ダウンロードするCSVファイル名を指定する
      const filename = 'download.csv'
      // studentsにtotalを追加して新しい配列を作る
      const studentsWithTotal = []
      this.students.forEach((student) => {
        student.total = Number(student.chishiki + student.shiko)
        studentsWithTotal.push(student)
      })

      // CSVデータの整形
      const header = Object.keys(studentsWithTotal[0]).join(',') + '\n'
      const body = studentsWithTotal
        .map((student) => {
          return Object.keys(student)
            .map((key) => {
              return student[key]
            })
            .join(',')
        })
        .join('\n')

      const studentsCSV = header + body

      // BOMを付与する（Excelでの文字化け対策）
      const bom = new Uint8Array([0xef, 0xbb, 0xbf])
      // Blobでデータを作成する
      const blob = new Blob([bom, studentsCSV], { type: 'text/csv' })

      // BlobからオブジェクトURLを作成する
      const url = (window.URL || window.webkitURL).createObjectURL(blob)
      // ダウンロード用にリンクを作成する
      const download = document.createElement('a')
      // リンク先に上記で生成したURLを指定する
      download.href = url
      // download属性にファイル名を指定する
      download.download = filename
      // 作成したリンクをクリックしてダウンロードを実行する
      download.click()
      // createObjectURLで作成したオブジェクトURLを開放する
      ;(window.URL || window.webkitURL).revokeObjectURL(url)
    },
  },
}
</script>