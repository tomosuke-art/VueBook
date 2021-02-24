<template>
  <div><h1 style="text-align:center">BookList</h1>
    <v-row>
      <v-col cols="6">
        <v-btn color="primary" to="/search">
          検索<v-icon>mdi-card-search-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" v-for="book in books" :key="book.id">
        <v-card>
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>{{ book.title }}</v-card-title>
              <v-icon>mdi-calendar-blank</v-icon>{{book.readDate}}<br>
              <v-icon>mdi-message-bulleted</v-icon>{{book.memo}}
              <v-spacer></v-spacer>
              <v-card-actions>
                <!-- edit/n番目 -->
                <v-btn :to="{name: 'BookEdit' , params: {id: book.id}}"
                color="indigo" fab small dark>
                 <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn color="error" 
                 @click="deleteBook(index)">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// const key = 'books' 
export default {

  props:{
    books:Array
  },
  methods:{
    
  }
}
</script>

<style>

</style>