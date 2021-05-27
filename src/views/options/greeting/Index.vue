<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :sm="12" :xs="24">
        <el-card>
          <el-form
            :model="onlineFormData"
            :rules="onlineRules"
            label-position="right"
            label-width="100px"
            ref="onlineForm"
          >
            <el-form-item>
                {{$t('options.greeting.csOnlineTip')}}
            </el-form-item>

            <el-form-item :label="$t('options.greeting.currentSetting')" prop="context">
              <el-input
                v-model="onlineFormData.context"
                type="textarea"
                rows="3"
              />
            </el-form-item>

            <el-row>
              <el-col
                :span="24"
                style="text-align: right"
              >
                <el-button
                  icon="el-icon-edit"
                  :loading="loading"
                  @click="checkForm(1)"
                  plain
                  type="primary"
                >
                  {{this.$t('common.edit') }}
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-card>
          <el-form
            :model="offlineFormData"
            :rules="offlineRules"
            label-position="right"
            label-width="100px"
            ref="offlineForm"
          >
            <el-form-item>
              {{$t('options.greeting.csOfflineTip')}}
            </el-form-item>
            <el-form-item :label="$t('options.greeting.currentSetting')" prop="context">
              <el-input
                v-model="offlineFormData.context"
                type="textarea"
                rows="3"
              />
            </el-form-item>

          </el-form>
          <el-row>
            <el-col
              :span="24"
              style="text-align: right"
            >
              <el-button
                icon="el-icon-edit"
                :loading="loading"
                @click="checkForm(2)"
                plain
                type="primary"
              >
                {{this.$t('common.edit') }}
              </el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Index',
  props: {
  },
  data () {
    return {
      loading: false,
      onlineFormData: {},
      offlineFormData: {},
      onlineRules: {
        context: [
          { required: true, message: this.$t("rules.require"), trigger: "blur"},
        ],
      },
      offlineRules: {
        context: [
          { required: true, message: this.$t("rules.require"), trigger: "blur"},
        ],
      },
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    checkForm(type) {
      let form = 'offlineForm';

      if (type === 1) {
        form = 'onlineForm';
      }

      this.$refs[form].validate(valid => {
        if (valid) {
          this.submit(type);
        } else {
          return false;
        }
      });
    },
    submit(type) {
      this.loading = true;
      this.$post("orionIM/other/setTips", {
        crUserId: this.$store.state.account.user.uid,
        context: (type === 1)? this.onlineFormData.context: this.offlineFormData.context,
        type,
      })
      .then((res) => {
        if (res.data.msg !== 'success') {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        } else {
          this.$message({
            message: this.$t("tips.updateSuccess"),
            type: "success"
          });
          this.fetch();
        }
      }).finally(() => {
        this.loading = false;
      });
    },
    fetch() {
      this.loading = true;
      this.$post("orionIM/other/getTips", {
        crUserId: this.$store.state.account.user.uid,
      })
      .then((res) => {
        if (res.data.msg !== 'success') {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        } else {
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].type === 1)
              this.onlineFormData = Object.assign({}, res.data.data[i]);
            else
              this.offlineFormData = Object.assign({}, res.data.data[i]);
          }
        }
      }).finally(() => {
        this.loading = false;
      });
    },
  },
}

</script>
<style lang="scss" scoped>
</style>
