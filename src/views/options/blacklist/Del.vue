<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    :title="$t('table.blockList.delete')"
    :visible.sync="isVisible"
    :width="width"
    top="50px"
  >
    <span>{{$t('table.blockList.deleteConfirm')}}</span>
    <span> Id : </span>
    <span>{{formData.crVisitorId}}</span>

    <div class="dialog-footer" slot="footer">
      <el-button @click="isVisible = false" plain type="primary">
        {{$t("common.cancel") }}
      </el-button>
      <el-button @click="submit" type="primary">
        {{$t("common.confirm") }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>

import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "BlacklistDel",
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
      };
    },
    setFormData(val) {
      if (val) {
        this.formData = Object.assign({}, val);
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
      this.formData = this.init();
    },
    submit() {
      this.loading = true;

      this.$post("orionIM/black/updateBlackList", {
        crBlackId: this.formData.crBlackId,
        deleted: this.formData.deleted == 0? 1: 0,
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
        message: this.$t("tips.updateSuccess"),
        type: "success"
      });
      this.$emit("success");
    },
  }
};
</script>
<style lang="scss" scoped></style>
