<template>
  <div class="mt-2">
    <div>
      <div class="d-flex justify-end">
        <Description>
          <template #default>
            <p>csvファイルをアップロードしてください。</p>
            <p>1行目に出席番号と名前などのタイトルを設定してください。</p>
            <p>2行目以降に生徒の出席番号と名前を記載してください。</p>
            <p>
              新しいクラスの採点をするときや生徒のデータを消したいときは<v-icon>mdi-trash-can-outline</v-icon>リセットボタンを押してください。
            </p>
            <p>
              登録が完了したら<span class="font-weight-bold">採点ページ</span
              >に移動して採点をしてください。
            </p>
          </template>
        </Description>
      </div>
    </div>

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

    <v-simple-table fixed-header height="500px">
      <template #default>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Name</th>
            <th class="text-left">出席・欠席</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>
              <v-select
                :value="student.isAttending ? '出席' : '欠席'"
                :items="items"
                @input="addAbsence(student.id)"
              ></v-select>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
import Description from './tool/Description.vue'
export default {
  components: { Description },
  data() {
    return {
      message: 'csvファイルをアップロードしてください。',
      students: [],
      isFile: false,
      fileName: null,
      items: ['出席', '欠席'],
    }
  },
  async fetch() {
    this.students = await this.$db.collection('dbStudents').get()
  },
  watch: {
    students() {
      if (this.students.length > 0) {
        this.$emit('update:isSetStudents', true)
      } else this.$emit('update:isSetStudents', false)
    },
  },
  methods: {
    addAbsence(id) {
      this.$store.dispatch('students/addAbsence', id)
    },
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
      if (!file.type.match('csv')) {
        this.message = 'CSVファイルを選択してください'
        return
      }
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = () => {
        const lines = reader.result.split('\n')
        // 最初の行を削除する
        lines.shift()
        lines.forEach((element) => {
          // 区切り文字はカンマ
          const studentData = element.split(',')

          this.students.push({
            id: Number(studentData[0]),
            name: studentData[1].trim(),
            isAttending: true,
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
    // vue-js-xlsx.js
    deleteDropFile() {
      this.dropFile = null
    },
  },
}
</script>
<style scoped lang="scss">
</style>