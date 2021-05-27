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
              {{ $t("table.blockList.add") }}
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
          :label="$i18n.t('table.blockList.id')">
          <template slot-scope="scope">
            <span>{{ scope.row.crVisitorId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          key="platform"
          align="center"
          width="60"
          :label="$i18n.t('table.platformType')">
          <template slot-scope="scope">
            <span>{{ scope.row.platformType == 1 ? '唐朝' : '炮漫' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          key="createTime"
          align="center"
          width="210"
          :label="$i18n.t('table.blockList.createTime')">
          <template slot-scope="scope">
            <span>{{ time2Date(scope.row.createdTime) }}</span>
          </template>
        </el-table-column>

        <el-table-column
          key="deleted"
          align="center"
          width="90"
          :filters="[
          { text: $t('table.blockList.valid'), value: true },
          { text: $t('table.blockList.invalid'), value: false }
        ]"
          :label="$i18n.t('table.blockList.status')">
          <template slot-scope="{ row }">
            <el-tag :type="row.deleted | statusFilter">
              {{row.deleted ? $t("table.blockList.valid") : $t("table.blockList.invalid") }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          key="operator"
          align="center"
          width="110"
          :label="$i18n.t('table.blockList.operator')">
          <template slot-scope="scope">
            <span>{{ scope.row.operator }}</span>
          </template>
        </el-table-column>
        <el-table-column
          key="remark"
          align="center"
          width="150"
          :label="$i18n.t('table.blockList.remark')">
          <template slot-scope="scope">
            <span>{{ scope.row.remarks }}</span>
          </template>
        </el-table-column>
        <el-table-column
          key="endTime"
          align="center"
          width="210"
          :label="$i18n.t('table.blockList.limitEnd')">
          <template slot-scope="scope">
            <span>{{ time2Date(scope.row.endTime) }}</span>
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
            <el-button icon="el-icon-edit" size="small" type="primary" plain @click="openDeleteDLG(row)"></el-button>
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

    <blacklist-add
      :dialog-visible="addDialog.isVisible"
      @close="addDialog.isVisible = false"
      @success="onAddSuccess"
      ref="add"
    />

    <blacklist-del
      :dialog-visible="delDialog.isVisible"
      @close="delDialog.isVisible = false"
      @success="onDelSuccess"
      ref="del"
    />

    <blacklist-edit
      :dialog-visible="editDialog.isVisible"
      @close="editDialog.isVisible = false"
      @success="onEditSuccess"
      ref="edit"
    />
  </div>
</template>

<script>
import BlacklistEdit from "./Edit";
import BlacklistAdd from "./Add";
import BlacklistDel from "./Del";
import Pagination from "@/components/Pagination";
import {initQueryParams} from '@/utils/commons'
import {time2Date} from '@/utils/utils'

export default {
  components: {Pagination, BlacklistEdit, BlacklistAdd, BlacklistDel},
  data() {
    return {
      time2Date: time2Date,
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
      delDialog: {
        isVisible: false,
      },
      editDialog: {
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
      this.$post("orionIM/black/blacklistPage", {
        currentPage: this.queryParams.current,
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
          this.total = res.data.data.totalResult;
        }
      }).finally(error => {
        this.loading = false;
      });
    },

    openEditDLG(row) {
      this.editDialog.isVisible = true;
      this.$refs.edit.setFormData({
        idLabel: "Edit",
        id: row.ip,
        uid: row.id,
        status: row.status,
      });
    },
    openAddDLG() {
      this.addDialog.isVisible = true;
      this.$refs.add.setFormData({
        status: true,
        idLabel: "Edit",
      });
    },
    openDeleteDLG(row) {
      this.delDialog.isVisible = true;
      this.$refs.del.setFormData(row);
    },

    onEditSuccess() {
      this.editDialog.isVisible = false;
      this.fetch();
    },
    onAddSuccess() {
      this.addDialog.isVisible = false;
      this.fetch();
    },
    onDelSuccess() {
      this.delDialog.isVisible = false;
      this.fetch();
    },
  }
};
</script>

<style scoped>

</style>
