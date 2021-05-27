<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    :title="$t('table.blockList.edit')"
    :visible.sync="isVisible"
    :width="width"
    top="50px"
  >
    <el-form
      :model="formData"
      :rules="formData.idLabel === this.$t('table.blockList.ip')? ipRules: deviceRules"
      label-position="right"
      label-width="100px"
      ref="form"
    >
      <el-form-item :label="formData.idLabel" prop="id">
        <el-input v-model="formData.id" />
      </el-form-item>
      <el-form-item :label="$t('table.blockList.status')">
        <el-select v-model="formData.status" class="select-item">
          <el-option key="true" :label="$t('table.blockList.valid')" :value="true"></el-option>
          <el-option key="false" :label="$t('table.blockList.invalid')" :value="false"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="dialog-footer" slot="footer">
      <el-button @click="isVisible = false" plain type="primary">
        {{$t("common.cancel")}}
      </el-button>
      <el-button @click="checkForm" type="primary">
        {{$t("common.confirm") }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>

import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import BlockListApi from "@/api/BlockList";

export default {
  name: "BlacklistEdit",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "add"
    },
    id: {
      type: String,
      default: ""
    },
    uid: {
      type: String,
      default: ""
    },
    status: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      formData: this.init(),
      width: this.initWidth(),
      ipRules: {
        id: [
          { required: true, message: this.$t("rules.require"), trigger: "blur"},
          { min: 7, max: 100, message: '8~100位', trigger: 'blur' },
          {
            pattern: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
            message: this.$t("table.blockList.illegalIP"),
            trigger: "blur"
          }
        ],
      },
      deviceRules: {
        id: [
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
        uid: "",
        status: true,
        idLabel: this.$t('table.blockList.ipAddress'),
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
      // 先清除校验，再清除表单，不然有奇怪的bug
      this.$refs.form.clearValidate();
      this.$refs.form.resetFields();
      this.formData = this.init();
    },
    checkForm() {
      const that = this;
      that.$refs.form.validate(valid => {
        if (valid) {
          if (that.formData.idLabel === that.$t("table.blockList.ip"))
            that.submitIP();
          else
            that.submitDevice();
        } else {
          return false;
        }
      });
    },
    submitIP() {
      const obj = {
        "id": this.formData.uid,
        "ip": this.formData.id,
        "status": this.formData.status,
      }

      const that = this;

      BlockListApi.editBlackIP(
        obj
      ).then(res => {
        if (res.data.isSuccess) {
          // console.log('addBlackIP')
          // console.log(res.data.data)
          that.showSuccessMsg();
        }
      }).finally(() => {
        this.loading = false
      })
    },
    submitDevice() {
      const obj = {
        "id": this.formData.uid,
        "deviceId": this.formData.id,
        "status": this.formData.status,
      }

      const that = this;

      BlockListApi.editBlackDeviceId(
        obj
      ).then(res => {
        if (res.data.isSuccess) {
          // console.log('submitDevice')
          // console.log(res.data.data)
          that.showSuccessMsg();
        }
      }).finally(() => {
        that.loading = false
      })
    },

    showSuccessMsg() {
      this.formData = this.init();
      this.$message({
        message: this.$t("tips.updateSuccess"),
        type: "success"
      });
      this.$emit("success");
    },
  }
};
</script>
<style lang="scss" scoped></style>
