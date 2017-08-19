<template>
  <div class="w-book-mark">
    <div class="w-border-side"></div>
    <div class="w-mark-content">
      <header>
        <div>175天前 2月22日 14:35</div>
        <div>*</div>
      </header>
      <section>
        <div>网络安全</div>
        <div>icon</div>
      </section>
    </div>
  </div>
</template>

<style>
.w-book-mark {
  display: flex;
  width: 95%;
  height: 65px;
  margin: 4px 0;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: -1px 0 1px #ccc, 0 0 0 #ccc, 1px 0 1px #ccc, 0 1.5px 1px #ccc;
}

.w-border-side {
  height: 100%;
  width: 5%;
  background: grey;
}

.w-mark-content {
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 100%;
  background: lightyellow;
}

.w-mark-content > header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35%;
  background: green;
  padding: 0 16px;
  font-size: 12px;
}

.w-mark-content > section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65%;
  background: paleturquoise;
  padding: 8px 16px;
  font-size: 15px;
}
</style>
