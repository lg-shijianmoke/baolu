<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="openDialog"
            >新增</el-button
          >
          <!-- <el-popover v-model="deleteVisible" placement="top" width="160">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="deleteVisible = false"
                >取消</el-button
              >
              <el-button size="mini" type="primary" @click="onDelete"
                >确定</el-button
              >
            </div>
            <el-button
              slot="reference"
              icon="el-icon-delete"
              size="mini"
              type="danger"
              style="margin-left: 10px"
              >批量删除</el-button
            >
          </el-popover> -->
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      border
      stripe
      style="width: 100%"
      tooltip-effect="dark"
      :data="tableData"
    >
      <!-- @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" /> -->
      <el-table-column
        label="设备编号"
        prop="device_id"
        width="180"
        align="center"
      />
      <el-table-column label="名称" prop="name" width="120" align="center">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.name"
            placeholder="请输入"
            clearable
            @blur="blurRowName(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="制造厂商"
        prop="manufacturer"
        width="120"
        align="center"
      >
        <template slot-scope="scope">{{
          scope.row.manufacturer | formatUnknow
        }}</template>
      </el-table-column>
      <el-table-column
        label="固件版本"
        prop="firmware"
        width="120"
        align="center"
      >
        <template slot-scope="scope">{{
          scope.row.firmware | formatUnknow
        }}</template>
      </el-table-column>
      <el-table-column label="IP" prop="host" width="130" align="center" />
      <el-table-column label="端口" prop="port" width="90" align="center" />
      <el-table-column
        label="是否在线"
        prop="active"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="new Date().getTime() - scope.row.active * 1000 <= 60000"
            type="success"
            >{{ scope.row.active | formatActive }}</el-tag
          >
          <el-tag v-else type="warning">{{
            scope.row.active | formatActive
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="注册" prop="regist" width="80" align="center">
        <template slot-scope="scope">{{
          scope.row.regist | formatRegiter
        }}</template>
      </el-table-column>
      <el-table-column
        label="自动注册通道"
        prop="auto"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            v-model="scope.row.auto"
            @change="switchAuto(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="传输模式"
        prop="tcp_play"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.tcp_play"
            @change="switchPlayType(scope.row)"
          >
            <el-option label="TCP" :value="true"> </el-option>
            <el-option label="UDP" :value="false"> </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="通道数" prop="d_num" width="80" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.auto">-</span>
          <span v-else>{{ scope.row.d_num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="经度"
        prop="longitude"
        width="120"
        align="center"
      />
      <el-table-column
        label="纬度"
        prop="latitude"
        width="120"
        align="center"
      />
      <el-table-column label="按钮组" fixed="right" width="300">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            class="table-button"
            @click="toDevices(scope.row)"
            >通道</el-button
          >
          <el-button
            size="small"
            type="primary"
            class="table-button"
            @click="updateSipNvr(scope.row)"
            >变更</el-button
          >
          <el-button
            size="small"
            type="primary"
            class="table-button"
            @click="refresh"
            >刷新</el-button
          >
          <el-button
            size="small"
            type="primary"
            class="table-button"
            :disabled="!scope.row.longitude && !scope.row.latitude"
            @click="showPosition(scope.row)"
            >定位</el-button
          >
          <el-button type="danger" size="mini" @click="deleteRow(scope.row)"
            >删除</el-button
          >
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

    <el-dialog
      :before-close="closeDialog"
      :visible.sync="dialogFormVisible"
      title="弹窗操作"
    >
      <el-form :model="formData" label-position="right" label-width="120px">
        <el-form-item label="类型:">
          <el-select v-model="formData.type">
            <el-option
              v-for="(item, index) in typeArr"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称:">
          <el-input v-model="formData.name" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item v-show="formData.type == 1" label="密码:">
          <el-input
            v-model="formData.pwd"
            clearable
            placeholder="请输入"
            show-password
          />
        </el-form-item>
        <el-form-item v-show="formData.type == 1" label="自动注册通道:">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            v-model="formData.auto"
            clearable
          ></el-switch>
        </el-form-item>
        <el-form-item
          v-show="formData.type == 1 && !formData.auto"
          label="通道数:"
        >
          <el-input
            v-model="formData.d_num"
            type="number"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item v-show="type == 'update'" label="经度:">
          <el-input v-model="formData.longitude" clearable />
        </el-form-item>
        <el-form-item v-show="type == 'update'" label="纬度:">
          <el-input v-model="formData.latitude" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="enterDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  createSipNvr,
  deleteSipNvr,
  deleteSipNvrByIds,
  updateSipNvr,
  findSipNvr,
  getNVRDeviceList,
  changeNvrAuto,
  changeNvrPlayType,
} from "@/api/sip_nvr"; //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/date";
import infoList from "@/mixins/infoList";
export default {
  name: "SipNvr",
  filters: {
    formatDate(time) {
      if (time !== null && time !== "") {
        var date = new Date(time);
        return formatTimeToStr(date, "yyyy-MM-dd hh:mm:ss");
      } else {
        return "";
      }
    },
    formatBoolean(bool) {
      if (bool != null) {
        return bool ? "是" : "否";
      } else {
        return "";
      }
    },
    formatActive(activeTime) {
      return new Date().getTime() - activeTime * 1000 > 60 * 1000
        ? "离线"
        : "在线";
    },
    formatUnknow(str) {
      return str ? str : "未知";
    },
    formatDNum(row) {
      return row.auto ? "-" : row.d_num;
    },
    formatRegiter(bool) {
      if (bool != null) {
        return bool ? "已注册" : "未注册";
      } else {
        return "";
      }
    },
  },
  mixins: [infoList],
  data() {
    return {
      listApi: getNVRDeviceList,
      dialogFormVisible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      formData: {
        type: 1,
        name: "",
        manufacturer: "",
        firmware: "",
        pwd: "",
        auto: false,
        d_num: 0,
        latitude: "",
        longitude: "",
      },
      typeArr: [
        {
          label: "GB28181",
          value: 1,
        },
        // {
        //   label: "RTSP/RTMP/HTTP",
        //   value: 2,
        // },
        // {
        //   label: "RTMP_PUSH",
        //   value: 3,
        // },
      ],
    };
  },
  async created() {
    await this.getTableData();
  },
  methods: {
    // 条件搜索前端看此方法
    onSubmit() {
      this.page = 1;
      this.pageSize = 10;
      if (this.searchInfo.regist === "") {
        this.searchInfo.regist = null;
      }
      if (this.searchInfo.auto === "") {
        this.searchInfo.auto = null;
      }
      this.getTableData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteRow(row) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteSipNvr(row);
      });
    },

    async onDelete() {
      const ids = [];
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择要删除的数据",
        });
        return;
      }
      this.multipleSelection &&
        this.multipleSelection.map((item) => {
          ids.push(item.ID);
        });
      const res = await deleteSipNvrByIds({ ids });
      if (res.code === 0) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        if (this.tableData.length === ids.length && this.page > 1) {
          this.page--;
        }
        this.deleteVisible = false;
        this.getTableData();
      }
    },
    async updateSipNvr(row) {
      const res = await findSipNvr({ ID: row.ID });
      this.type = "update";
      if (res.code === 0) {
        this.formData = res.data;
        this.dialogFormVisible = true;
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.formData = {
        type: 1,
        name: "",
        manufacturer: "",
        firmware: "",
        pwd: "",
        auto: false,
        d_num: 0,
        latitude: "",
        longitude: "",
      };
    },
    async deleteSipNvr(row) {
      const res = await deleteSipNvr({ ID: row.ID });
      if (res.code === 0) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        if (this.tableData.length === 1 && this.page > 1) {
          this.page--;
        }
        this.getTableData();
      }
    },
    async enterDialog() {
      this.formData.d_num = parseInt(this.formData.d_num);
      if (this.formData.type != 1) {
        this.$message({
          type: "info",
          message: "其他类型正在开发中",
        });
        this.closeDialog();
        return;
      }
      let res;
      switch (this.type) {
        case "create":
          res = await createSipNvr(this.formData);
          break;
        case "update":
          res = await updateSipNvr(this.formData);
          break;
        default:
          res = await createSipNvr(this.formData);
          break;
      }
      if (res.code === 0) {
        this.$message({
          type: "success",
          message: "创建/更改成功",
        });
        this.closeDialog();
        this.getTableData();
      }
    },
    openDialog() {
      this.type = "create";
      this.dialogFormVisible = true;
    },
    refresh() {
      this.getTableData();
    },
    toDevices(row) {
      this.$router.push({
        name: "sipDevice",
        query: {
          nvr_device_id: row.device_id,
        },
      });
    },
    // 定位
    showPosition(row) {
      console.log(row);
      // this.$router.push(`/postion/${row.deviceId}/0/15/1`);
      this.$router.push({
        name: "postion",
        query: {
          deviceId: row.device_id,
          latitude: row.latitude,
          longitude: row.longitude,
          name: row.name,
        },
      });
    },
    async switchAuto(row) {
      let res = await changeNvrAuto({
        ID: row.ID,
        auto: row.auto ? row.auto : false,
      });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "操作成功",
        });
      }
    },
    async switchPlayType(row) {
      let res = await changeNvrPlayType({
        ID: row.ID,
        tcp_play: row.tcp_play ? row.tcp_play : false,
      });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "操作成功",
        });
      }
    },
    async blurRowName(row) {
      let res = await updateSipNvr({
        ID: row.ID,
        name: row.name,
      });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "更改成功",
        });
      }
    },
  },
};
</script>

<style>
</style>

