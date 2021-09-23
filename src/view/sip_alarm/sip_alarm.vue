<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="alarmPriority" placeholder="">
            <el-option
              v-for="item in alarmPriorityArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="alarmMethod" placeholder="">
            <el-option
              v-for="item in alarmMethodArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
      :data="tableData"
    >
      <el-table-column
        label="设备编号"
        prop="nvr_device_id"
        min-width="180"
        align="center"
      />
      <el-table-column
        label="通道编号"
        prop="device_id"
        min-width="180"
        align="center"
      />
      <el-table-column
        label="报警时间"
        prop="alarm_time"
        min-width="180"
        align="center"
      />
      <el-table-column
        label="消息"
        prop="alarm_type_str"
        min-width="300"
        align="center"
      />
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
</template>

<script>
import { getAlarmList } from "@/api/sip_alarm";
import { formatTimeToStr } from "@/utils/date";
import infoList from "@/mixins/infoList";
export default {
  name: "SipAlarm",
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
    return {
      listApi: getAlarmList,
      page: 1,
      pageSize: 10,
      alarmPriorityArr: [
        { label: "所有", value: 0 },
        { label: "一级报警", value: 1 },
        { label: "二级报警", value: 2 },
        { label: "三级报警", value: 3 },
        { label: "四级报警", value: 4 },
      ],
      alarmMethodArr: [
        {
          label: "所有",
          value: 0,
        },
        {
          label: "电话报警",
          value: 1,
        },
        {
          label: "设备报警",
          value: 2,
        },
        {
          label: "短信报警",
          value: 3,
        },
        {
          label: "GPS报警",
          value: 4,
        },
        {
          label: "视频报警",
          value: 5,
        },
        {
          label: "设备故障",
          value: 6,
        },
        {
          label: "其他报警",
          value: 7,
        },
      ],
      alarmPriority: 0,
      alarmMethod: 0,
    };
  },
  mixins: [infoList],
  async created() {
    this.searchInfo.alarm_priority = this.alarmPriority;
    this.searchInfo.alarm_method = this.alarmMethod;
    this.getTableData();
  },
  methods: {
    onSubmit() {
      this.searchInfo.alarm_priority = this.alarmPriority;
      this.searchInfo.alarm_method = this.alarmMethod;
      this.page = 1;
      this.pageSize = 10;
      this.getTableData();
    },
  },
};
</script>

<style>
</style>

