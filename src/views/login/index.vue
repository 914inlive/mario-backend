<template>
  <div class="login-container">
    <div class="login-info">
      <img :src="require('@/assets/im-logo.png')" style="height: 70%; width: 70%" />
    </div>
    <el-form
      :model="loginForm"
      :rules="rules"
      autocomplete="off"
      class="login-form"
      label-position="left"
      ref="loginForm"
    >
      <div class="title-container">
        <h3 class="title">{{ $t("login.title") }}</h3>
        <lang-select class="set-language"/>
      </div>
        <el-form-item prop="mobileno">
          <el-input
            :placeholder="$t('table.user.mobileno')"
            @keyup.enter.native="handleLogin"
            autocomplete="off"
            prefix-icon="el-icon-user"
            type="text"
            v-model="loginForm.mobileno"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :placeholder="$t('table.user.password')"
            :show-password="true"
            @keyup.enter.native="handleLogin"
            autocomplete="off"
            prefix-icon="el-icon-key"
            type="password"
            v-model="loginForm.password"
          />
        </el-form-item>

        <el-checkbox v-model="remember">
          {{ $t("login.rememberMe") }}
        </el-checkbox>

        <p></p>

        <el-button
          :loading="loading"
          @click.native.prevent="handleLogin"
          style="width:100%;margin-bottom:14px;"
          type="primary"
        >
          {{ $t("login.logIn") }}
        </el-button>
      </el-form>
    <span class="login-footer">
    </span>
  </div>
</template>

<script>
  import LangSelect from "@/components/LangSelect";
  import db from "@/utils/localstorage";
  import loginApi from "@/api/Login.js";
  import store from "@/store";

  export default {
    name: "Login",
    components: {LangSelect},
    data() {
      return {
        loginForm: {
          mobileno: "",
          password: "",
        },
        remember: false,
        rules: {
          mobileno: [
            {
              required: true,
              message: this.$t("rules.require"),
              trigger: "blur"
            },
          //   {
          //     min: 4,
          //     max: 10,
          //     message: this.$t("rules.range4to10"),
          //     trigger: "blur"
          //   }
          ],
          password: [
            {
              required: true,
              message: this.$t("rules.require"),
              trigger: "blur"
            }
          //   {
          //     min: 4,
          //     max: 10,
          //     message: this.$t("rules.range4to10"),
          //     trigger: "blur"
          //   }
          ]
        },
        loading: false,
        page: {
          width: window.screen.width * 0.5,
          height: window.screen.height * 0.5
        }
      };
    },
    mounted() {
      db.clear();
      if (this.$store.state.account.login.remember) {
        this.loginForm.mobileno = this.$store.state.account.login.id;
        this.loginForm.password = this.$store.state.account.login.pass;
        this.remember = this.$store.state.account.login.remember;
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$store.commit("account/setLogin", {
              id: (this.remember === true)? this.loginForm.mobileno: '',
              pass: (this.remember === true)? this.loginForm.password: '',
              remember: this.remember,
            });

            this.loginSubmit();
          } else {
            return false
          }
        })
      },
      loginSubmit() {
        this.loading = true;
        this.$post("orionIM/user/login", this.loginForm)
        .then((response) => {
          if (response.data.msg !== 'success') {
            this.$message({
              message: response.data.msg,
              type: 'error'
            })
          } else {
            this.saveLoginData(response.data.data.token, 'refreshToken', 'expiration');
            this.saveUserInfo(response.data.data);

            let tmp = [];
            this.$get("orionIM/menu/getMenuList")
              .then((res) => {
                const {code, data} = res.data;
                tmp = data;

                this.$store.commit("account/setTmpRoutes", tmp);
                this.loginSuccess();
              });
          }
        }).finally(error => {
          this.loading = false;
        });
      },
      saveLoginData(token, refreshToken, expiration) {
        this.$store.commit("account/setToken", token);
        this.$store.commit("account/setRefreshToken", refreshToken);
        this.$store.commit("account/setExpireTime", expiration);
      },
      saveUserInfo(obj) {
        this.$store.commit("account/setUser", {
          id: obj.mobileno, //這是他的名字
          uid: obj.crUserId, //這才是意義上的id
          rid: obj.crRoleId, //??
          account: obj.mobileno,
          name: obj.mobileno,
          avatar: 'default.jpg',
          workDescribe: 'Hi~',
        });
      },
      loginSuccess() {
        this.$message({
          message: this.$t("tips.loginSuccess"),
          type: "success"
        });
        this.$router.push("/");
      },
      loginSuccessCallback(user) {
      }
    }
  };
</script>

<style lang="scss">
  $bg: #283443;
  $light_gray: #fff;
  $cursor: #555;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;

      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        color: #000000;
        height: 28px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid #dedede;
      border-radius: 2px;
      color: #454545;
      transition: all 0.3s;

      &:hover {
        border-color: #57a3f3;
      }
    }
  }
</style>
<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #aaa;
  $light_gray: #eee;

  .login-container {
    background: url(../../assets/background.jpg) 50% no-repeat;
    // background-color: #2d3a4b;
    background-size: cover;
    width: 100%;
    height: 100vh;

    .login-info {
      position: absolute;
      left: 15%;
      top: 50%;
      margin-top: -100px;
      color: #fff;

      .title {
        font-size: 1.8rem;
        font-weight: 600;
      }

      .sub-title {
        font-size: 1.5rem;
        margin: 0.3rem 0 0.7rem 1rem;
      }

      .desc {
        font-size: 0.96rem;
        line-height: 1.9rem;
      }
    }

    .login-form {
      position: absolute;
      top: 50%;
      left: 70%;
      margin: -180px 0 0 -160px;
      width: 320px;
      height: 440px;
      padding: 36px;
      background: #fff;
      border-radius: 3px;

      .code-input {
        width: 50%;
        display: inline-block;
        vertical-align: middle;
      }

      .code-image {
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
      }

      .login-type {
        text-align: right;
        display: inline-block;
        width: 100%;
      }

      .logo-wrapper {
        display: inline-block;
        margin: 10px 0;

        img {
          width: 1.9rem;
          display: inline-block;
          margin: 0.8rem 0.8rem -0.8rem 0.8rem;
          cursor: pointer;

          &.radius {
            border-radius: 50%;
          }
        }
      }
    }

    .login-footer {
      position: fixed;
      bottom: 1rem;
      width: 100%;
      text-align: center;
      color: white;
      font-size: 0.85rem;
      line-height: 1rem;
      height: 1rem;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        font-size: 20px;
        color: rgba(0, 0, 0, 0.85);
        margin: 0 auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      .set-language {
        color: #aaa;
        position: absolute;
        top: 3px;
        font-size: 18px;
        right: 0;
        cursor: pointer;
      }
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }

    @media screen and (max-width: 1100px) {
      .login-info {
        left: 8%;
      }
    }

    @media screen and (max-width: 970px) {
      .login-form {
        left: 50%;
      }
      .login-info {
        display: none;
      }
    }
  }
</style>
