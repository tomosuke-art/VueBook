<template>
  <v-app>
    <Header/>
      <v-main>
        <v-container>
          <!-- 親側でデータを受け取る -->
          <router-view
          :books="books"
          @add-book-list="addBook"
          @update-book-info="updateBookInfo"/>
        </v-container>
      </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Header from '@/global/Header';
import Footer from '@/global/Footer';
const STORAGE_KEY = 'books' 

export default {
  name: 'App',

  components: {
    Header,
    Footer
  },

  data(){
    return{
      books: [], 
      newBook: null // 空
    }
  },
  mounted() {
    // localStorageにitemがあればJSON.perseで値を持ってきてbooks[]に保存
    if (localStorage.getItem(STORAGE_KEY)) { // 設定の確認
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY)); // 取得 this.book = data()のbooks
      } catch(e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  },
  methods: {
    // 追加
    // 引数eで子供のコンポーネントから渡ってくる値を取得
    addBook(e) {

      this.books.push({
        id: this.books.length,
        title: e.title,
        image: e.image,
        description: e.description,
        readDate: '',
        memo: ''
      });
      // this.newBook = '';
      this.saveBooks();
      // 追加した本の編集画面に移動

      // 最後に追加したidの取得コード
      // console.log(this.books.slice(-1)[0].id)
      this.goToEditPage(this.books.slice(-1)[0].id)

    },
    removeBook(x) {
      this.books.splice(x, 1);
      this.saveBooks();
    },
    // localStorageに保存
    saveBooks() {
      // オブジェクトのままでは保存できない
      // 文字列保存のためデコードする
      const parsed = JSON.stringify(this.books);
      localStorage.setItem(STORAGE_KEY, parsed);
    },
    // 引数eで子のコンポーネントから情報を取得
    updateBookInfo(e){
      // オブジェクトを作成
      const updateInfo = {
        id: e.id,
        readDate: e.readDate,
        memo: e.memo,
        title: this.books[e.id].title,
        image: this.books[e.id].image,
        description: this.books[e.id].description
      }
      // 配列の中身を置き換える(何番目か,一つ目,オブジェクト)
      this.books.splice(e.id, 1, updateInfo)
      // LocalStorageに保存
      this.saveBooks()
      // 保存後にトップへ戻る
      this.$router.push('/')
    },
    // 編集画面へ移動
    goToEditPage(id){
      // idが変数で変わるためテンプレート構文で記述
      this.$router.push(`/edit/${id}`);
    }
  }
};
</script>
