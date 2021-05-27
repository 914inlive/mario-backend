<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        label-position="right"
        label-width="100px"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item :label="$t('visitorList.onlineStatus')">
              <el-select placeholder v-model="onlineStatus" value>
                <el-option :label="$t('visitorList.all')" value="" />
                <el-option :label="$t('visitorList.online')" value="1" />
                <el-option :label="$t('visitorList.offline')" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="$t('visitorList.platform')">
              <el-select placeholder v-model="platformType" value>
                <el-option :label="$t('visitorList.all')" value="" />
                <el-option label="唐朝" value="1" />
                <el-option label="炮漫" value="0" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('visitorList.nickname')">
              <el-input v-model="username"/>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <div style="color: white">914</div>
          </el-col>
          <el-col :span="5">
            <el-button icon="el-icon-search" @click="fetch" :loading="loading" type="primary" plain>
              {{ $t("table.search") }}
            </el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        style="width: 100%"
        :data="selection"
        v-loading="loading"
      >
        <el-table-column
          prop="platformType"
          align="center"
          :label="this.$t('visitorList.platformType')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.platformType == 1 ? '唐朝' : '炮漫' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="crVisitorId"
          align="center"
          :label="this.$t('visitorList.crVisitorId')"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.crVisitorId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="objId"
          align="center"
          :label="this.$t('visitorList.objId')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.objId }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          :label="this.$t('visitorList.nickname')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phoneModel"
          align="center"
          :label="this.$t('visitorList.phoneModel')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.phoneModel }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastLoginTime"
          align="center"
          :label="this.$t('visitorList.lastLoginTime')"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ time2Date(scope.row.lastLoginTime) }}</span>
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
  import Pagination from '@/components/Pagination'
  import {initQueryParams} from '@/utils/commons'
  import {time2Date} from '@/utils/utils'

  export default {
    name: 'Index',
    components: {Pagination},
    data() {
      return {
        time2Date: time2Date,
        loading: false,
        selection: [],
        queryParams: initQueryParams(),
        total: 0,

        onlineStatus: '',
        platformType: '',
        username: '',
      }
    },
    created () {
    },
    mounted() {
      this.fetch();
    },
    methods: {
      fetch() {
        this.loading = true;

        let obj = {
          currentPage: this.queryParams.current,
          showCount: this.queryParams.size,
        };

        if (this.onlineStatus) obj.onlineStatus = this.onlineStatus;
        if (this.platformType) obj.platformType = this.platformType;
        if (this.username) obj.name = this.username;

        this.$post("orionIM/visitor/findVisitorlistPage", obj).then((res) => {
          this.selection = res.data.data.records.slice();
          this.total = res.data.data.totalResult;
        }).finally(() => {
          this.loading = false;
        });
      },
    }
  }
</script>

<style scoped>

</style>
