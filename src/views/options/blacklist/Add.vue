<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    :title="$t('table.blockList.add')"
    :visible.sync="isVisible"
    :width="width"
    top="50px"
  >
    <el-form
      :model="formData"
      :rules="rules"
      label-position="right"
      label-width="100px"
      ref="form"
    >
      <el-form-item :label="$t('table.blockList.id')" prop="id">
        <el-input v-model="formData.id" />
      </el-form-item>
      <el-form-item :label="$t('table.blockList.endTime')" prop="endTime">
        <el-date-picker
          v-model="formData.endTime"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('table.blockList.remark')">
        <el-input v-model="formData.remarks" type="textarea" rows="3" />
      </el-form-item>
    </el-form>

    <div class="dialog-footer" slot="footer">
      <el-button :loading="loading" @click="isVisible = false" plain type="primary">
        {{$t("common.cancel") }}
      </el-button>
      <el-button :loading="loading" @click="checkForm" type="primary">
        {{$t("common.confirm") }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  name: "BlacklistAdd",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      loading: false,
      formData: this.init(),
      width: this.initWidth(),
      rules: {
        id: [
          // { min: 7, max: 100, message: '8~100位', trigger: 'blur' },
          { required: true, message: this.$t("rules.require"), trigger: "blur"},
          { pattern: /^[0-9]*$/, message: this.$t("rules.numberOnly"), trigger: "blur"},
        ],
        endTime: [
          { required: true, message: this.$t("rules.require"), trigger: "blur"},
        ],
      }
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.dialogVisible;
      },
      set() {
        this.close();
        this.reset();
      }
    },
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.width = this.initWidth();
      })();
    };
  },
  methods: {
    init() {
      return {
        id: "",
        endTime: "",
        remarks: "",
      };
    },
    setFormData(val) {
      if (val) {
        this.formData = { ...val };
      }
    },
    initWidth() {
      this.screenWidth = document.body.clientWidth;
      if (this.screenWidth < 991) {
        return "90%";
      } else if (this.screenWidth < 1400) {
        return "45%";
      } else {
        return "800px";
      }
    },
    close() {
      this.$emit("close");
    },
    reset() {
      this.$refs.form.clearValidate();
      this.$refs.form.resetFields();
      this.formData = this.init();
    },
    checkForm() {
      const that = this;
      that.$refs.form.validate(valid => {
        if (valid) {
            that.submit();
        } else {
          return false;
        }
      });
    },
    submit() {
      this.loading = true;

      this.$post("orionIM/black/insertBlackList", {
        crVisitorId: this.formData.id,
        platformType: "1",
        operator: this.$store.state.account.user.uid,
        remarks: this.formData.remarks,
        endTime: this.formData.endTime,
      })
      .then((response) => {
        if (response.data.msg !== 'success') {
          this.$message({
            message: response.data.msg,
            type: 'error'
          })
        } else {
          this.showSuccessMsg();
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    showSuccessMsg() {
      this.formData = this.init();
      this.$message({
        message: this.$t("tips.createSuccess"),
        type: "success"
      });
      this.$emit("success");
    },
  }
};
</script>
<style lang="scss" scoped></style>
