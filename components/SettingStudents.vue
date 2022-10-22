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
        accept=".xlsx"
        :disabled="isFile"
        :clearable="isFile"
        :label="message"
        @change="arrangeData"
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
          <tr
            v-for="student in students"
            :key="student.id"
            :class="{ 'is-absent': !student.isAttending }"
          >
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>
              <v-select
                :value="student.isAttending ? '出席' : '欠席'"
                :items="items"
                @input="addAbsence(student.id, student.isAttending)"
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
      fileName: null,
      items: ['出席', '欠席'],
    }
  },

  computed: {
    students() {
      return this.$store.getters['students/students']
    },
    message() {
      const text = this.students.length
        ? 'xlsxファイルをアップロードしました。'
        : 'xlsxファイルをアップロードしてください。'
      return text
    },
    isFile() {
      return !!this.students.length
    },
  },

  methods: {
    addAbsence(id, isAttending) {
      const payload = { id, isAttending }
      payload.isAttending = !payload.isAttending
      this.$store.dispatch('students/addAbsence', payload)
    },
    reset() {
      this.fileName = null
      this.$store.dispatch('students/resetStudents')
    },
    addStudents(newStudents) {
      this.$store.dispatch('students/addStudents', newStudents)
    },
    // vue-js-xlsx.jsの処理
    arrangeData(e) {
      // await this.reset()
      const file = e
      const reader = new FileReader()
      const studentArry = []
      const load = () => {
        const jsonData = this.$xlsx.toJson(reader.result, {
          parsingOpts: {
            type: 'array',
          },
          sheetIndex: 0,
        })
        // jsonデータを必要な形に整形する
        // keyがなにであっても対応できるようにする処理
        const keyArry = Object.keys(jsonData[0])
        jsonData.forEach((j) => {
          studentArry.push({
            id: Number(j[keyArry[0]]),
            name: j[keyArry[1]],
            isAttending: true,
          })
        })
      }
      reader.onload = load
      reader.readAsArrayBuffer(file)
      // storeにstudentsデータを送る
      this.addStudents(studentArry)
    },
  },
}
</script>
<style scoped lang="scss">
.is-absent {
  background-color: #eeeeee;
}
</style>