<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    :title="$t('table.blockList.delete')"
    :visible.sync="isVisible"
    :width="width"
    top="50px"
  >
    <span>{{formData.isRoot? $t('tips.confirmDeleteNode'): $t('table.blockList.deleteConfirm')}}</span>

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

  export default {
    name: "CommonDel",
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

        let obj = {};
        let path = '';

        if (this.formData.isRoot) {
          obj.crCommonWordsCategoryId = this.formData.crCommonWordsCategoryId;
          path = 'orionIM/commonWords/deleteCategory';
        } else {
          obj.crCommonWordsId = this.formData.crCommonWordsId;
          path = 'orionIM/commonWords/deleteCommonWords';
        }

        this.$post(path, obj)
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
          message: this.$t("tips.deleteSuccess"),
          type: "success"
        });
        this.$emit("success");
      },
    }
  };
</script>
<style lang="scss" scoped></style>
