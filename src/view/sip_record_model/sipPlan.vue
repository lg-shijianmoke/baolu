<template>
  <div class="planList">
    <div class="main">
      <div>
        计划名 :
        <el-input
          v-model="obj.name"
          size="small"
          style="margin-left: 1rem; width: auto"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <!-- <div>
        当前通道 : <span>通道{{ num }}</span>
      </div>
      <div>
        编辑通道 :
        <el-input-number
          v-model="num"
          style="margin-left: 1rem"
          controls-position="right"
          @change="handleChange"
          size="small"
          :min="1"
          :max="3000"
        ></el-input-number>
      </div>
      <div>
        滑选通道 :
        <el-slider
          style="margin-left: 1rem; width: auto"
          input-size="small"
          :max="3000"
          v-model="num"
        ></el-slider>
      </div> -->
      <div>
        保留天数 :
        <el-input-number
          v-model="day_count"
          @change="handleChange"
          style="margin-left: 1rem"
          :min="1"
          :max="1000"
          size="small"
          label="描述文字"
        ></el-input-number>
      </div>
      <div>
        录像时段 ：
        <span style="color: #999999; font-size: 14px"
          >录像时段 蓝色表示保留 灰色表示删除 单击选择或取消
          单击不放滑动可快速选择 单击标题可反选行或列</span
        >
        <div class="time">
          <!-- 小时选择 -->
          <div class="timer">
            <div
              @click="refresh"
              class="father"
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              计划表<span
                class="el-icon-refresh-right"
                style="color: #fff"
              ></span>
            </div>
            <div
              class="son"
              @click="hour(i)"
              v-for="(v, i) in time.box"
              :key="i"
            >
              {{ v.hour }}
            </div>
          </div>
          <div class="check" v-for="(item, index) in week" :key="index">
            <!-- 星期选择 -->
            <div
              class="father"
              @click="change(item, index)"
              :data-index="index"
            >
              {{ item.day }}
            </div>
            <!-- 空白单元格选择 -->
            <div
              class="son"
              v-for="(key, value) in item.box"
              @click="changes(key)"
              :style="key.bg ? ' background: #2e71fe' : ' background: #eeeeee'"
              :key="value"
            >
              {{ key.hour }}
            </div>
          </div>
        </div>
      </div>
      <el-button
        type="primary"
        size="small"
        @click="timeData"
        style="margin-top: 10px"
      >
        保存</el-button
      >
    </div>
  </div>
</template>

<script>
import { createRecordModel } from "@/api/sip_record_model";
export default {
  data() {
    return {
      //编辑通道
      num: 1,
      //保留天数
      nums: 1,
      bgCor: "",
      //时间段表格
      time: {
        day: "计划表",
        num: "0",
        box: [
          { hour: "0时" },
          { hour: "1时" },
          { hour: "2时" },
          { hour: "3时" },
          { hour: "4时" },
          { hour: "5时" },
          { hour: "6时" },
          { hour: "7时" },
          { hour: "8时" },
          { hour: "9时" },
          { hour: "10时" },
          { hour: "11时" },
          { hour: "12时" },
          { hour: "13时" },
          { hour: "14时" },
          { hour: "15时" },
          { hour: "16时" },
          { hour: "17时" },
          { hour: "18时" },
          { hour: "19时" },
          { hour: "20时" },
          { hour: "21时" },
          { hour: "22时" },
          { hour: "23时" },
        ],
      },

      week: [
        {
          day: "星期一",
          box: [
            { bg: true, time: "00:00:00" },
            { bg: true, time: "01:00:00" },
            { bg: true, time: "02:00:00" },
            { bg: true, time: "03:00:00" },
            { bg: true, time: "04:00:00" },
            { bg: true, time: "05:00:00" },
            { bg: true, time: "06:00:00" },
            { bg: true, time: "07:00:00" },
            { bg: true, time: "08:00:00" },
            { bg: true, time: "09:00:00" },
            { bg: true, time: "10:00:00" },
            { bg: true, time: "11:00:00" },
            { bg: true, time: "12:00:00" },
            { bg: true, time: "13:00:00" },
            { bg: true, time: "14:00:00" },
            { bg: true, time: "15:00:00" },
            { bg: true, time: "16:00:00" },
            { bg: true, time: "17:00:00" },
            { bg: true, time: "18:00:00" },
            { bg: true, time: "19:00:00" },
            { bg: true, time: "20:00:00" },
            { bg: true, time: "21:00:00" },
            { bg: true, time: "22:00:00" },
            { bg: true, time: "23:00:00" },
          ],
        },
        {
          day: "星期二",
          box: [
            { bg: true, time: "00:00:00" },
            { bg: true, time: "01:00:00" },
            { bg: true, time: "02:00:00" },
            { bg: true, time: "03:00:00" },
            { bg: true, time: "04:00:00" },
            { bg: true, time: "05:00:00" },
            { bg: true, time: "06:00:00" },
            { bg: true, time: "07:00:00" },
            { bg: true, time: "08:00:00" },
            { bg: true, time: "09:00:00" },
            { bg: true, time: "10:00:00" },
            { bg: true, time: "11:00:00" },
            { bg: true, time: "12:00:00" },
            { bg: true, time: "13:00:00" },
            { bg: true, time: "14:00:00" },
            { bg: true, time: "15:00:00" },
            { bg: true, time: "16:00:00" },
            { bg: true, time: "17:00:00" },
            { bg: true, time: "18:00:00" },
            { bg: true, time: "19:00:00" },
            { bg: true, time: "20:00:00" },
            { bg: true, time: "21:00:00" },
            { bg: true, time: "22:00:00" },
            { bg: true, time: "23:00:00" },
          ],
        },
        {
          day: "星期三",
          box: [
            { bg: true, time: "00:00:00" },
            { bg: true, time: "01:00:00" },
            { bg: true, time: "02:00:00" },
            { bg: true, time: "03:00:00" },
            { bg: true, time: "04:00:00" },
            { bg: true, time: "05:00:00" },
            { bg: true, time: "06:00:00" },
            { bg: true, time: "07:00:00" },
            { bg: true, time: "08:00:00" },
            { bg: true, time: "09:00:00" },
            { bg: true, time: "10:00:00" },
            { bg: true, time: "11:00:00" },
            { bg: true, time: "12:00:00" },
            { bg: true, time: "13:00:00" },
            { bg: true, time: "14:00:00" },
            { bg: true, time: "15:00:00" },
            { bg: true, time: "16:00:00" },
            { bg: true, time: "17:00:00" },
            { bg: true, time: "18:00:00" },
            { bg: true, time: "19:00:00" },
            { bg: true, time: "20:00:00" },
            { bg: true, time: "21:00:00" },
            { bg: true, time: "22:00:00" },
            { bg: true, time: "23:00:00" },
          ],
        },
        {
          day: "星期四",
          box: [
            { bg: true, time: "00:00:00" },
            { bg: true, time: "01:00:00" },
            { bg: true, time: "02:00:00" },
            { bg: true, time: "03:00:00" },
            { bg: true, time: "04:00:00" },
            { bg: true, time: "05:00:00" },
            { bg: true, time: "06:00:00" },
            { bg: true, time: "07:00:00" },
            { bg: true, time: "08:00:00" },
            { bg: true, time: "09:00:00" },
            { bg: true, time: "10:00:00" },
            { bg: true, time: "11:00:00" },
            { bg: true, time: "12:00:00" },
            { bg: true, time: "13:00:00" },
            { bg: true, time: "14:00:00" },
            { bg: true, time: "15:00:00" },
            { bg: true, time: "16:00:00" },
            { bg: true, time: "17:00:00" },
            { bg: true, time: "18:00:00" },
            { bg: true, time: "19:00:00" },
            { bg: true, time: "20:00:00" },
            { bg: true, time: "21:00:00" },
            { bg: true, time: "22:00:00" },
            { bg: true, time: "23:00:00" },
          ],
        },
        {
          day: "星期五",
          box: [
            { bg: true, time: "00:00:00" },
            { bg: true, time: "01:00:00" },
            { bg: true, time: "02:00:00" },
            { bg: true, time: "03:00:00" },
            { bg: true, time: "04:00:00" },
            { bg: true, time: "05:00:00" },
            { bg: true, time: "06:00:00" },
            { bg: true, time: "07:00:00" },
            { bg: true, time: "08:00:00" },
            { bg: true, time: "09:00:00" },
            { bg: true, time: "10:00:00" },
            { bg: true, time: "11:00:00" },
            { bg: true, time: "12:00:00" },
            { bg: true, time: "13:00:00" },
            { bg: true, time: "14:00:00" },
            { bg: true, time: "15:00:00" },
            { bg: true, time: "16:00:00" },
            { bg: true, time: "17:00:00" },
            { bg: true, time: "18:00:00" },
            { bg: true, time: "19:00:00" },
            { bg: true, time: "20:00:00" },
            { bg: true, time: "21:00:00" },
            { bg: true, time: "22:00:00" },
            { bg: true, time: "23:00:00" },
          ],
        },
        {
          day: "星期六",
          box: [
            { bg: true, time: "00:00:00" },
            { bg: true, time: "01:00:00" },
            { bg: true, time: "02:00:00" },
            { bg: true, time: "03:00:00" },
            { bg: true, time: "04:00:00" },
            { bg: true, time: "05:00:00" },
            { bg: true, time: "06:00:00" },
            { bg: true, time: "07:00:00" },
            { bg: true, time: "08:00:00" },
            { bg: true, time: "09:00:00" },
            { bg: true, time: "10:00:00" },
            { bg: true, time: "11:00:00" },
            { bg: true, time: "12:00:00" },
            { bg: true, time: "13:00:00" },
            { bg: true, time: "14:00:00" },
            { bg: true, time: "15:00:00" },
            { bg: true, time: "16:00:00" },
            { bg: true, time: "17:00:00" },
            { bg: true, time: "18:00:00" },
            { bg: true, time: "19:00:00" },
            { bg: true, time: "20:00:00" },
            { bg: true, time: "21:00:00" },
            { bg: true, time: "22:00:00" },
            { bg: true, time: "23:00:00" },
          ],
        },
        {
          day: "星期日",
          box: [
            { bg: true, time: "00:00:00" },
            { bg: true, time: "01:00:00" },
            { bg: true, time: "02:00:00" },
            { bg: true, time: "03:00:00" },
            { bg: true, time: "04:00:00" },
            { bg: true, time: "05:00:00" },
            { bg: true, time: "06:00:00" },
            { bg: true, time: "07:00:00" },
            { bg: true, time: "08:00:00" },
            { bg: true, time: "09:00:00" },
            { bg: true, time: "10:00:00" },
            { bg: true, time: "11:00:00" },
            { bg: true, time: "12:00:00" },
            { bg: true, time: "13:00:00" },
            { bg: true, time: "14:00:00" },
            { bg: true, time: "15:00:00" },
            { bg: true, time: "16:00:00" },
            { bg: true, time: "17:00:00" },
            { bg: true, time: "18:00:00" },
            { bg: true, time: "19:00:00" },
            { bg: true, time: "20:00:00" },
            { bg: true, time: "21:00:00" },
            { bg: true, time: "22:00:00" },
            { bg: true, time: "23:00:00" },
          ],
        },
      ],

      arr: [],
      obj: {
        name: "",
        day_count: "",
        monday_time: [],
        tuesday_time: [],
        wednesday_time: [],
        thursday_time: [],
        friday_time: [],
        saturday_time: [],
        sunday_time: [],
      },
      start: "",
      end: "",
      timer: [],
    };
  },
  created() {
    // this.timeData();
  },
  methods: {
    goback() {
      //   this.$router.go(-1);
    },
    //编辑通道
    handleChange(val) {
      console.log(val);
    },
    //保留天数
    handleChange(val) {
      console.log(val);
    },

    // 刷新列表
    refresh() {
      this.week.forEach((v) => {
        v.box.forEach((k, j) => {
          k.bg = true;
        });
      });
    },
    // 点击星期
    change(item, index) {
      item.box.forEach((v) => {
        v.bg = !v.bg;
      });
    },
    async timeData() {
      this.week.forEach((item, i) => {
        item.box.forEach((k, v) => {
          if (this.start == "" && k.bg) {
            this.start = k.time;
            // console.log(this.start, "开始时间");
          } else if (this.start != "" && !k.bg) {
            this.end = k.time;
            let arr = [];
            arr.push(this.start);
            arr.push(this.end);
            if (item.day == "星期一") {
              this.obj.monday_time.push(arr);
            } else if (item.day == "星期二") {
              this.obj.tuesday_time.push(arr);
            } else if (item.day == "星期三") {
              this.obj.wednesday_time.push(arr);
            } else if (item.day == "星期四") {
              this.obj.thursday_time.push(arr);
            } else if (item.day == "星期五") {
              this.obj.friday_time.push(arr);
            } else if (item.day == "星期六") {
              this.obj.saturday_time.push(arr);
            } else if (item.day == "星期日") {
              this.obj.sunday_time.push(arr);
            }
            this.start = "";
          } else if (k.bg && v == item.box.length - 1) {
            this.end = k.time.split(":")[0] + ":59:59";
            let arr = [];
            arr.push(this.start);
            arr.push(this.end);
            if (item.day == "星期一") {
              this.obj.monday_time.push(arr);
            } else if (item.day == "星期二") {
              this.obj.tuesday_time.push(arr);
            } else if (item.day == "星期三") {
              this.obj.wednesday_time.push(arr);
            } else if (item.day == "星期四") {
              this.obj.thursday_time.push(arr);
            } else if (item.day == "星期五") {
              this.obj.friday_time.push(arr);
            } else if (item.day == "星期六") {
              this.obj.saturday_time.push(arr);
            } else if (item.day == "星期日") {
              this.obj.sunday_time.push(arr);
            }
            this.start = "";
          }
        });
      });
      console.log(this.obj, "时间段");
      let res = await createRecordModel(this.obj);
      if (res.code === 0) {
        this.$message({
          type: "success",
          message: "创建成功",
        });
        this.$router.push({ name: "sipRecordModel" });
      }
    },
    // 点击单元格
    changes(key) {
      key.bg = !key.bg;
    },
    // 点击时间
    hour(i) {
      console.log(i);
      this.week.forEach((v) => {
        v.box.forEach((k, j) => {
          if (j == i) {
            k.bg = !k.bg;
          }
        });
      });
    },
  },
};
</script>

<style lang="css" scoped>
.planList {
  width: 100%;
  height: 100%;
  padding: 0 2%;
  box-sizing: border-box;
}

.main {
  width: 100%;
  background: #fff;
  padding: 2%;
  box-sizing: border-box;
}
.main div {
  margin-bottom: 15px;
}
.main div span {
  font-weight: 600;
  color: skyblue;
  font-size: 18px;
  margin-left: 1rem;
}

.time {
  display: flex;
  flex-direction: column;
  color: #fff;
  margin-top: 10px;
}
.time > .timer {
  display: flex;
}
.time div {
  margin-bottom: 1px;
  margin: 0 1px 1px 0;
  line-height: 40px;
  text-align: center;
}

.check {
  display: flex;
}

.father {
  width: 90px;
  height: 40px;
  background: #2e71fe;
  cursor: pointer;
}
.son {
  width: 40px;
  height: 40px;
  background: #2e71fe;
  cursor: pointer;
}
</style>