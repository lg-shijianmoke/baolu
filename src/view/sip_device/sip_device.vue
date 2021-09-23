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
          <el-popover v-model="deleteVisible" placement="top" width="160">
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
          </el-popover>
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        label="设备编号"
        prop="device_id"
        width="180"
        align="center"
      />
      <el-table-column label="通道名称" prop="name" width="120" align="center">
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
        label="是否按需"
        prop="require"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            v-model="scope.row.require"
            @change="switchRequire(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="是否录制"
        prop="record"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            v-model="scope.row.record"
            @change="switchRecord(scope.row)"
          ></el-switch>
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
      <el-table-column label="设备状态" prop="active" width="90" align="center">
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
      <el-table-column
        label="流状态"
        prop="stream_status"
        width="90"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.stream_status ? 'success' : 'warning'">{{
            scope.row.stream_status | formatStreamStatus
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="快照" prop="snap" width="200" align="center">
        <template slot-scope="scope">
          <el-image
            style="height: 80px"
            :src="handleImgPath(scope.row.snap)"
            fit="fit"
            :preview-src-list="[handleImgPath(scope.row.snap)]"
          >
            <div slot="error" class="image-slot">
              <el-image
                style="height: 80px"
                :src="require('@/assets/snapNotFound.png')"
                fit="fit"
              />
            </div>

          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="按钮组">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            icon="el-icon-video-play"
            class="table-button"
            @click="playDevice(scope.row)"
            >播放</el-button
          >
          <el-button
            size="small"
            type="primary"
            icon="el-icon-news"
            class="table-button"
            @click="toRecordList(scope.row)"
            >回放</el-button
          >
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            class="table-button"
            @click="updateSipDevice(scope.row)"
            >变更</el-button
          >
          
           <el-button
            size="small"
            type="primary"
            icon="el-icon-location-outline"
            class="table-button"
            :disabled="scope.row.longitude && !scope.row.latitude"
            @click="showPosition(scope.row)"
            >定位</el-button
          >
  
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteRow(scope.row)"
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
      <el-form :model="formData" label-position="right" label-width="80px">
        <el-form-item label="通道名称:">
          <el-input v-model="formData.name" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="是否按需:">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            v-model="formData.require"
            clearable
          ></el-switch>
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

    <el-dialog
      :before-close="closePlayDialog"
      :visible.sync="playDialogVisible"
      title="播放"
    >
      <EasyPlayer
        :videoUrl="playInfo.ws_flv"
        fluent
        autoplay
        live
        stretch
        decode-wasm
      ></EasyPlayer>
      <div>
        <el-tabs
          type="border-card"
          v-model="playType"
          @tab-click="playTabClick"
        >
          <el-tab-pane label="WS-FLV" name="ws_flv">
            <el-input disabled v-model="playInfo.ws_flv" />
          </el-tab-pane>
          <el-tab-pane label="FLV" name="flv">
            <el-input disabled v-model="playInfo.flv"
          /></el-tab-pane>
          <el-tab-pane label="RTMP" name="rtmp">
            <el-input disabled v-model="playInfo.rtmp"
          /></el-tab-pane>
          <el-tab-pane label="HLS" name="http">
            <el-input disabled v-model="playInfo.http"
          /></el-tab-pane>
        </el-tabs>
      </div>
      <div style="margin-top: 10px">
        <el-tag type="info"
          >{{
            playStreamInfo.bytesSpeed ? playStreamInfo.bytesSpeed / 1000 : 0
          }}KB</el-tag
        >
      </div>
      <div style="margin: 10px">
        <SipPtz :id="playDeviceID"></SipPtz>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  createSipDevice,
  deleteSipDevice,
  deleteSipDeviceByIds,
  updateSipDevice,
  findSipDevice,
  getSipDeviceList,
  recordSipDevice,
  requireSipDevice,
  playSipDevice,
} from "@/api/sip_device"; //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/date";
import infoList from "@/mixins/infoList";
import SipPtz from "@/components/ptz/ptz";
import EasyPlayer from "@easydarwin/easyplayer";
export default {
  name: "SipDevice",
  components: {
    EasyPlayer,
    SipPtz,
  },
  filters: {
    formatDate: function (time) {
      if (time !== null && time !== "") {
        var date = new Date(time);
        return formatTimeToStr(date, "yyyy-MM-dd hh:mm:ss");
      } else {
        return "";
      }
    },
    formatBoolean: function (bool) {
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
    formatStreamStatus(status) {
      return status ? "在线" : "离线";
    },
  },
  mixins: [infoList],
  data() {
    return {
      nvr_device_id: "",
      listApi: getSipDeviceList,
      dialogFormVisible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      playType: "http",
      formData: {
        ID: 0,
        name: "",
        require: true,
        longitude: "",
        latitude: "",
      },
      playInfo: {
        device_id: "",
        http: "",
        rtmp: "",
        ws_flv: "",
      },
      playDialogVisible: false,
      playDeviceID: 0,
      playStreamInfo: {},
    };
  },
  async created() {
    this.nvr_device_id = this.$route.query.nvr_device_id;
    this.searchInfo.nvr_device_id = this.nvr_device_id;
    await this.getTableData();
  },
  methods: {
    // 条件搜索前端看此方法
    onSubmit() {
      this.page = 1;
      this.pageSize = 10;
      this.getTableData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    playTabClick(item) {
      this.playType = item.name;
      switch (item.name) {
        case "ws_flv":
          this.playUrl = this.playInfo.ws_flv;
          this.playDecodeWasm = true;
          break;
        case "flv":
          this.playUrl = this.playInfo.flv;
          this.playDecodeWasm = true;
          break;
        case "rtmp":
          this.playUrl = this.playInfo.rtmp;
          this.playDecodeWasm = false;
          break;
        case "http":
          this.playUrl = this.playInfo.http;
          this.playDecodeWasm = false;
          break;
        default:
          break;
      }
    },
    deleteRow(row) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteSipDevice(row);
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
      const res = await deleteSipDeviceByIds({ ids });
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
    async updateSipDevice(row) {
      const res = await findSipDevice({ ID: row.ID });
      this.type = "update";
      if (res.code === 0) {
        this.formData = res.data.resipDevice;
        this.dialogFormVisible = true;
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.formData = {
        ID: 0,
        name: "",
        require: true,
        longitude: "",
        latitude: "",
      };
    },
    async deleteSipDevice(row) {
      const res = await deleteSipDevice({ ID: row.ID });
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
      let res;
      switch (this.type) {
        case "create":
          this.formData.nvr_device_id = this.nvr_device_id;
          res = await createSipDevice(this.formData);
          break;
        case "update":
          res = await updateSipDevice(this.formData);
          break;
        default:
          this.formData.nvr_device_id = this.nvr_device_id;
          res = await createSipDevice(this.formData);
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
    async switchRequire(row) {
      let res = await requireSipDevice({
        ID: row.ID,
        require: row.require ? row.require : false,
      });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "操作成功",
        });
      }
    },
    async switchRecord(row) {
      let res = await recordSipDevice({
        ID: row.ID,
        record: row.record ? row.record : false,
        record_type: true,
      });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "操作成功",
        });
      }
    },
    async playDevice(row) {
      let res = await playSipDevice({
        ID: row.ID,
      });
      this.playInfo = res.data;
      this.playDialogVisible = true;
      this.playDeviceID = row.ID;
    },
    closePlayDialog() {
      this.playInfo = {
        device_id: "",
        http: "",
        rtmp: "",
        ws_flv: "",
      };
      this.playDialogVisible = false;
      this.getTableData();
      this.playDeviceID = 0;
      this.playStreamInfo = {};
    },
    handleImgPath(path) {
      let res =
        process.env.VUE_APP_BASE_PATH +
        ":" +
        process.env.VUE_APP_SERVER_PORT +
        path;
      return res;
    },
    async blurRowName(row) {
      let res = await updateSipDevice({
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
     // 定位
    showPosition(row) {
      console.log(row)
      console.log(JSON.stringify(row));
      // this.$router.push(`/postion/${row.deviceId}/0/15/1`);
      this.$router.push({
        name: "postion",
        query: {
          deviceId: row.device_id,
          latitude:row.latitude,
          longitude:row.longitude,
          name:row.name
        },
      });
    },
    toRecordList(row){
      this.$router.push({
        name:"zlmRecord",
        query: {
          app: "rtp",
          stream_id: row.stream_id
        },
      })
    },
    getPlayStreamInfo() {
      let _this = this;
      this.getPlayStreamInfoTimer = setInterval(() => {
        _this.playStreamInfo = _this.$playStreamInfoMsg;
      }, 5000);
    },
  },
};
</script>

<style>
</style>
