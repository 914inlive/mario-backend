<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" status-icon>
        <el-row>
          <el-col :span="5">
            <el-button icon="el-icon-search" @click="fetch" :loading="loading" class="filter-item" type="primary" plain>
              {{ $t("table.search") }}
            </el-button>

            <el-button @click="openAddDLG" :loading="loading" class="filter-item" type="warning" plain>
              {{ $t("table.station.add") }}
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
        row-key="id"
        style="width: 100%;"
      >
        <el-table-column
          key="crVisitorId"
          align="center"
          width="190"
          :label="$i18n.t('table.station.id')">
          <template slot-scope="scope">
            <span>{{ scope.row.crStationId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          key="platform"
          align="center"
          width="300"
          :label="$i18n.t('table.station.name')">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          key="createTime"
          align="center"
          width="300"
          :label="$i18n.t('table.station.createdTime')">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          key="operation"
          align="center"
          prop="status"
          :label="$t('table.operation')"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{ row }">
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :limit.sync="queryParams.size"
        :page.sync="queryParams.current"
        :total="Number(selection.length)"
        @pagination="fetch"
        v-show="selection.length > 0"
      />
    </div>

    <station-add
      :dialog-visible="addDialog.isVisible"
      @close="addDialog.isVisible = false"
      @success="onAddSuccess"
      ref="add"
    />
  </div>
</template>

<script>
import StationAdd from "./Add";
import Pagination from "@/components/Pagination";
import {initQueryParams} from '@/utils/commons'

export default {
  components: {Pagination, StationAdd},
  data() {
    return {
      loading: false,
      ip: '',
      status: this.$t("common.all"),
      curPage: 1,
      total: 0,
      selection: [],
      queryParams: initQueryParams(),

      addDialog: {
        isVisible: false,
      },
    };
  },
  filters: {
    statusFilter(status, waring) {
      return status? "success": (waring)? "warning": "danger";
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    reset () {
      this.$refs.form.clearValidate()
      this.$refs.form.resetFields()
    },

    fetch() {
      this.loading = true;
      this.$post("station/stationlistPage", {
        currentPage: this.currentPage,
        showCount: this.queryParams.size,
      })
      .then((res) => {
        if (res.data.msg !== 'success') {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        } else {
          this.selection = res.data.data.records.slice();
        }
      }).finally(error => {
        this.loading = false;
      });
    },

    openAddDLG() {
      this.addDialog.isVisible = true;
      this.$refs.add.setFormData({
        status: true,
        idLabel: "Edit",
      });
    },
    onAddSuccess() {
      this.addDialog.isVisible = false;
      this.fetch();
    },
  }
};
</script>

<style scoped>

</style>
