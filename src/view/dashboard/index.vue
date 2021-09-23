<template>
  <div>
    <el-row :gutter="15" class="system_state">
      <el-col :span="12">
        <el-card class="card_item">
          <div slot="header">通道信息</div>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">在线设备数:</el-col>
              <el-col :span="12" v-text="dashboard.alive_nvr" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">总设备数:</el-col>
              <el-col :span="12" v-text="dashboard.total_nvr" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">在线通道数:</el-col>
              <el-col :span="12" v-text="dashboard.alive_device" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">总通道数:</el-col>
              <el-col :span="12" v-text="dashboard.total_device" />
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card v-if="state.os" class="card_item">
          <div slot="header">系统信息</div>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">系统:</el-col>
              <el-col :span="12" v-text="state.os.goos" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">cpu核心数:</el-col>
              <el-col :span="12" v-text="state.os.numCpu" />
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">异步进程数:</el-col>
              <el-col :span="12" v-text="state.os.numGoroutine" />
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="system_state">
        <el-card v-if="state.disk" class="card_item">
          <div slot="header">硬盘使用</div>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row :gutter="10">
                  <el-col :span="12">总大小 (MB)</el-col>
                  <el-col :span="12" v-text="state.disk.totalMb" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">使用 (MB)</el-col>
                  <el-col :span="12" v-text="state.disk.usedMb" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">总大小 (GB)</el-col>
                  <el-col :span="12" v-text="state.disk.totalGb" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">使用 (GB)</el-col>
                  <el-col :span="12" v-text="state.disk.usedGb" />
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-progress
                  type="dashboard"
                  :percentage="state.disk.usedPercent"
                  :color="colors"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15" class="system_state">
      <el-col :span="12">
        <el-card
          v-if="state.cpu"
          class="card_item"
          :body-style="{ height: '180px', 'overflow-y': 'scroll' }"
        >
          <div slot="header">CPU核心使用</div>
          <div>
            <template v-for="(item, index) in state.cpu.cpus">
              <el-row :key="index" :gutter="10">
                <el-col :span="12">核心 {{ index }}:</el-col>
                <el-col :span="12"
                  ><el-progress
                    type="line"
                    :percentage="+item.toFixed(0)"
                    :color="colors"
                /></el-col>
              </el-row>
            </template>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card v-if="state.ram" class="card_item">
          <div slot="header">内存使用</div>
          <div>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-row :gutter="10">
                  <el-col :span="12">总大小 (MB)</el-col>
                  <el-col :span="12" v-text="state.ram.totalMb" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">使用 (MB)</el-col>
                  <el-col :span="12" v-text="state.ram.usedMb" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">总大小 (GB)</el-col>
                  <el-col :span="12" v-text="state.ram.totalMb / 1024" />
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">使用 (GB)</el-col>
                  <el-col
                    :span="12"
                    v-text="(state.ram.usedMb / 1024).toFixed(2)"
                  />
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-progress
                  type="dashboard"
                  :percentage="state.ram.usedPercent"
                  :color="colors"
                />
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div>
      <el-table
        border
        stripe
        style="width:calc(100% - 15px);margin:0 7.5px;"
        tooltip-effect="dark"
        :data="tableData"
      >
        <el-table-column  align="center" label="名称" prop="name" min-width="120" />
        <el-table-column  align="center" label="cpu使用率" min-width="300">
          <template slot-scope="scope">
            {{
              scope.row.machine_info.cpu.cpus
                ? scope.row.machine_info.cpu.cpus[0].toFixed(2)
                : 0
            }}
            %
          </template>
        </el-table-column>
        <el-table-column
         align="center"
          label="硬盘使用率"
          prop="machine_info.disk.usedPercent"
          min-width="300"
        >
          <template slot-scope="scope">
            {{
              scope.row.machine_info.disk.usedPercent
                ? scope.row.machine_info.disk.usedPercent.toFixed(2)
                : 0
            }}
            %
          </template>
        </el-table-column>
        <el-table-column
         align="center"
          label="gpu使用率"
          prop="machine_info.gpu.gpu_util"
          min-width="300"
        />
        <el-table-column
          label="内存使用率"
           align="center"
          prop="machine_info.rrm.usedPercent"
          min-width="300"
        >
          <template slot-scope="scope">
            {{
              scope.row.machine_info.rrm.usedPercent
                ? scope.row.machine_info.rrm.usedPercent.toFixed(2)
                : 0
            }}
            %
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="page"
        :page-size="pageSize"
        :page-sizes="[10, 30, 50, 100]"
        :style="{ float: 'right', padding: '20px' }"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
import { dashboardData } from "@/api/sys_dashboard";
import { getSystemState } from "@/api/system";
import { getZLMediaKitList } from "@/api/zlm_media_kit";
import infoList from "@/mixins/infoList";
export default {
  name: "Dashboard",
  mixins: [infoList],
  data() {
    return {
      listApi: getZLMediaKitList,
      page: 1,
      pageSize: 5,
      timer: null,
      state: {},
      colors: [
        { color: "#5cb87a", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#f56c6c", percentage: 80 },
      ],
      dashboard: {
        alive_device: 0,
        total_device: 0,
        alive_nvr: 0,
        total_nvr: 0,
      },
    };
  },
  async created() {
    await this.reload();
    this.searchInfo.machine = true;
    await this.getTableData();
    this.timer = setInterval(() => {
      this.reload();
    }, 1000 * 10);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    async reload() {
      const { data } = await getSystemState();
      this.state = data.server;
      await this.getDashboardData();
    },
    async getDashboardData() {
      let res = await dashboardData();
      if (res.code == 0) {
        this.dashboard = res.data;
      }
    },
  },
};
</script>

<style>
.system_state {
  padding: 10px;
}

.card_item {
  height: 280px;
}
</style>
