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

    <v-simple-table fixed-header height="300px">
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(question, index) in questionsArray" :key="question.id">
            <td>{{ index + 1 }}</td>
            <td>
              <v-text-field
                v-model.number="question.correctNumber"
                type="number"
                @change="changeCorrectNumber(index + 1, $event)"
              >
              </v-text-field>
            </td>
            <td>
              <v-text-field
                v-model.number="question.point"
                type="number"
                @change="changePoint(index + 1, $event)"
              ></v-text-field>
            </td>
            <td>{{ question.correctNumber * question.point }}</td>
            <td>
              <v-select
                :value="defaultKanten"
                :items="kantens"
                @change="changeKanten(index + 1, $event)"
              ></v-select>
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
      questionsArray: [
        {
          id: 1,
          correctNumber: 5,
          point: 2,
          kanten: '知識・技能',
        },
      ],
    }
  },
  computed: {
    totalScore() {
      return this.shikoTotal + this.chishikiTotal
    },
    shikoTotal() {
      // shikoの配列をつくる
      const shikoArr = this.questionsArray.filter(
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
      const chishikiArr = this.questionsArray.filter(
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
      const newQuestion = {
        id: this.questionsArray.length + 1,
        correctNumber: 5,
        point: 2,
        kanten: '知識・技能',
      }
      this.questionsArray.push(newQuestion)
    },
    changeKanten(id, value) {
      const target = this.questionsArray.filter(
        (question) => question.id === id
      )
      target[0].kanten = value
    },
    changePoint(id, value) {
      const target = this.questionsArray.filter(
        (question) => question.id === id
      )
      target[0].point = value
    },
    changeCorrectNumber(id, value) {
      const target = this.questionsArray.filter(
        (question) => question.id === id
      )
      target[0].correctNumber = value
    },
  },
}
</script>
