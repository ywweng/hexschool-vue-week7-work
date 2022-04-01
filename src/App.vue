<template>
  <main>
    <router-view />
  </main>
  <footer class="py-auto">
    <span
      >本網站僅作為
      <a href="https://github.com/ywweng">ywweng</a>
      個人學習使用，不具商業用途</span
    >
    <br />
    <span>Abbie @ 2022 COPYRIGHT</span>
  </footer>
</template>

<style lang="scss">
@import 'bootstrap/scss/bootstrap';
@import '@/assets/css/all.scss';
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Serif+Display:wght@300;400;500;700&display=swap');

#app {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
