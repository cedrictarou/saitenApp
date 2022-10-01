<template>
  <v-dialog transition="dialog-top-transition" max-width="600">
    <template #activator="{ on, attrs }">
      <v-btn color="grey" outlined v-bind="attrs" v-on="on">操作説明</v-btn>
    </template>
    <template #default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>操作説明</v-toolbar>
        <!-- slotを使う -->
        <v-card-text class="px-5 pt-5 text-body-1">
          <slot></slot>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
</style>