<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="max-auto">
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title>
                タイトル :{{ book.title }}
              </v-card-title>
              読んだ日:
              <!-- カレンダー表示(日本語で) -->
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                 <!-- 日本語対応にする -->
                <v-date-picker 
                v-model="date" @input="menu = false"
                locale="jp-ja"
                :day-format="date => new Date(date).getDate()">
                </v-date-picker>

              </v-menu>
              感想:<v-textarea
              class="mx-2" v-model="book.memo">
              {{ book.memo }}
              </v-textarea>
              <v-card-actions>
                <v-btn color="secondary" to="/">一覧に戻る</v-btn>
                <v-btn color="info" >保存する</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
   name:'BookEdit',
   props:{
     books:Array
   },
   // propsで配列で入ってくるのでbookに一つの情報を入れれるようにする
   data(){
     return{
       // オブジェクト
       book:'',
       date: new Date().toISOString().substr(0, 10),
       menu: false,
     }
   },
   // thisのアクセスはできない
   // 代わりにvmでインスタンスにアクセス 
   beforeRouteEnter (to, from, next) {
    next(vm => {
      // DOM更新がされた後に更新するように
      vm.$nextTick(()=>{
        vm.book = vm.books[vm.$route.params.id]
        console.log(vm.book)
      })
    })
   }
}
</script>

<style>

</style>