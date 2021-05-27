<template>
  <div class="app-container">
  <el-form :model="p" :rules="rules" class="form" label-position="right" label-width="80px" ref="form">
    <el-form-item :label="$t('table.user.oldPassword')" prop="oldPassword">
      <el-input type="password" v-model="p.oldPassword" />
    </el-form-item>
    <el-form-item :label="$t('table.user.newPassword')" prop="password">
      <el-input type="password" v-model="p.password" />
    </el-form-item>
    <el-form-item :label="$t('table.user.confirmPassword')" prop="confirmPassword">
      <el-input type="password" v-model="p.confirmPassword" />
    </el-form-item>
    <div class="form-footer">
      <el-button
        :loading="loading"
        @click="submit"
        plain
        type="primary"
      >{{ $t('common.confirm') }}</el-button>
    </div>
  </el-form>
  </div>
</template>
<script>

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {

        }
      }
    }
  },
  data () {
    return {
      loading: false,
      p: {
        oldPassword: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: this.$t('rules.require'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('rules.require'), trigger: 'blur' },
          // { min: 6, max: 20, message: this.$t('rules.range6to20'), trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: this.$t('rules.require'), trigger: 'blur' },
          {            validator: (rule, value, callback) => {
              if (this.p.password !== value) {
                callback(this.$t('tips.notEqual'))
              } else {
                callback()
              }
            }, trigger: 'blur'          }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.loading = true;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$post("orionIM/user/resetPassword", {
            oldPassword: this.p.oldPassword,
            newPassword: this.p.password,
          }).then((response) => {
            const res = response.data;
            this.loading = false;

            if (res.isSuccess) {
              this.$message({
                message: this.$t('tips.updateSuccess'),
                type: 'success'
              })
              this.$refs.form.clearValidate()
              this.$refs.form.resetFields()
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
