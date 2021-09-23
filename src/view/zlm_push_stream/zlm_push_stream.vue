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
      <el-table-column label="app" prop="app" width="120" align="center" />
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
      <el-table-column
        label="流ID"
        prop="stream_id"
        width="240"
        align="center"
      />
      <!-- <el-table-column
        label="国标编码"
        prop="gb_code"
        width="180"
        align="center"
      /> -->
      <el-table-column label="地址" prop="url" align="center">
        <template slot-scope="scope">
          <el-tag
            type="info"
            v-clipboard:copy="scope.row.url"
            v-clipboard:success="onCopy"
            >{{ scope.row.url }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="加入时间" width="180" align="center">
        <template slot-scope="scope">{{
          scope.row.on_publish_time | formatDate
        }}</template>
      </el-table-column>
      <el-table-column label="按钮组">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            class="table-button"
            @click="updatePushStream(scope.row)"
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
      <el-form :model="formData" label-position="right" label-width="80px">
        <el-form-item label="app:">
          <el-input v-model="formData.app" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="流ID:">
          <el-input
            v-model="formData.stream_id"
            clearable
            placeholder="请输入"
          />
          <el-button type="primary" @click="randomStreamId">随机生成</el-button>
        </el-form-item>
        <!-- <el-form-item label="国标编码:">
          <el-input v-model="formData.gb_code" clearable placeholder="请输入" />
        </el-form-item> -->
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
  createPushStream,
  deletePushStream,
  deletePushStreamByIds,
  updatePushStream,
  findPushStream,
  getPushStreamList,
} from "@/api/zlm_push_stream"; //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/date";
import infoList from "@/mixins/infoList";
export default {
  name: "PushStream",
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
      listApi: getPushStreamList,
      dialogFormVisible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      formData: {
        app: "",
        stream_id: "",
        gb_code: "",
      },
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
        this.deletePushStream(row);
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
      const res = await deletePushStreamByIds({ ids });
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
    async updatePushStream(row) {
      const res = await findPushStream({ ID: row.ID });
      this.type = "update";
      if (res.code === 0) {
        this.formData = res.data.repushStream;
        this.dialogFormVisible = true;
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.formData = {
        app: "",
        stream_id: "",
        gb_code: "",
      };
    },
    async deletePushStream(row) {
      const res = await deletePushStream({ ID: row.ID });
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
          res = await createPushStream(this.formData);
          break;
        case "update":
          res = await updatePushStream(this.formData);
          break;
        default:
          res = await createPushStream(this.formData);
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
      let code = Math.random().toString(36).substr(2) + (new Date()).getTime();
      this.formData.stream_id = this.$md5(code)
    },
    onCopy() {
      this.$message({
        message: "内容已复制到剪切板",
        type: "success",
      });
    },
  },
};
</script>

<style>
</style>
