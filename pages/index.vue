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
    <v-container v-else>
      <div>
        <h2 class="text-center">採点ページ</h2>
        <div class="d-flex justify-end mr-5">
          <Description>
            <template #default>
              <p>採点を行うページです。</p>
              <p>
                各問いの正当数を入力して自動でそれぞれの観点別と合計を計算します。
              </p>
              <p>
                入力フォームの移動は矢印キーやエンターキーで行うことができます。
              </p>
              <p>
                <v-btn small color="success">Next</v-btn>をクリック、または<span
                  class="font-weight-bold"
                >
                  Ctrl + Enter</span
                >を押すことで次の生徒の採点を行うことができます。
              </p>
              <p>
                採点中の入力を消すときは
                <v-btn small color="error">Clear</v-btn>を押してくください。
              </p>
              <p>
                値が入力されていなかったり、指定された値以上の数値が入力されているとエラーが出ます。
              </p>
            </template>
          </Description>
        </div>

        <div
          class="
            status-bar
            blue
            lighten-5
            rounded
            mt-5
            mx-2
            pa-5
            text-md-h5
            font-weight-bold
            d-flex
            flex-column flex-sm-row
            justify-space-between
            flex-wrap
          "
        >
          <!-- status-bar--name -->
          <div class="mr-auto d-flex">
            <div class="mr-2">No.</div>
            <div class="mr-2">{{ students[studentNum].id }}</div>
            <div>{{ students[studentNum].name }}</div>
          </div>
          <!-- status-bar--score -->
          <div class="d-flex mt-5 mt-sm-0 justify-space-between">
            <div class="mr-2">
              知識・技能: <span class="mr-2">{{ chishikiTotal }}</span>
            </div>
            <div class="mr-2">
              思考・表現・判断: <span class="mr-2">{{ shikoTotal }}</span>
            </div>
            <div>
              合計:
              <span :class="{ 'pink--text': isLessThanHundred }">{{
                totalScore
              }}</span>
            </div>
          </div>
        </div>

        <div class="d-flex justify-end ma-5">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn
                :disabled="isValidated ? false : true"
                color="success"
                class="mr-4"
                v-bind="attrs"
                v-on="on"
                @click="nextStudent()"
              >
                <v-icon>mdi-arrow-right-thick</v-icon>
                Next</v-btn
              >
            </template>
            <span>「Ctr+Enter」で次の生徒に移動できます。 </span>
          </v-tooltip>

          <v-btn color="error" @click="reset"
            ><v-icon>mdi-trash-can-outline</v-icon>Clear</v-btn
          >
        </div>
      </div>

      <v-form ref="form" v-model="isValidated">
        <v-simple-table fixed-header height="500px">
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
                    @keydown.meta.enter.exact="shortCutKeyForNextStudent"
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
import Description from '~/components/tool/Description.vue'
export default {
  components: { Description },
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
      const allStudents = this.$store.getters['students/students']
      const attendingStudents = allStudents.filter(
        (s) => s.isAttending === true
      )
      return attendingStudents
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
    async nextStudent() {
      if (this.totalScore > 100 || this.isValidated === false) {
        // totalScoreが100を超えていたらアラートを出して処理を進めない
        // validateがかかった状態だとすすまない
        this.alertOverHundred(this.totalScore)
      } else {
        const scoreInfo = {
          id: this.students[this.studentNum].id,
          chishiki: this.chishikiTotal,
          shiko: this.shikoTotal,
        }
        await this.$store.dispatch('students/addScoreToStudent', scoreInfo)

        // 最後の生徒かどうかを判断する
        if (this.studentNum === this.students.length - 1) {
          // 最後の生徒
          alert('結果を表示します')
          this.$router.push('/result')
          // 値の初期化
          this.reset()
          this.studentNum = 0
        } else {
          // 最後じゃない場合
          // 次の生徒用にstudentNumを上げる
          this.studentNum++
          // 値の初期化
          this.reset()
          // フォーカスを最初にあわせる
          this.focusInput(0)
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
</style>