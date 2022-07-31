<template>
  <div>
    <div
      v-if="
        (students && students.length === 0) ||
        (questions && questions.length === 0)
      "
    >
      <nuxt-link to="/settings"> 設定画面へ </nuxt-link>
    </div>
    <v-container v-else>
      <h1 class="d-none">採点APP</h1>

      <div class="d-flex justify-space-between align-center ma-5">
        <div><span>No.</span>{{ students[studentNum].id }}</div>
        <div><span>名前:</span>{{ students[studentNum].name }}</div>
        <div><span>知識・技能:</span>{{ chishikiTotal }}</div>
        <div><span>思考・表現・判断:</span>{{ shikoTotal }}</div>
        <h3>
          合計
          <span class="pink--text text--lighten-2">{{ totalScore }}</span
          >/100
        </h3>
      </div>
      <div class="d-flex justify-end ma-5">
        <v-btn @click="nextStudent">Next</v-btn>
      </div>

      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th v-for="(item, index) in items" :key="index" class="text-left">
                <span>{{ item }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(question, index) in questions" :key="question.id">
              <td>{{ index + 1 }}</td>
              <td>
                <v-text-field
                  ref="focusThis"
                  :value="question.correctNumber"
                  type="number"
                  @change="changeCorrectNumber(question.id, $event)"
                  @keydown.prevent.tab.exact="moveNext(index)"
                  @keydown.prevent.shift.tab="movePrev(index)"
                  @keydown.prevent.down="moveNext(index)"
                  @keydown.prevent.up="movePrev(index)"
                ></v-text-field>
              </td>
              <td><span>x</span>{{ question.point }}</td>
              <td>{{ question.correctNumber * question.point }}</td>
              <td>
                {{ question.kanten }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: 'check-excisting-data',
  data() {
    return {
      test: true,
      studentNum: 0,
      selectedByDefault: '知識・技能',
      items: ['No.', '正解数', '配点', '小計', '観点'],
    }
  },
  computed: {
    questions() {
      return this.$store.getters['questions/questions']
    },
    students() {
      return this.$store.getters['students/students']
    },
    totalScore() {
      return this.shikoTotal + this.chishikiTotal
    },
    shikoTotal() {
      // shikoの配列をつくる
      const shikoArr = this.questions.filter(
        (value) => value.kanten === '思考・表現・判断'
      )
      // shikoArrの合計を出す
      let subtotal = 0
      shikoArr.forEach((item) => {
        subtotal += item.correctNumber * item.point
      })
      return subtotal
    },
    chishikiTotal() {
      // shikoの配列をつくる
      const chishikiArr = this.questions.filter(
        (value) => value.kanten === '知識・技能'
      )
      // chishikiArrの合計を出す
      let subtotal = 0
      chishikiArr.forEach((item) => {
        subtotal += item.correctNumber * item.point
      })
      return subtotal
    },
  },

  mounted() {
    this.$refs.focusThis[0].focus()
  },
  methods: {
    changeCorrectNumber(id, value) {
      this.$store.dispatch('questions/changeCorrectNumber', { id, value })
    },
    nextStudent() {
      if (this.studentNum === this.students.length - 1) {
        alert('No more students!!!')
      } else {
        this.studentNum++
      }
    },
    focusInput(index) {
      this.$refs.focusThis[index].focus()
    },
    moveNext(index) {
      const last = this.$refs.focusThis.length
      if (index >= 0 && index < last - 1) {
        this.focusInput(Number(index + 1))
      }
    },
    movePrev(index) {
      const last = this.$refs.focusThis.length
      if (index >= 1 && index < last) {
        this.focusInput(Number(index - 1))
      }
    },
  },
}
</script>