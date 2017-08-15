<template>
  <div>
    <mt-header title="登陆"></mt-header>
    <section class="w-auth-container">
      <div class="w-auth-form">
        <mt-field label="邮箱:" placeholder="请输入邮箱地址" v-model="account"></mt-field>
        <mt-field label="密码:" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      </div>
      <div class="w-auth-btn"><mt-button size="large" type="primary">登陆</mt-button></div>
      <div class="w-auth-link">
        <a @click="changeRouter('/auth/signUp')">注册</a>
        <a @click="changeRouter('/')">忘记密码</a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    changeRouter (path) {
      this.$router.push(path)
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
.w-auth-link {
  width: 80%;
  padding: 8px;
  display: flex;
  justify-content: flex-end;
  color: #26a2ff;
}
.w-auth-link > a {
  margin: 0 0 0 8px;
}

.w-auth-link > a:active {
  color: #1b79bf;
}
</style>

