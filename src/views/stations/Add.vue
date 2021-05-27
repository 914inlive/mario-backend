<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    :title="$t('table.station.add')"
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
      <el-form-item :label="$t('table.station.name')" prop="name">
        <el-input v-model="formData.name" />
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
  name: "StationAdd",
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
        name: [
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
        name: "",
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

      this.$post("station/insertStation", {
        name: this.formData.name,
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
