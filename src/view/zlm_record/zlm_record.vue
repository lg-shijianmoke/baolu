<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-date-picker
            v-model="period"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="onSubmit"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table
      border
      stripe
      style="width: 100%"
      tooltip-effect="dark"
      :data="listInfo"
    >
      <el-table-column label="名称" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="按钮组" width="180">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="success"
            class="table-button"
            @click="replay(scope.row)"
            >播放</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :before-close="closePlayDialog"
      :visible.sync="playDialogVisible"
      title="播放"
    >
      <EasyPlayer
        :videoUrl="playInfo.mp4"
        fluent
        autoplay
        live
        stretch
      ></EasyPlayer>
    </el-dialog>
  </div>
</template>

<script>
import { getZLMRecordList, playZLMRecord } from "@/api/zlm_record";
import { formatTimeToStr } from "@/utils/date";
import EasyPlayer from "@easydarwin/easyplayer";
export default {
  name: "ZLMRecord",
  components: {
    EasyPlayer,
  },
  filters: {
    formatDate(time) {
      if (time !== null && time !== "") {
        var date = new Date(time);
        return formatTimeToStr(date, "yyyy-MM-dd hh:mm:ss");
      } else {
        return "";
      }
    },
  },
  data() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    let dateStr = year + "-" + month + "-" + day;
    return {
      period: dateStr,
      app: "",
      stream_id: "",
      listInfo: [],
      playInfo: {
        mp4: "",
      },
      playDialogVisible: false,
    };
  },
  async created() {
    this.app = this.$route.query.app;
    this.stream_id = this.$route.query.stream_id;
    this.getRecordListData();
  },
  methods: {
    async getRecordListData() {
      this.listInfo = [];
      let _this = this;
      let res = await getZLMRecordList({
        app: _this.app,
        stream_id: _this.stream_id,
        period: _this.period,
      });
      if (res.code == 0) {
        let list = [];
        let rootPath = res.data.rootPath;
        res.data.paths.forEach((info) => {
          list.push({
            name: info,
            root_path: rootPath + info,
          });
        });
        this.listInfo = list;
      }
    },
    onSubmit() {
      this.getRecordListData();
    },
    async replay(row) {
      let _this = this;
      let res = await playZLMRecord({
        name: row.name,
        app: _this.app,
        stream_id: _this.stream_id,
        period: _this.period,
      });
      if (res.code == 0) {
        this.playInfo = res.data;
        this.playDialogVisible = true;
      }
    },
    closePlayDialog() {
      this.playInfo = {
        mp4: "",
      };
      this.playDialogVisible = false;
    },
  },
};
</script>

<style>
</style>

