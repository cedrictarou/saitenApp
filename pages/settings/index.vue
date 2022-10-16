<template>
  <v-container>
    <h2 class="text-center">設定ページ</h2>
    <div
      class="
        d-flex
        justify-space-around
        blue
        lighten-5
        rounded
        mt-5
        mx-2
        pa-5
        text-md-h5
        font-weight-bold
      "
    >
      <div>
        <span>問題登録</span>
        <span>{{ isSetQuestions ? 'OK' : 'NO' }}</span>
      </div>
      <div>
        <span>生徒登録</span>
        <span>{{ isSetStudents ? 'OK' : 'NO' }}</span>
      </div>
      <div>
        <nuxt-link to="/" :class="{ disabled: disabled }">
          採点画面へ
        </nuxt-link>
      </div>
    </div>
    <v-tabs v-model="tabDefault">
      <v-tab href="#settingQuestions">問題登録</v-tab>
      <v-tab href="#registerStudents">生徒登録</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabDefault">
      <v-tab-item value="settingQuestions">
        <!-- 問題の登録 -->
        <SettingQuestions :is-set-questions.sync="isSetQuestions" />
      </v-tab-item>

      <v-tab-item value="registerStudents">
        <!-- 生徒の登録 -->
        <SettingStudents :is-set-students.sync="isSetStudents" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isSetQuestions: false,
      isSetStudents: false,
      tabDefault: 'settingQuestions',
    }
  },
  computed: {
    // リンクを不活性化させる
    disabled() {
      const result = !this.isSetQuestions || !this.isSetStudents || false
      return result
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
