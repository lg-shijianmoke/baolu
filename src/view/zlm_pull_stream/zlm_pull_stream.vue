<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="流ID">
          <el-input v-model="searchInfo.stream_id" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="onSubmit"
            >查询</el-button
          >
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
      <el-table-column label="名称" prop="name" width="120" align="center" />
      <el-table-column label="应用名" prop="app" width="120" align="center" />
      <el-table-column label="状态" prop="alive" width="120" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.alive ? 'success' : 'warning'">{{
            scope.row.alive | formatAlive
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="码率"
        prop="bytes_speed"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.bytes_speed / 1000 }}KB
        </template>
      </el-table-column>
      <el-table-column
        label="时长"
        prop="alive_second"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.alive_second | formatAliveSecond }}
        </template>
      </el-table-column>
      <el-table-column label="流ID" prop="stream_id" align="center" width="250">
        <template slot-scope="scope">
          <el-tag
            type="info"
            v-clipboard:copy="scope.row.stream_id"
            v-clipboard:success="onCopy"
            >{{ scope.row.stream_id }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="开启" prop="status" width="120" align="center">
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            v-model="scope.row.status"
            @change="switchStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="按需" prop="require" align="center">
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
      <el-table-column label="开启录制" prop="record" align="center">
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
      <el-table-column label="地址" prop="pull_url" width="380" align="center">
        <template slot-scope="scope">
          <el-tag
            type="info"
            v-clipboard:copy="scope.row.pull_url"
            v-clipboard:success="onCopy"
            >{{ scope.row.pull_url }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.start_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.close_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="按钮组" fixed="right" width="300">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            icon="el-icon-video-play"
            class="table-button"
            @click="playStream(scope.row)"
            >播放</el-button
          >
          <el-button
            size="small"
            type="primary"
            class="table-button"
            @click="toRecordList(scope.row)"
            >回放</el-button
          >
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            class="table-button"
            @click="updatePullStream(scope.row)"
            >变更</el-button
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
      <el-form
        :rules="rules"
        :model="formData"
        label-position="right"
        label-width="120px"
      >
        <el-form-item prop="name" label="名称:">
          <el-input v-model="formData.name" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="app" label="应用名:">
          <el-input
            readonly
            v-model="formData.app"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item prop="stream_id" label="流ID:">
          <el-input
            v-model="formData.stream_id"
            clearable
            placeholder="请输入"
          />
          <el-button type="primary" @click="randomStreamId">随机生成</el-button>
        </el-form-item>
        <el-form-item prop="pull_url" label="拉流地址:">
          <el-input
            v-model="formData.pull_url"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="超时时间:">
          <el-input-number
            v-model.number="formData.timeout_ms"
            clearable
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="节点选择:">
          <el-select v-model="formData.media_server_id" placeholder="请选择">
            <el-option
              v-for="item in gbPlatformArr"
              :key="item.ID"
              :label="item.name"
              :value="item.ID"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="FFMPEG模板:">
          <el-select v-model="formData.ffmpeg_cmd_key" placeholder="请选择">
            <el-option
              v-for="item in ffmpegModel"
              :key="item.ID"
              :label="item.name"
              :value="item.key"
            >
            </el-option>
          </el-select>
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
      ></EasyPlayer>
    </el-dialog>
  </div>
</template>

<script>
import {
  createPullStream,
  deletePullStream,
  deletePullStreamByIds,
  updatePullStream,
  findPullStream,
  getPullStreamList,
  pullStreamPlay,
  changePullStatus,
  changePullRequire,
  changePullRecord,
} from "@/api/zlm_pull_stream"; //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/date";
import infoList from "@/mixins/infoList";
import EasyPlayer from "@easydarwin/easyplayer";
export default {
  name: "PullStream",
  components: {
    EasyPlayer,
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
    formatAlive(alive) {
      return alive ? "在线" : "离线";
    },
    formatAliveSecond(second) {
      let theTime = second; //秒
      let middle = 0; //分
      let hour = 0; //小时
      if (theTime > 59) {
        middle = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
      }
      if (middle > 59) {
        hour = parseInt(middle / 60);
        middle = parseInt(middle % 60);
      }
      theTime < 10 ? (theTime = "0" + theTime) : (theTime = theTime);
      middle < 10 ? (middle = "0" + middle) : (middle = middle);
      hour < 10 ? (hour = "0" + hour) : (hour = hour);
      return hour + ":" + middle + ":" + theTime;
    },
  },
  mixins: [infoList],
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        stream_id: [{ required: true, message: "请输入流id", trigger: "blur" }],
        pull_url: [
          { required: true, message: "请输入拉流地址", trigger: "blur" },
        ],
      },
      listApi: getPullStreamList,
      dialogFormVisible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      formData: {
        name: "",
        status: true,
        type: "ffmpeg",
        app: "live",
        stream_id: "",
        pull_url: "",
        timeout_ms: 10000,
        media_server_id: 0,
        require: true,
      },
      typeArr: [
        {
          label: "FFMPEG",
          value: "ffmpeg",
        },
      ],
      gbPlatformArr: [
        {
          ID: 0,
          name: "自动选择",
        },
      ],
      ffmpegModel: [
        {
          ID: 0,
          name: "默认",
          key: "",
        },
      ],
      playInfo: {
        device_id: "",
        http: "",
        rtmp: "",
        ws_flv: "",
      },
      playDialogVisible: false,
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
        this.deletePullStream(row);
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
      const res = await deletePullStreamByIds({ ids });
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
    async updatePullStream(row) {
      const res = await findPullStream({ ID: row.ID });
      this.type = "update";
      if (res.code === 0) {
        this.formData = res.data.repullStream;
        this.dialogFormVisible = true;
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.formData = {
        name: "",
        status: true,
        type: "ffmpeg",
        app: "live",
        stream_id: "",
        pull_url: "",
        timeout_ms: 10000,
        media_server_id: 0,
        require: true,
      };
    },
    async deletePullStream(row) {
      const res = await deletePullStream({ ID: row.ID });
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
      if (
        !this.formData.name ||
        !this.formData.app ||
        !this.formData.stream_id ||
        !this.formData.pull_url
      ) {
        this.$message({
          type: "error",
          message: "参数不完整",
        });
        return;
      }
      let res;
      switch (this.type) {
        case "create":
          res = await createPullStream(this.formData);
          break;
        case "update":
          res = await updatePullStream(this.formData);
          break;
        default:
          res = await createPullStream(this.formData);
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
    randomStreamId() {
      let code = Math.random().toString(36).substr(2) + new Date().getTime();
      this.formData.stream_id = this.$md5(code);
    },
    onCopy() {
      this.$message({
        message: "内容已复制到剪切板",
        type: "success",
      });
    },
    async playStream(row) {
      let res = await pullStreamPlay({
        id: row.ID,
      });
      this.playInfo = res.data;
      this.playDialogVisible = true;
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
    },
    async switchStatus(row) {
      let res = await changePullStatus({
        id: row.ID,
        status: row.status,
      });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "操作成功",
        });
        row.alive = row.status ? true : false;
      }
    },
    async switchRequire(row) {
      let res = await changePullRequire({
        id: row.ID,
        require: row.require,
      });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "操作成功",
        });
      }
    },
    async switchRecord(row) {
      let res = await changePullRecord({
        id: row.ID,
        record: row.record,
      });
      if (res.code == 0) {
        this.$message({
          type: "success",
          message: "操作成功",
        });
      }
    },
    toRecordList(row) {
      this.$router.push({
        name: "zlmRecord",
        query: {
          app: row.app,
          stream_id: row.stream_id,
        },
      });
    },
  },
};
</script>

<style>
</style>
