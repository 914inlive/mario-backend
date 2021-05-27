<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :sm="12" :xs="24">
        <div>
          <div class="filter-container">
            <el-button @click="addCategory" size="medium" :loading="loading" plain type="primary">
              {{$t("commonTxt.addCategory") }}
            </el-button>
            <el-button @click="addContext" size="medium" :loading="loading" plain type="primary">
              {{$t("commonTxt.addContext") }}
            </el-button>
            <el-button icon="el-icon-delete" @click="del" size="medium" :loading="loading" plain type="danger">
              {{$t("table.delete") }}
            </el-button>
          </div>
          <el-tree :check-strictly="true" :data="tree" :filter-node-method="filterNode" @node-click="nodeClick"
                   default-expand-all highlight-current node-key="id" ref="tree"/>
        </div>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-card class="box-card">
          <div class="clearfix" slot="header">
            <span>{{ this.$t('commonTxt.context') }}</span>
          </div>
          <div>
            <el-form :model="formData" label-position="right" label-width="100px" ref="form">
              <el-form-item :label="$t('commonTxt.category')" prop="parentId" >
                <el-tooltip :content="$t('tips.topId')" class="item" effect="dark" placement="top-start">
                  <el-input readonly v-model="formData.parentId" :disabled="true"/>
                </el-tooltip>
              </el-form-item>
              <el-form-item :label="$t('commonTxt.context')" prop="label">
                <el-input v-model="formData.label" type="textarea" rows="9"/>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <add-category
      :dialog-visible="addCategoryDialog.isVisible"
      @close="addCategoryDialog.isVisible = false"
      @success="onAddCategorySuccess"
    />

    <add-content
      :dialog-visible="addContentDialog.isVisible"
      @close="addContentDialog.isVisible = false"
      @success="onAddContentSuccess"
      ref="add"
    />

    <del-common
      :dialog-visible="delDialog.isVisible"
      @close="delDialog.isVisible = false"
      @success="onDelSuccess"
      ref="del"
    />

  </div>
</template>
<script>
import AddCategory from "@/views/options/common/AddCategory";
import AddContent from "@/views/options/common/AddContent";
import DelCommon from "@/views/options/common/Del";

  export default {
    name: 'index',
    components: {AddContent, AddCategory, DelCommon},
    data() {
      return {
        loading: false,
        tree: [],
        parentIdSet: new Set(),
        formData: this.init(),

        addCategoryDialog: {
          isVisible: false,
        },
        addContentDialog: {
          isVisible: false,
        },
        delDialog: {
          isVisible: false,
        },
      }
    },
    mounted() {
      this.fetch()
    },
    methods: {
      init() {
        return {
          id: '',
          label: '',
          parentId: '',
        }
      },
      fetch() {
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
            this.loading = false;
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
            this.loading = false;
            return Promise.resolve(parentRes.data);
          });

        Promise.all([loadChild, loadParent]).then(values => {
          this.tree = [];
          this.parentIdSet.clear();

          for (let i = 0; i < values[1].length; i++) {
            let obj = Object.assign({}, values[1][i]);
            obj.label = values[1][i].name;
            obj.parentId = obj.parentId.toString();
            obj.id = obj.crCommonWordsCategoryId.toString();
            obj.children = [];
            this.tree.push(obj);
            this.parentIdSet.add(obj.crCommonWordsCategoryId.toString());
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
      },
      handleNumChange(val) {
        this.formData.sortValue = val
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      nodeClick(data) {
        this.formData = {...data}
        this.$refs.form.clearValidate()
      }
      ,
      addCategory() {
        this.addCategoryDialog.isVisible = true;
      }
      ,
      addContext() {
        if (!this.formData.crCommonWordsCategoryId ||
          !this.parentIdSet.has(this.formData.crCommonWordsCategoryId.toString())) {
          this.$message({
            message: this.$t("commonTxt.noCategorySelected"),
            type: 'warning'
          })
          return;
        }

        this.addContentDialog.isVisible = true;
        this.$refs.add.setFormData({
          parentId: this.formData.crCommonWordsCategoryId.toString(),
        });
      }
      ,
      del() {
        let valid = false;
        let isRoot = false;
        if (this.formData.hasOwnProperty('crCommonWordsId')) {
          if (this.formData.crCommonWordsId)
            valid = true;
        }

        if (this.formData.hasOwnProperty('crCommonWordsCategoryId')) {
          if (this.formData.crCommonWordsCategoryId) {
            valid = true;
            isRoot = true;
          }
        }

        if (!valid) {
          this.$message({
            message: this.$t("commonTxt.noCategorySelected"),
            type: 'warning'
          })
          return;
        }

        this.delDialog.isVisible = true;
        this.$refs.del.setFormData(Object.assign({isRoot}, this.formData));
      }
      ,
      onAddCategorySuccess() {
        this.addCategoryDialog.isVisible = false;
        this.fetch();
      }
      ,
      onAddContentSuccess() {
        this.addContentDialog.isVisible = false;
        this.fetch();
      }
      ,
      onDelSuccess() {
        this.delDialog.isVisible = false;
        this.fetch();
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
