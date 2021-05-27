<template>
  <div class="app-container">
    <el-form
      :rules="rules"
      label-position="right"
      label-width="100px"
      ref="ruleForm"
      :model="ruleForm"
    >
      <el-form-item :label="$t('table.user.mobileno')" prop="mobileno">
        <el-input v-model="ruleForm.mobileno"/>
      </el-form-item>
      <el-form-item :label="$t('table.user.password')" prop="password">
        <el-input v-model="ruleForm.password"/>
      </el-form-item>
      <el-form-item :label="$t('table.user.nickname')" prop="name">
        <el-input v-model="ruleForm.name"/>
      </el-form-item>
      <el-form-item :label="$t('table.user.email')" prop="email">
        <el-input v-model="ruleForm.email"/>
      </el-form-item>
    </el-form>
    <div class="form-footer">
      <el-button
        :loading="loading"
        @click="clickSubmit('ruleForm')"
        plain
        type="primary"
      >{{ $t('common.confirm') }}</el-button>
    </div>
  </div>
</template>

<script>
  export default {
  name: "Index",
  data() {
    return {
      ruleForm: this.init(),
      loading: false,
      rules: {
        mobileno: {
          required: true,
          message: this.$t("rules.require"),
          trigger: "blur"
        },
        name: {
          required: true,
          message: this.$t("rules.require"),
          trigger: "blur"
        },
        password: {
          required: true,
          message: this.$t("rules.require"),
          trigger: "blur"
        },
        email: {
          required: true,
          message: this.$t("rules.require"),
          trigger: "blur"
        },
      }
    }
  },
  methods: {
      init() {
          return {
            mobileno: '',
            password: '',
            name: '',
            email: '',
          }
      },
      clickSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post("orionIM/user/registerSysUser", this.ruleForm)
            .then((response) => {
                if (response.data.code === 200) {
                  this.$message({
                    message: this.$t('tips.createSuccess'),
                    type: 'success'
                  })
                  this.$refs.ruleForm.clearValidate()
                  this.$refs.ruleForm.resetFields()
                } else {
                  this.$message({
                    message: response.data.msg,
                    type: 'error'
                  })
                }
            }).finally(error => {
              this.loading = false;
            }).catch(error => {
              this.loading = false;
            });
          } else {
            return false;
          }
        });


      },
  }
}
</script>

<style scoped>

</style>
