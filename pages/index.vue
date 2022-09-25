<template>
  <div>
    <!-- 生徒と問題が登録されていない場合 -->
    <div
      v-if="
        (students && students.length === 0) ||
        (questions && questions.length === 0)
      "
    >
      <nuxt-link to="/settings"> 設定画面へ </nuxt-link>
    </div>
    <!-- 生徒と問題が登録されている場合 -->
    <v-container v-else class="status-info">
      <div>
        <h1>採点ページ</h1>
        <v-list class="d-flex justify-space-between align-center ma-5">
          <v-list-item>
            <v-list-item-content>
              <span>No.</span>{{ students[studentNum].id }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            ><v-list-item-content>
              <span>名前:</span>{{ students[studentNum].name }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <span>知識・技能:</span>{{ chishikiTotal }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <span>思考・表現・判断:</span>{{ shikoTotal }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <h3>
                合計
                <span :class="{ 'pink--text text-h5': isLessThanHundred }">{{
                  totalScore
                }}</span
                >/100
              </h3>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div class="d-flex justify-end ma-5">
          <v-btn
            :disabled="isValidated ? false : true"
            color="success"
            class="mr-4"
            @click="nextStudent()"
            >Next</v-btn
          >
          <v-btn color="error" class="mr-4" @click="reset">Clear</v-btn>
        </div>
      </div>

      <v-form ref="form" v-model="isValidated">
        <v-simple-table fixed-header height="600px">
          <template #default>
            <thead>
              <tr>
                <th
                  v-for="(item, index) in items"
                  :key="index"
                  class="text-left"
                >
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
                    :rules="rules"
                    :value="correctNumber"
                    type="number"
                    required
                    @input="
                      changeCorrectNumber(question.id, $event),
                        getMaxPoint(question.setNumber)
                    "
                    @keydown.prevent.tab.exact="moveNext(index)"
                    @keydown.prevent.shift.tab="movePrev(index)"
                    @keydown.prevent.down="moveNext(index)"
                    @keydown.prevent.up="movePrev(index)"
                    @keydown.prevent.enter="moveNext(index)"
                    @keydown.meta.enter.exact="nextStudent()"
                  ></v-text-field>
                </td>
                <td><span>x</span>{{ question.point }}</td>

                <!-- subtotal -->
                <td>{{ correctNumber * question.point }}</td>
                <td>{{ question.subtotal }}</td>
                <td>
                  {{ question.kanten }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: 'check-excisting-data',
  data() {
    return {
      isValidated: false,
      score: {
        chishiki: 0,
        shiko: 0,
      },
      target: 0,
      studentNum: 0,
      selectedByDefault: '知識・技能',
      items: ['No.', '正解数', '配点', '小計', '配分', '観点'],
      correctNumber: null,
      maxPoint: 10,
      minPoint: 0,
      isLessThanHundred: false,
      rules: [
        (value) => value !== null || '値を入力してください。',
        (value) =>
          value >= this.minPoint ||
          `${this.minPoint}以上の値を入力してください`,
        (value) =>
          value <= this.maxPoint ||
          `${this.maxPoint}以下の値を入力してください`,
        (value) => /[0-9]/.test(value) || '半角英数字を入力してください',
      ],
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
      const totalScore = this.shikoTotal + this.chishikiTotal
      this.alertOverHundred(totalScore)
      return totalScore
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
    alertOverHundred(value) {
      if (value > 100) {
        this.isLessThanHundred = true
        alert('Stop!! The score is more than 100!!!')
      } else {
        this.isLessThanHundred = false
      }
    },
    getMaxPoint(value) {
      this.maxPoint = value
    },
    changeCorrectNumber(id, value) {
      this.$store.dispatch('questions/changeCorrectNumber', { id, value })
    },
    shortCutKeyForNextStudent(e) {
      if (e.ctrlKey || e.metaKey) {
        this.nextStudent()
      }
    },
    nextStudent() {
      if (this.totalScore > 100 || this.isValidated === false) {
        // totalScoreが100を超えていたらアラートを出して処理を進めない
        // validateがかかった状態だとすすまない
        this.alertOverHundred(this.totalScore)
      } else {
        this.studentNum++
        const scoreInfo = {
          id: this.studentNum,
          chishiki: this.chishikiTotal,
          shiko: this.shikoTotal,
        }
        this.$store.dispatch('students/addScoreToStudent', scoreInfo)
        // 値の初期化
        this.reset()
        // フォーカスを最初にあわせる
        this.focusInput(0)
        if (this.studentNum > this.students.length - 1) {
          alert('結果を表示します')
          this.$router.push('/result')
          this.studentNum = 0
        }
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
    reset() {
      this.isValidated = false
      this.$refs.form.reset()
      this.focusInput(0)
    },
  },
}
</script>
<style lang="scss" scoped>
.saiten-page {
}
.status-info {
}
</style>