<template>
  <div>
    <div class="mt-3">
      <div class="btn-group d-flex mt-2">
        <v-btn color="success" @click="addQuestion">
          <v-icon>mdi-plus-circle-outline</v-icon>追加する</v-btn
        >
        <v-btn color="error" class="ml-2" @click="reset">
          <v-icon>mdi-trash-can-outline</v-icon>リセット</v-btn
        >
        <div class="ml-auto">
          <!-- 操作説明 -->
          <Description>
            <template #default>
              <p>
                <span><v-icon>mdi-plus-circle-outline</v-icon></span
                >を押すと問題が追加されます
              </p>
              <p>
                <span><v-icon>mdi-trash-can-outline</v-icon></span
                >を押すとすべての問題がリセットされます。
              </p>
              <p>
                正答数を基準に採点するので、問題数と配点、観点をそれぞれ設定してください。
              </p>
              <p>合計点数が100を超えるとエラーメッセージが表示されます。</p>
              <p>
                問題の設定が完了したら、上の<span class="font-weight-bold"
                  >生徒登録のタブ</span
                >から生徒の登録を行ってください。
              </p>
            </template>
          </Description>
        </div>
      </div>

      <div class="score-group d-flex justify-end align-center">
        <v-list class="d-flex">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >知識・技能:{{ chishikiTotal }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>思考・判断:{{ shikoTotal }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title :class="{ 'red--text': isValidated }"
                >合計:{{ totalScore }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </div>

    <v-simple-table fixed-header height="600px">
      <template #default>
        <thead>
          <tr>
            <th></th>
            <th
              v-for="(item, index) in tableHeader"
              :key="index"
              class="text-left fit"
            >
              {{ item }}
            </th>
            <th>削除</th>
          </tr>
        </thead>
        <draggable
          v-model="questions"
          tag="tbody"
          :options="{
            animation: 200, //アニメーション
            delay: 50, //スクロール防止（長押しでソート）
          }"
          @change="$store.dispatch('questions/changeOrder', questions)"
        >
          <tr v-for="(question, index) in questions" :key="question.id">
            <td>
              <v-icon>mdi-drag</v-icon>
            </td>
            <td>
              {{ index + 1 }}
            </td>
            <td>
              <v-text-field
                :value="question.setNumber"
                type="number"
                @input="changeSetNumber(question.id, $event)"
              >
              </v-text-field>
            </td>
            <td>
              <v-text-field
                :value="question.point"
                type="number"
                @input="changePoint(question.id, $event)"
              ></v-text-field>
            </td>
            <td>{{ question.setNumber * question.point }}</td>
            <td>
              <v-select
                :value="
                  question.kanten === '知識・技能'
                    ? '知識・技能'
                    : '思考・表現・判断'
                "
                :items="kantens"
                @input="changeKanten(question.id, $event)"
              ></v-select>
            </td>
            <td>
              <v-btn icon>
                <v-icon @click="removeQuestion(question.id)">mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </draggable>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Description from './tool/Description.vue'
export default {
  components: { Description, draggable },
  data() {
    return {
      tabDefault: 'settingQuestions',
      tableHeader: ['No.', '問題数', '配点', '小計', '観点'],
      kantens: ['知識・技能', '思考・表現・判断'],
      isValidated: false,
      // questions: [],
    }
  },
  // async fetch() {
  //   this.questions = await this.$db.collection('dbQuestions').get()
  // },

  computed: {
    questions() {
      return this.$store.getters['questions/questions']
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
        subtotal += item.setNumber * item.point
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
        subtotal += item.setNumber * item.point
      })
      return subtotal
    },
  },
  watch: {
    totalScore() {
      this.validateMassage()
    },
  },
  methods: {
    reset() {
      this.$store.dispatch('questions/resetQuestions')
    },
    validateMassage() {
      if (this.totalScore > 100) {
        alert('合計点数が100点以上になっています。')
      }
    },
    addQuestion() {
      const newQuestion = {
        id: Date.now(),
        correctNumber: 0,
        setNumber: 5,
        point: 2,
        kanten: '思考・表現・判断',
      }
      this.$store.dispatch('questions/addQuestions', newQuestion)
      // this.questions.push(newQuestion)
    },
    removeQuestion(id) {
      this.$store.dispatch('questions/removeQuestion', id)
      // this.questions = this.questions.filter((q) => q.id !== id)
    },
    changeKanten(id, value) {
      this.$store.dispatch('questions/changeKanten', { id, value })
    },
    changePoint(id, value) {
      this.$store.dispatch('questions/changePoint', { id, value })
    },
    changeSetNumber(id, value) {
      this.$store.dispatch('questions/changeSetNumber', { id, value })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>