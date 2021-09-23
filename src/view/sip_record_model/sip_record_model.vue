<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item label="模板名">
          <el-input v-model="searchInfo.name" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="onSubmit"
            >查询</el-button
          >
          <!-- <el-button
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="openDialog"
            >新增</el-button
          > -->
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
      :data="list"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="模板名" prop="name" width="140" />
      <el-table-column label="周一" prop="monday_start_time" width="160">
        <template slot-scope="scope">
          {{ scope.row.monday_time | formatRecordTime }}
        </template>
      </el-table-column>
      <el-table-column label="周二" prop="tuesday_start_time" width="170">
        <template slot-scope="scope">
          {{ scope.row.tuesday_time | formatRecordTime }}
        </template>
      </el-table-column>
      <el-table-column label="周三" prop="wednesday_start_time" width="170">
        <template slot-scope="scope">
          {{ scope.row.wednesday_time | formatRecordTime }}
        </template>
      </el-table-column>
      <el-table-column label="周四" prop="thursday_start_time" width="170">
        <template slot-scope="scope">
          {{ scope.row.thursday_time | formatRecordTime }}
        </template>
      </el-table-column>
      <el-table-column label="周五" prop="friday_start_time" width="170">
        <template slot-scope="scope">
          {{ scope.row.friday_time | formatRecordTime }}
        </template>
      </el-table-column>
      <el-table-column label="周六" prop="saturday_start_time" width="170">
        <template slot-scope="scope">
          {{ scope.row.saturday_time | formatRecordTime }}
        </template>
      </el-table-column>
      <el-table-column label="周日" prop="sunday_start_time" width="170">
        <template slot-scope="scope">
          <div style="displaye: flex; flex-direction: column">
            {{ scope.row.sunday_time | formatRecordTime }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            class="table-button"
            @click="selectChannel(scope.row)"
            >选择通道</el-button
          >

          <!-- <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            class="table-button"
            @click="updateRecordModel(scope.row)"
            >变更</el-button
          > -->
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
        :model="formData"
        label-position="right"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item prop="name" label="模板名:">
          <el-input v-model="formData.name" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="周一:">
          <div v-for="(item, index) in formData.monday_time" :key="index">
            <el-time-picker
              v-model="formData.monday_time[index]"
              is-range
              :clearable="false"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss"
            />
          </div>
        </el-form-item>
        <el-form-item label="周二:">
          <div v-for="(item, index) in formData.tuesday_time" :key="index">
            <el-time-picker
              v-model="formData.tuesday_time[index]"
              is-range
              :clearable="false"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss"
            />
          </div>
        </el-form-item>
        <el-form-item label="周三:">
          <div v-for="(item, index) in formData.wednesday_time" :key="index">
            <el-time-picker
              v-model="formData.wednesday_time[index]"
              is-range
              :clearable="false"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss"
            />
          </div>
        </el-form-item>
        <el-form-item label="周四:">
          <div v-for="(item, index) in formData.thursday_time" :key="index">
            <el-time-picker
              v-model="formData.thursday_time[index]"
              is-range
              :clearable="false"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss"
            />
          </div>
        </el-form-item>
        <el-form-item label="周五:">
          <div v-for="(item, index) in formData.friday_time" :key="index">
            <el-time-picker
              v-model="formData.friday_time[index]"
              is-range
              :clearable="false"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss"
            />
          </div>
        </el-form-item>
        <el-form-item label="周六:">
          <div v-for="(item, index) in formData.saturday_time" :key="index">
            <el-time-picker
              v-model="formData.saturday_time[index]"
              is-range
              :clearable="false"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss"
            />
          </div>
        </el-form-item>
        <el-form-item label="周日:">
          <div v-for="(item, index) in formData.sunday_time" :key="index">
            <el-time-picker
              v-model="formData.sunday_time[index]"
              is-range
              :clearable="false"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              value-format="HH:mm:ss"
            />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="enterDialog">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :before-close="closeChannelDialog"
      :visible.sync="dialogChannelVisible"
      title="弹窗操作"
    >
      <el-form
        :model="chooseChanel"
        label-position="right"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="通道:">
          <el-select v-model="ids" placeholder="请选择" multiple>
            <el-option-group
              v-for="nvr in nvrArr"
              :key="nvr.ID"
              :label="nvr.name ? nvr.name : nvr.device_id"
            >
              <el-option
                v-show="!device.record_model_id"
                v-for="device in nvr.devices"
                :key="device.ID"
                :label="device.name ? device.name : device.device_id"
                :value="device.ID"
              >
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeChannelDialog">取 消</el-button>
        <el-button type="primary" @click="chooseChanel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  createRecordModel,
  deleteRecordModel,
  deleteRecordModelByIds,
  updateRecordModel,
  findRecordModel,
  getRecordModelList,
  getRecordDeviceIds,
  selectDevices,
} from "@/api/sip_record_model"; //  此处请自行替换地址
import { getNVRDeviceList } from "@/api/sip_nvr";
import { formatTimeToStr } from "@/utils/date";
import infoList from "@/mixins/infoList";
export default {
  name: "RecordModel",
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
    formatRecordTime: function (timeStrArr) {
      // console.log(timeStrArr,'32223232');
      let timeStr = timeStrArr;
      if (timeStr != null && timeStr != "") {
        let res = "";
        JSON.parse(timeStr).forEach((item, i) => {
          // res += `<br>`
          item.forEach((v, j) => {
            if (v !== "") {
              res += v + "-";
            }
          });
        });
        return res;
      } else {
        return "";
      }
    },
  },
  mixins: [infoList],
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      listApi: getRecordModelList,
      dialogFormVisible: false,
      type: "",
      deleteVisible: false,
      multipleSelection: [],
      formData: {
        name: "",
        monday_time: [["", ""]],
        tuesday_time: [["", ""]],
        wednesday_time: [["", ""]],
        thursday_time: [["", ""]],
        friday_time: [["", ""]],
        saturday_time: [["", ""]],
        sunday_time: [["", ""]],
      },
      recordId: 0,
      nvrArr: [],
      ids: [],
      dialogChannelVisible: false,
      list: [],
    };
  },
  async created() {
    await this.getTableData();
    await this.getNvrData();
    this.list = this.tableData;
    this.changes();
  },
  methods: {
    changes() {
      this.list.forEach((item) => {
        console.log(item, "9999");
      });
    },
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
        this.deleteRecordModel(row);
        this.getTableData();
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
      const res = await deleteRecordModelByIds({ ids });
      if (res.code === 0) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        if (this.list.length === ids.length && this.page > 1) {
          this.page--;
        }
        this.deleteVisible = false;
        this.getTableData();
      }
    },
    async updateRecordModel(row) {
      const res = await findRecordModel({ ID: row.ID });
      this.type = "update";
      if (res.code === 0) {
        let data = res.data.rerecordModel;
        this.formData.ID = data.ID;
        this.formData.name = data.name;
        this.formData.monday_time = JSON.parse(data.monday_time);
        this.formData.tuesday_time = JSON.parse(data.tuesday_time);
        this.formData.wednesday_time = JSON.parse(data.wednesday_time);
        this.formData.thursday_time = JSON.parse(data.thursday_time);
        this.formData.friday_time = JSON.parse(data.friday_time);
        this.formData.saturday_time = JSON.parse(data.saturday_time);
        this.formData.sunday_time = JSON.parse(data.sunday_time);
        this.dialogFormVisible = true;
      }
    },
    closeDialog() {
      this.dialogFormVisible = false;
      this.formData = {
        name: "",
        monday_time: [["", ""]],
        tuesday_time: [["", ""]],
        wednesday_time: [["", ""]],
        thursday_time: [["", ""]],
        friday_time: [["", ""]],
        saturday_time: [["", ""]],
        sunday_time: [["", ""]],
      };
    },
    async deleteRecordModel(row) {
      const res = await deleteRecordModel({ ID: row.ID });
      if (res.code === 0) {
        this.getTableData();
        this.$message({
          type: "success",
          message: "删除成功",
        });

        if (this.list.length === 1 && this.page > 1) {
          this.page--;
        }
        // this.getTableData();
      }
    },
    async enterDialog() {
      let res;
      if (!this.formData.name) {
        this.$message({
          type: "error",
          message: "模板名不能为空",
        });
        return;
      }
      switch (this.type) {
        case "create":
          res = await createRecordModel(this.formData);
          break;
        case "update":
          res = await updateRecordModel(this.formData);
          break;
        default:
          res = await createRecordModel(this.formData);
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
    async getNvrData() {
      let res = await getNVRDeviceList({
        page: 1,
        pageSize: 9999,
        child: true,
      });
      this.nvrArr = res.data.list;
    },
    closeChannelDialog() {
      this.recordId = 0;
      this.ids = [];
      this.dialogChannelVisible = false;
    },
    async selectChannel(row) {
      let res = await getRecordDeviceIds({
        ID: row.ID,
      });
      this.recordId = row.ID;
      this.ids = res.data;
      // console.log(ids,'9966');
      this.dialogChannelVisible = true;
    },
    async chooseChanel() {
      await selectDevices({
        ID: this.recordId,
        ids: this.ids,
      });
      this.recordId = 0;
      this.ids = [];
      this.dialogChannelVisible = false;
    },
  },
};
</script>

<style>
</style>
