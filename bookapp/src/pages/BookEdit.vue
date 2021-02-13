<template>
  <div>BookEdit
    {{ books.title}}
    {{ books }}
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
       book:'' // オブジェクト
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