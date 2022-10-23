<template>
  <v-container class="result-page">
    <h2 class="text-center">採点一覧ページ</h2>

    <div class="btn-group d-flex justify-end mt-5">
      <section>
        <xlsx-workbook>
          <xlsx-sheet
            v-for="s in studentsWithTotal"
            :key="s.id"
            :collection="studentsWithTotal"
            sheet-name="sheet1"
          />
          <xlsx-download :filename="`${exportFileName}.xlsx`">
            <v-btn color="success" @click="setName">
              <v-icon class="mr-1">mdi-monitor-arrow-down-variant </v-icon>
              エクスポート
            </v-btn>
          </xlsx-download>
        </xlsx-workbook>
      </section>
      <v-btn class="ml-2" color="error" width="150" @click="clear">
        <v-icon>mdi-trash-can-outline</v-icon>クリア</v-btn
      >
    </div>

    <v-simple-table fixed-header class="mt-5">
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
            <td>{{ student.isAttending ? '出席' : '欠席' }}</td>
            <td>{{ student.chishiki }}</td>
            <td>{{ student.shiko }}</td>
            <td>
              {{ student.chishiki + student.shiko }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
import XlsxWorkbook from 'vue-xlsx/dist/components/XlsxWorkbook'
import XlsxSheet from 'vue-xlsx/dist/components/XlsxSheet'
import XlsxDownload from 'vue-xlsx/dist/components/XlsxDownload'
export default {
  components: {
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload,
  },
  data() {
    return {
      categories: [
        'No.',
        'Name',
        '出席・欠席',
        '知識・理解',
        '思考・表現',
        '合計',
      ],
      exportFileName: null,
    }
  },
  computed: {
    students() {
      return this.$store.getters['students/students']
    },
    studentsWithTotal() {
      const studentsWithTotal = []
      this.students.forEach((s) => {
        s.total = Number(s.chishiki + s.shiko)
        studentsWithTotal.push(s)
      })
      return studentsWithTotal
    },
  },
  methods: {
    setName() {
      const response = prompt('ファイル名を設定してください。') || 'テスト結果'
      this.exportFileName = response
    },
    clear() {
      const message = '本当に削除してよろしいですか。'
      const result = confirm(message)
      if (result) {
        this.$store.dispatch('students/resetStudents')
      }
    },
  },
}
</script>