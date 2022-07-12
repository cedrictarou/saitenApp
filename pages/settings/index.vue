<template>
  <v-container>
    <h1>settings</h1>
    <v-tabs v-model="tabDefault">
      <v-tab href="#settingQuestions">問題登録</v-tab>
      <v-tab href="#registerStudents">生徒登録</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabDefault">
      <!-- 問題の登録 -->
      <SettingQuestions />

      <v-tab-item value="registerStudents">
        <SettingStudents />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tabDefault: 'settingQuestions',
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
