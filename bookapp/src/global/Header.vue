<template>
  <div>
     <v-app-bar
      app
      color="primary"
      dark
     ><v-btn color="primary" to="/">
      <v-icon>mdi-book-open-page-variant-outline</v-icon>
     </v-btn>
      <v-spacer></v-spacer>
      <!-- 一括削除ボタン -->
      <v-btn 
      color="error"
      @click="deleteLocalStorage">
       <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-app-bar>
  </div>

</template>

<script>
export default {
  name: 'Header',
  methods:{
    deleteLocalStorage(){
      this.$emit('delete-local-storage')
    }
  }
}
</script>

<style>

</style>