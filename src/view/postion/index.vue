<template>
  <div class="map">
    <!-- <div class="nav">
      <el-date-picker
        v-model="searchFrom"
        size="small"
        type="datetime"
        placeholder="选择开始日期时间"
        default-time="00:00:00"
        style="width: 11rem"
        align="right"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-date-picker
        v-model="searchTo"
        type="datetime"
        size="small"
        placeholder="选择结束日期时间"
        default-time="00:00:00"
        style="width: 11rem"
        align="right"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-button-group>
        <el-button
          icon="el-icon-search"
          size="small"
          type="primary"
          @click="showHistoryPath"
          >历史轨迹</el-button
        >
        <el-button
          icon="el-icon-search"
          size="small"
          type="primary"
          @click="showLatestPosition"
          >最新位置</el-button
        >
      </el-button-group>
      <div>
        <el-tag style="width: 5rem; text-align: center" size="medium "
          >过期时间</el-tag
        >
        <el-input-number
          v-model="expired"
          :min="300"
          :controls="false"
          size="mini"
          style="width: 4rem"
        ></el-input-number>
      </div>
      <div>
        <el-tag style="width: 5rem; text-align: center" size="medium"
          >上报周期</el-tag
        >
        <el-input-number
          v-model="interval"
          :min="1"
          :controls="false"
          size="mini"
          style="width: 4rem"
        ></el-input-number>
      </div>
      <el-button-group>
        <el-button
          icon="el-icon-search"
          type="primary"
          size="small"
          @click="subscribeMobilePosition"
          >位置订阅</el-button
        >
        <el-button
          icon="el-icon-search"
          type="primary"
          size="small"
          @click="unSubscribeMobilePosition"
          >取消订阅</el-button
        >
      </el-button-group>
    </div> -->
    <div class="baidumap" id="allmap"></div>
    <!-- <div id="r-result">
      请输入:
      <input type="text" id="suggestId" size="20" value="百度" style="width:150px;" />
    </div>-->
  </div>
</template>

<script>
import geoTools from "@/components/GeoConvertTools.js";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      deviceId: "",
      showHistoryPosition: false, //显示历史轨迹
      startTime: null,
      endTime: null,
      searchFrom: null,
      searchTo: null,
      expired: 600,
      interval: 5,
      mobilePositionList: [],
      mapPointList: [],
      parentChannelId: this.$route.query.parentChannelId,
      total: 0,
      isLoging: false,
      autoList: false,
      winHeight: window.innerHeight - 260,
      latitude: "30.663522",
      longitude: "104.072277",
      deviceName: "成都",
    };
  },
  created() {
    if( this.$route.query.deviceId){
       this.deviceId = this.$route.query.deviceId;
    this.latitude = this.$route.query.latitude;
    this.longitude = this.$route.query.longitude;
    this.deviceName = this.$route.query.name;

    }
   

    // console.log(this.$route,'9999999999');
  },

  mounted() {
    this.initBaiduMap();
   
  },
  methods: {
    initBaiduMap() {
      let that = this;
      this.map = new BMap.Map("allmap"); // 创建地图实例
      // let points = [];
      // let point = new BMap.Point(116.231398, 39.567445); // 创建点坐标
      let point = new BMap.Point(that.longitude, that.latitude); // 创建点坐标
      // let point = new BMap.Point(104.14114,30.680785); // 创建点坐标
      this.map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      // let marker= new BMap.Map("allmap").Marker(point)
      // this.map.addOverlay(marker)
      var centerPoint = new BMap.Marker(point);
      this.map.addOverlay(centerPoint);
      console.log(that.deviceName);
      var idandName = `${that.deviceName}<br>
      ${that.deviceId} `;
      var labelandPoint = new BMap.Label(idandName, {
        // position:centerPoint,
        offset: new BMap.Size(20, -20),
      });
      labelandPoint.setStyle({
        // 设置label的样式
        color: "#000",
        fontSize: "14px",
        border: "1px solid #1E90FF",
      });
      console.log(labelandPoint);
      this.map.addOverlay(centerPoint);
      // this.map.addOverlay(labelandPoint);
      centerPoint.setLabel(labelandPoint);
      this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      this.map.addControl(new BMap.NavigationControl());
      this.map.addControl(new BMap.ScaleControl());
      this.map.addControl(new BMap.OverviewMapControl());
      this.map.addControl(new BMap.MapTypeControl());
      //   map.setMapStyle({ style: "midnight" }); //地图风格
    },
    showDevice: function () {
      this.$router.push(this.beforeUrl).then(() => {
        this.initParam();
        this.initData();
      });
    },

    autoListChange: function () {
      if (this.autoList) {
        this.updateLooper = setInterval(this.initData, 1500);
      } else {
        window.clearInterval(this.updateLooper);
      }
    },
    showHistoryPath: function () {
      this.map.clearOverlays();
      this.mapPointList = [];
      this.mobilePositionList = [];
      if (!!this.searchFrom) {
        this.startTime = this.toGBString(this.searchFrom);
        console.log(this.startTime);
      } else {
        this.startTime = null;
      }
      if (!!this.searchTo) {
        this.endTime = this.toGBString(this.searchTo);
        console.log(this.endTime);
      } else {
        this.endTime = null;
      }
      let self = this;
      this.$axios({
        method: "get",
        url: `/api/position/history/${this.deviceId}`,
        params: {
          start: self.startTime,
          end: self.endTime,
        },
      })
        .then(function (res) {
          self.total = res.data.length;
          self.mobilePositionList = res.data;
          console.log(self.mobilePositionList);
          if (self.total == 0) {
            self.$message({
              showClose: true,
              message: "未找到符合条件的移动位置信息",
              type: "error",
            });
          } else {
            self.$nextTick(() => {
              self.showMarkPoints(self);
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    showLatestPosition: function () {
      this.map.clearOverlays();
      this.mapPointList = [];
      this.mobilePositionList = [];
      let self = this;
      this.$axios({
        method: "get",
        url: `/api/position/latest/${this.deviceId}`,
      })
        .then(function (res) {
          console.log(res.data);
          self.total = res.data.length;
          self.mobilePositionList.push(res.data);
          console.log(self.mobilePositionList);
          if (self.total == 0) {
            self.$message({
              showClose: true,
              message: "未找到符合条件的移动位置信息",
              type: "error",
            });
          } else {
            self.$nextTick(() => {
              self.showMarkPoints(self);
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    subscribeMobilePosition: function () {
      let self = this;
      this.$axios({
        method: "get",
        url: `/api/position/subscribe/${this.deviceId}`,
        params: {
          expires: self.expired,
          interval: self.interval,
        },
      })
        .then(function (res) {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    unSubscribeMobilePosition: function () {
      let self = this;
      this.$axios({
        method: "get",
        url: `/api/position/subscribe/${this.deviceId}`,
        params: {
          expires: 0,
          interval: self.interval,
        },
      })
        .then(function (res) {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    toGBString: function (dateTime) {
      return (
        dateTime.getFullYear() +
        "-" +
        this.twoDigits(dateTime.getMonth() + 1) +
        "-" +
        this.twoDigits(dateTime.getDate()) +
        "T" +
        this.twoDigits(dateTime.getHours()) +
        ":" +
        this.twoDigits(dateTime.getMinutes()) +
        ":" +
        this.twoDigits(dateTime.getSeconds())
      );
    },
    twoDigits: function (num) {
      if (num < 10) {
        return "0" + num;
      } else {
        return "" + num;
      }
    },
    showMarkPoints: function (self) {
      let that = self;
      let npointJ = null;
      let npointW = null;
      let point = null;
      for (let i = 0; i < self.mobilePositionList.length; i++) {
        if (self.mobilePositionList[i].geodeticSystem == "BD-09") {
          npointJ = self.mobilePositionList[i].cnLng;
          npointW = self.mobilePositionList[i].cnLat;
          point = new BMap.Point(npointJ, npointW);
        } else {
          npointJ = self.mobilePositionList[i].longitude;
          npointW = self.mobilePositionList[i].latitude;
          let bd2 = geoTools.GPSToBaidu(npointJ, npointW);
          point = new BMap.Point(bd2.lat, bd2.lng);
        }
        self.mapPointList.push(point);
        let marker = new BMap.Marker(point); // 创建标注
        self.map.addOverlay(marker); // 将标注添加到地图中
        //提示信息  可以解析 HTML标签以及CSS
        let infoWindow =
          new BMap.InfoWindow(`<p style='text-align:left;font-weight:800'>设备: ${self.mobilePositionList[i].deviceId}</p>
                            <p style='text-align:left;font-weight:0'>时间: ${self.mobilePositionList[i].time}</p>`);
        // 鼠标移上标注点要发生的事
        marker.addEventListener("mouseover", function () {
          this.openInfoWindow(infoWindow);
        });
        // 鼠标移开标注点要发生的事
        marker.addEventListener("mouseout", function () {
          this.closeInfoWindow(infoWindow);
        });
        // 鼠标点击标注点要发生的事情
        marker.addEventListener("click", function () {
          alert("点击");
        });
      }
      let view = that.map.getViewport(eval(self.mapPointList));
      that.map.centerAndZoom(view.center, view.zoom);
    },
  },
};
</script>

<style lang="scss" scoped>
.map {
  //   width: 100%;
  height: 550px;
  padding: 0px 15px 15px 15px;
  box-sizing: border-box;
}

.map {
  //   width: 100%;
  height: 800px;
  padding: 0px 15px 15px 15px;
  box-sizing: border-box;
  .nav {
    width: 100%;
    height: 8%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .baidumap {
    width: 100%;
    height: 88%;
    border: none;
    margin-top: 10px;

    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   right: 0;
    //   bottom: 0;
    //   margin: auto;
  }
}
</style>