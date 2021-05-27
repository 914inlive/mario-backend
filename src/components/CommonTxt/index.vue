<template>
  <div >

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">{{ this.$t('commonTxt.context') }}</el-menu-item>
      <el-menu-item index="3" disabled>{{ this.$t('commonTxt.underConstruction') }}</el-menu-item>
    </el-menu>
    <div class="line"></div>
    <br>

    <el-button
      :loading="loading"
      @click="handleClick"
      size="small"
      type="primary"
    >
      {{ $t('common.confirm') }}
    </el-button>

    <el-button
      :loading="loading"
      @click="initTree"
      size="small"
    >
      {{ $t('commonTxt.reload') }}
    </el-button>

    <div>
      <br>
      <el-tree
        :check-strictly="true"
        :data="tree"
        :filter-node-method="filterNode"
        @node-click="nodeClick"
        default-expand-all
        highlight-current
        node-key="id"
        ref="tree"
      />
    </div>
  </div>
</template>
<script>

  export default {
    name: 'index',
    props: {
      onCommonTxtClick: {type: Function}
    },
    data() {
      return {
        loading: false,
        curNode: null,
        activeIndex: '1',
        label: '',
        tree: [],
        org: this.init(),
        rules: {
          label: [
            {required: true, message: this.$t('rules.require'), trigger: 'blur'},
            {min: 1, max: 255, message: this.$t('rules.range3to10'), trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      this.initTree()
    },
    methods: {
      init() {
        return {
          loading: false,
          id: '',
          abbreviation: '',
          label: '',
          parentId: 0,
        }
      },
      initTree() {
        this.loading = true;

        const childRes = {"code":200,"msg":"success","data":[{"crCommonWordsId":5,"createdTime":"Sep 17, 2020 4:25:47 PM","context":"我是應該長在充值","name":"充值"},{"crCommonWordsId":6,"createdTime":"Sep 17, 2020 4:42:03 PM","context":"我是應該長在安安1","name":"安安1"},{"crCommonWordsId":7,"createdTime":"Sep 17, 2020 4:42:21 PM","context":"我在安安1","name":"安安1"},{"crCommonWordsId":8,"createdTime":"Sep 19, 2020 4:37:31 PM","context":"123","name":"充值"},{"crCommonWordsId":9,"createdTime":"Sep 21, 2020 1:21:51 AM","context":"您好，我是號客服。很高興為您服務，有什麼可以為您效勞的","name":"充值"},{"crCommonWordsId":10,"createdTime":"Sep 21, 2020 1:23:00 AM","context":"Good morning. Welcome to [company name]. My name is _______. How can I help you？","name":"充值"},{"crCommonWordsId":11,"createdTime":"Sep 21, 2020 1:25:16 AM","context":"感谢您的支持，再见","name":"安安"}]}
        let loadChild =
        this.$post("orionIM/commonWords/getCommonWords", {
          crCommonWordsCategoryId: '',
          userId: this.$store.state.account.user.uid,
        }).then((response) => {
          if (response.data.msg !== 'success') {
              this.$message({
                message: response.data.msg,
                type: 'error'
              })
            } else {
            return Promise.resolve(response.data.data);
          }
        }).catch(error => {
          return Promise.resolve(childRes.data);
        });

        const parentRes = {"code":200,"msg":"success","data":[{"crCommonWordsCategoryId":6,"isSuper":1,"name":"充值","parentId":0},{"crCommonWordsCategoryId":7,"isSuper":1,"name":"安安","parentId":0},{"crCommonWordsCategoryId":9,"isSuper":1,"name":"安安1","parentId":0}]}
        let loadParent =
          this.$post("orionIM/commonWords/getCommonWordsCategory", {
          }).then((response) => {
            if (response.data.msg !== 'success') {
              this.$message({
                message: response.data.msg,
                type: 'error'
              })
            } else {
              return Promise.resolve(response.data.data);
            }
          }).catch(error => {
            return Promise.resolve(parentRes.data);
          });

        Promise.all([loadChild, loadParent]).then(values => {
          this.tree = [];

          for (let i = 0; i < values[1].length; i++) {
            let obj = Object.assign({}, values[1][i]);
            obj.label = values[1][i].name;
            obj.parentId = obj.parentId.toString();
            obj.id = obj.crCommonWordsCategoryId.toString();
            obj.children = [];
            this.tree.push(obj);
          }

          for (let i = 0; i < this.tree.length; i++) {
            for (let j = 0; j < values[0].length; j++) {
              if (this.tree[i].label === values[0][j].name) {
                let obj = Object.assign({}, values[0][j]);
                obj.label = values[0][j].context;
                obj.parentId = this.tree[i].crCommonWordsCategoryId;
                obj.id = `_${values[0][j].crCommonWordsId}`;
                obj.children = null;
                this.tree[i].children.push(obj);
              }
            }
          }

          this.loading = false;
        });
      }
      ,
      handleClick() {
        if (!this.curNode || this.curNode.id.indexOf('_') === -1) {
          this.$message({
            message: this.$t("commonTxt.noSelected"),
            type: "warning"
          });
        } else {
          this.onCommonTxtClick(this.curNode);
        }
      }
      ,
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
          <el-button size="mini" v-show="!data.id.includes('_')" on-click={() => this.append(data) }>Use</el-button>
        </span>
        </span>);
      },

      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      nodeClick(data) {
        // console.log('---')
        // console.log(data)
        this.curNode = Object.assign({}, data);
      }
      ,
      submit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.org.id) {
              this.update()
            } else {
              this.save()
            }
          } else {
            return false
          }
        })
      }
      ,
      resetForm() {
        this.$refs.form.clearValidate()
        this.$refs.form.resetFields()
        this.org = this.init()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .org {
    margin: 10px;

    .app-container {
      margin: 0 0 10px 0 !important;
    }
  }

  .el-card.is-always-shadow {
    box-shadow: none;
  }

  .el-card {
    border-radius: 0;
    border: none;

    .el-card__header {
      padding: 10px 20px !important;
      border-bottom: 1px solid #f1f1f1 !important;
    }
  }
</style>
