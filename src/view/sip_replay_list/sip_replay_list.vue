<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-date-picker
            v-model="timeArr"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
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
      <el-table-column label="开始时间" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.start_time | formatDate }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.end_time | formatDate }}
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
        :videoUrl="playInfo.http"
        fluent
        autoplay
        live
        stretch
      ></EasyPlayer>
      <!-- <div>
        <el-radio-group v-model="scale" @change="recordControl">
          <el-radio-button
            v-for="item in scaleArr"
            :key="item.label"
            :label="item.label"
            >{{ item.title }}</el-radio-button
          >
        </el-radio-group>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  sipRecordList,
  sipRecordReplay,
  sipRecordControl,
} from "@/api/sip_device"; //  此处请自行替换地址
import { formatTimeToStr } from "@/utils/date";
import EasyPlayer from "@easydarwin/easyplayer";
export default {
  name: "SipReplayList",
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
    let month = date.getMonth();
    let day = date.getDate();
    let startDate = new Date(year, month, day, 0, 0, 0);
    let endDate = new Date(year, month, day, 23, 59, 59);
    let pickerOptions2 = {
      shortcuts: [
        {
          text: "最近一周",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          },
        },
        {
          text: "最近三个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          },
        },
      ],
    };
    return {
      pickerOptions2: pickerOptions2,
      listInfo: [],
      timeArr: [startDate, endDate],
      year: year,
      month: month,
      day: day,
      id: 0,
      playInfo: { device_id: "", http: "", rtmp: "", ws_flv: "" },
      playDialogVisible: false,
      scale: 0,
      start_time: "",
      end_time: "",
      scaleArr: [
        {
          label: 0.5,
          title: "0.5倍速",
        },
        {
          label: 0,
          title: "正常速度",
        },
        {
          label: 2.0,
          title: "2倍速",
        },
        {
          label: 8.0,
          title: "8倍速",
        },
        {
          label: 16.0,
          title: "16倍速",
        },
      ],
    };
  },
  async created() {
    this.id = parseInt(this.$route.query.id);
    this.getRecordListData();
  },
  methods: {
    async getRecordListData() {
      this.listInfo = [];
      let _this = this;
      let res = await sipRecordList({
        id: _this.id,
        start_time: _this.timeArr[0],
        end_time: _this.timeArr[1],
      });
      if (res.code == 0) {
        let list = [];
        res.data.list.forEach((info) => {
          info.items.forEach((item) => {
            list.push({
              id: _this.id,
              start_time: new Date(parseInt(item.start) * 1000),
              end_time: new Date(parseInt(item.end) * 1000),
            });
          });
        });
        this.listInfo = list;
      }
    },
    onSubmit() {
      this.getRecordListData();
    },
    async replay(row) {
      let res = await sipRecordReplay({
        id: row.id,
        start_time: row.start_time,
        end_time: row.end_time,
      });
      this.start_time = row.start_time;
      this.end_time = row.end_time;
      if (res.code == 0) {
        this.playInfo = res.data;
        this.playDialogVisible = true;
      }
    },
    closePlayDialog() {
      this.playInfo = {
        device_id: "",
        http: "",
        rtmp: "",
        ws_flv: "",
      };
      this.scale = 0;
      this.start_time = "";
      this.end_time = "";
      this.playDialogVisible = false;
    },
    async recordControl() {
      let _this = this;
      await sipRecordControl({
        id: _this.id,
        scale: _this.scale,
        start_time: _this.start_time,
        end_time: _this.end_time,
      });
    },
  },
};
</script>

<style>
</style>

