<template>
  <div>
    <slot name="upload-students-description">
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
    </slot>
    <slot name="add-students-description">
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
    </slot>
  </div>
</template>