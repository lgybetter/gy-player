<template>
  <div>
    <mt-header title="注册"></mt-header>
    <section class="w-auth-container">
      <div class="w-auth-form">
        <mt-field label="邮箱:" placeholder="请输入邮箱地址" v-model="account"></mt-field>
        <mt-field label="密码:" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-field label="确认密码:" placeholder="请再次输入密码" type="password" v-model="passwordConfirm"></mt-field>
      </div>
      <div class="w-auth-btn"><mt-button size="large" type="primary">注册</mt-button></div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      password: '',
      passwordConfirm: ''
    }
  }
}
</script>

<style>
.w-auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
}
.w-auth-form, .w-auth-btn {
  width: 80%;
}
.w-auth-form {
  margin: 16px 0;
}
</style>

