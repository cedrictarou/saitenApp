<template>
  <v-tab-item value="settingQuestions">
    <div class="mt-3 d-flex justify-space-between align-center">
      <v-btn outlined @click="addQuestion">
        <v-icon class="mr-2">mdi-plus-circle-outline</v-icon>追加する</v-btn
      >
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
            <v-list-item-title>合計:{{ totalScore }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>

    <v-simple-table fixed-header height="600px">
      <template #default>
        <thead>
          <tr>
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
        <tbody>
          <tr v-for="(question, index) in questions" :key="question.id">
            <td>{{ index + 1 }}</td>
            <td>
              <v-text-field
                :value="question.correctNumber"
                type="number"
                @change="changeCorrectNumber(question.id, $event)"
              >
              </v-text-field>
            </td>
            <td>
              <v-text-field
                :value="question.point"
                type="number"
                @change="changePoint(question.id, $event)"
              ></v-text-field>
            </td>
            <td>{{ question.correctNumber * question.point }}</td>
            <td>
              <v-select
                :value="defaultKanten"
                :items="kantens"
                @change="changeKanten(question.id, $event)"
              ></v-select>
            </td>
            <td>
              <v-btn icon>
                <v-icon @click="removeQuestion(question.id)">mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-tab-item>
</template>

<script>
export default {
  data() {
    return {
      tabDefault: 'settingQuestions',
      defaultKanten: '知識・技能',
      tableHeader: ['No.', '問題数', '配点', '小計', '観点'],
      kantens: ['知識・技能', '思考・表現・判断'],
    }
  },
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
  methods: {
    addQuestion() {
      this.$store.dispatch('questions/addQuestions')
    },
    removeQuestion(id) {
      this.$store.dispatch('questions/removeQuestion', id)
    },

    changeKanten(id, value) {
      this.$store.dispatch('questions/changeKanten', { id, value })
    },
    changePoint(id, value) {
      this.$store.dispatch('questions/changePoint', { id, value })
    },
    changeCorrectNumber(id, value) {
      this.$store.dispatch('questions/changeCorrectNumber', { id, value })
    },
  },
}
</script>
