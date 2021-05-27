<template>
  <div class="app-container">
    <div class="filter-container">

      <el-form
        label-position="right"
        label-width="100px"
        ref="form"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item :label="$t('history.from')">
              <el-input v-model="from" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('history.to')">
              <el-input v-model="to" />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <div style="color: white">914</div>
          </el-col>
          <el-col :span="8">
            <el-button icon="el-icon-search" @click="fetch" :loading="loading" type="primary" plain>
              {{ $t("table.search") }}
            </el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        key="0"
        ref="table"
        :data="selection"
        v-loading="loading"
        border
        fit
        row-key="crMessageId"
        style="width: 100%;"
      >
        <el-table-column
          key="crMessageId"
          align="center"
          width="80"
          :label="$i18n.t('history.index')">
          <template slot-scope="scope">
            <span>{{ scope.row.crMessageId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          key="form"
          align="center"
          width="120"
          :label="$i18n.t('history.from')">
          <template slot-scope="scope">
            <span>{{ scope.row.form }}</span>
          </template>
        </el-table-column>
        <el-table-column
          key="receive"
          align="center"
          width="180"
          :label="$i18n.t('history.to')">
          <template slot-scope="scope">
            <span>{{ scope.row.receive }}</span>
          </template>
        </el-table-column>
        <el-table-column
          key="context"
          align="start"
          :label="$i18n.t('history.context')">
          <template slot-scope="scope">
            <span>{{ scope.row.context }}</span>
          </template>
        </el-table-column>
        <el-table-column
          key="createdTime"
          align="start"
          width="160"
          :label="$i18n.t('table.blockList.createTime')">
          <template slot-scope="scope">
            <span>{{ time2Date(scope.row.createdTime) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :limit.sync="queryParams.size"
        :page.sync="queryParams.current"
        :total="total"
        @pagination="fetch"
        v-show="selection.length > 0"
      />
    </div>
  </div>
</template>

<script>
  import Pagination from "@/components/Pagination";
  import {initQueryParams} from '@/utils/commons'
  import {time2Date} from '@/utils/utils'

  export default {
    components: {Pagination},
    data() {
      return {
        loading: false,
        time2Date: time2Date,
        from: '',
        to: '',
        selection: [],
        total: 0,
        queryParams: initQueryParams(),
      };
    },
    mounted() {
      this.reset();
      this.fetch();
    },
    methods: {
      reset () {
        this.$refs.form.clearValidate()
        this.$refs.form.resetFields()
      },

      fetch() {
        this.loading = true;

        let obj = {
          currentPage: this.queryParams.current ? this.queryParams.current : 1,
          showCount: this.queryParams.size,
        };

        if (this.from) obj.form = this.from;
        if (this.to) obj.receive = this.to;

        this.$post("orionIM/message/findMessagelistPage", obj)
          .then((res) => {
            if (res.data.msg === 'success') {
              this.selection = res.data.data.records.slice();
              this.total = res.data.data.totalResult;
            }
          }).finally(() => {
          this.loading = false;
        });
      },
    }
  };
</script>

<style scoped>

</style>
