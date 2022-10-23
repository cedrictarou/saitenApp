<template>
  <v-container>
    <h2 class="text-center">設定ページ</h2>
    <div
      class="
        d-flex
        justify-space-around
        align-center
        blue
        lighten-5
        rounded
        mt-5
        pa-5
        text-md-h5
        font-weight-bold
      "
    >
      <div>
        <span>問題登録</span>
        <span>{{ isTotalScoreOk ? 'OK' : 'NO' }}</span>
      </div>
      <div>
        <span>生徒登録</span>
        <span>{{ isSetStudents.length ? 'OK' : 'NO' }}</span>
      </div>
      <div>
        <v-btn
          depressed
          color="primary"
          :disabled="isDisabled"
          @click="goSaitenPage"
        >
          <span class="font-weight-bold"> 採点画面へ </span>
        </v-btn>
      </div>
    </div>
    <v-tabs v-model="tabDefault">
      <v-tab href="#settingQuestions">問題登録</v-tab>
      <v-tab href="#registerStudents">生徒登録</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabDefault">
      <v-tab-item value="settingQuestions">
        <!-- 問題の登録 -->
        <SettingQuestions />
      </v-tab-item>

      <v-tab-item value="registerStudents">
        <!-- 生徒の登録 -->
        <SettingStudents />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      sheets: [{ name: 'SheetOne', data: [{ c: 2 }] }],
      tabDefault: 'settingQuestions',
      // isDisabled: true,
    }
  },
  computed: {
    isSetStudents() {
      return this.$store.getters['students/students']
    },

    isTotalScoreOk() {
      let sum = 0
      const questions = this.$store.getters['questions/questions']
      questions.forEach((q) => {
        sum += q.subtotal
      })
      return sum === 100
    },
    // リンクを不活性化させる
    isDisabled() {
      return !(this.isSetStudents.length && this.isTotalScoreOk)
    },
  },
  methods: {
    goSaitenPage() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.disabled {
  color: lightgrey;
  pointer-events: none;
}
</style>
