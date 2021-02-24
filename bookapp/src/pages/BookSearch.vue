<template>
  <div class="search"><h1>Book Search</h1>
    <v-row justify="center" align-content="center">
      <v-col cols="6">
        <v-text-field
        label="本のタイトルを検索"
        v-model="keyword">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center" align-content="center">
      <v-col cols="3">
        <v-btn
        color="primary"
        @click="search(keyword)">
        検索<v-icon>mdi-card-search-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
        color="secondary"
        to="/"
        >一覧に戻る</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6"
        v-for="(book, index) in searchResults" :key="book.index">
        <v-card class="mx-auto">
          <v-row>
            <v-col cols="4">
            <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8"> 
              <v-card-title>{{ book.title }}</v-card-title>
              {{ book.description }}
              <v-spacer></v-spacer>
              <v-card-actions>
             <!-- 読書リストに登録する -->
                <v-btn fab dark color="indigo"
                @click = "addBookList(index)">
                <v-icon dark>mdi-plus</v-icon>
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
// GoogleBookAPIにアクセスして表示する
export default {
    name: 'BookSearch',
    data(){
            return{
              keyword: '',
              searchResults:[] // 検索結果
            }
          },
          methods:{
            // 子 → 親
            addBookList(index){
              this.$emit('add-book-list', this.searchResults[index])
            },
            // 非同期
            async search(keyword){
              this.searchResults = [] // 初期化
            // クエリーストリングを作成
              const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
              const params = {
                // 引数のkeywordを設定
                // q = クエリー
                q: `intitle:${keyword}`,
                maxResults:40
              }
              const queryParams = new URLSearchParams(params)
              console.log(baseUrl + queryParams)

            // fetchでAPIのJSON取得
            const response = await fetch(baseUrl + queryParams)
              .then( response => response.json())
              console.log(response)
            // 必要な情報を配列にpush
            for(let book of response.items){ // 単数 of 複数
              let title =  book.volumeInfo.title
              let img = book.volumeInfo.imageLinks 
              let description = book.volumeInfo.description 
              // searchResultsの中身（titile,image,description）
              this.searchResults.push({ 
                title: title ? title: '',  // titleがあったら追加、なかったら空の値
                image: img ? img.thumbnail: '', 
                description: description ? description.slice(0, 40) : '' // 40文字以内に指定
              })
            }
          }
      }
}
</script>

<style>
 .search{
   text-align: center;
 }
</style>