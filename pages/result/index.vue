<template>
  <v-container class="result-page">
    <h1>result</h1>
    <v-simple-table>
      <template #default>
        <thead>
          <tr>
            <th
              v-for="category in categories"
              :key="category.index"
              class="text-left"
            >
              {{ category }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.name">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.chishiki }}</td>
            <td>{{ student.shiko }}</td>
            <td>{{ student.chishiki + student.shiko }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      categories: ['No.', 'Name', '知識・理解', '思考・表現', '合計'],
    }
  },
  computed: {
    students() {
      return this.$store.getters['students/students']
    },
  },
}
</script>