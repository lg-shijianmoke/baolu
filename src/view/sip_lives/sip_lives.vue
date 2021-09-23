<template>
  <div>
    <el-row>
      <el-col :span="4"
        ><el-tabs v-model="showType" @tab-click="tabClick">
          <el-tab-pane label="分组列表" name="group"></el-tab-pane>
          <el-tab-pane label="设备列表" name="nvr"></el-tab-pane>
        </el-tabs>
        <el-tree
          :data="treeArr"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-col>
      <el-col :span="20">
        <div class="search-term">
          <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="searchInfo.q" placeholder="设备编号查询" />
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
        <div class="fix-tab-item">
          <div
            class="tab-div"
            v-for="(item, index) in tableData"
            :key="index"
            @click="playDevice(item)"
          >
            <el-card :body-style="tabCardStyle">
              <div>
                <el-image
                  :src="handleImgPath(item.snap)"
                  style="height: 178px"
                  fit="fit"
                >
                  <div slot="error" class="image-slot">
                    <el-image
                      :src="require('@/assets/snapNotFound.png')"
                      fit="fit"
                    />
                  </div>
                </el-image>
              </div>
              <div class="camera-bottom">
                <div>
                  <div>
                    <span>{{ item.name }}</span>
                  </div>
                  <div>
                    <span>{{ item.device_id }}</span>
                  </div>
                </div>
                <div>
                  <el-tag
                    v-if="new Date().getTime() - item.active * 1000 <= 60000"
                    type="success"
                    >{{ item.active | formatActive }}</el-tag
                  >
                  <el-tag v-else type="warning">{{
                    item.active | formatActive
                  }}</el-tag>
                </div>
              </div>
            </el-card>
          </div>
        </div>

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
          :before-close="closePlayDialog"
          :visible.sync="playDialogVisible"
          title="播放"
        >
          <EasyPlayer
            :videoUrl="playUrl"
            fluent
            autoplay
            live
            :decode-wasm="playDecodeWasm"
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
                playStreamInfo.bytesSpeed
                  ? playStreamInfo.bytesSpeed / 1000
                  : 0
              }}KB</el-tag
            >
          </div>
          <div style="margin: 10px">
            <SipPtz :id="playDeviceID"></SipPtz>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getDeviceGroupList } from "@/api/sip_device_group";
import { getNVRDeviceList } from "@/api/sip_nvr";
import { getAllDeviceByType, playSipDevice } from "@/api/sip_device";
import { formatTimeToStr } from "@/utils/date";
import infoList from "@/mixins/infoList";
import EasyPlayer from "@easydarwin/easyplayer";
import SipPtz from "@/components/ptz/ptz";
import { sendWSPush } from "@/utils/socket";
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
      page: 1,
      pageSize: 16,
      listApi: getAllDeviceByType,
      showType: "group",
      nvr_device_id: "",
      group_id: 0,
      groupArr: [],
      nvrArr: [],
      tabCardStyle: {
        padding: "0px",
      },
      playInfo: {
        device_id: "",
        http: "",
        rtmp: "",
        ws_flv: "",
      },
      playUrl: "",
      playType: "http",
      playDeviceInfo: {},
      playDecodeWasm: false,
      playDialogVisible: false,
      treeArr: [],
      defaultProps: {
        children: "children",
       // label: "device_id",
       label:"name"
      },
      playDeviceID: 0,
      playStreamInfo: {},
    };
  },
  async created() {
    await this.getGroupData();
    await this.getNvrData();
    this.treeArr = this.groupArr;
    console.log(this.treeArr)

    this.treeArr.forEach((item)=>{
      item.name=item.device_id
    })


  
    this.searchInfo.type = this.showType;
    this.searchInfo.nvr_device_id = this.nvr_device_id;
    this.searchInfo.group_id = this.group_id;
    await this.getTableData();
  },
  methods: {
    // 条件搜索前端看此方法
    onSubmit() {
      this.searchInfo.type = this.showType;
      this.searchInfo.nvr_device_id = this.nvr_device_id;
      this.searchInfo.group_id = this.group_id;
      this.getTableData();
    },
    async getData() {
      this.searchInfo.type = this.showType;
      this.searchInfo.nvr_device_id = this.nvr_device_id;
      this.searchInfo.group_id = this.group_id;
      await this.getTableData();
    },
    async tabClick(tab) {
      this.page = 1;
      this.pageSize = 16;
      this.showType = tab.name;
      if (this.showType == "group") {
        this.treeArr = this.groupArr;
        this.defaultProps.children = "children";
      } else {
        this.treeArr = this.nvrArr;
        this.defaultProps.children = "devices";
      }
      await this.getData();
    },
    async getGroupData() {
      let res = await getDeviceGroupList({
        page: 1,
        pageSize: 9999,
        child: true,
      });
      this.groupArr = res.data.list;
      console.log(this.groupArr,"groupArr")
      this.groupArr.forEach((item, index) => {
        this.groupArr[index]["device_id"] = item.title;
      });
      this.group_id = res.data.list[0].ID;
    },
    async getNvrData() {
      let res = await getNVRDeviceList({
        page: 1,
        pageSize: 9999,
        child: true,
      });
      this.nvrArr = res.data.list;
      console.log(this.nvrArr,"nvrArr")
      
      this.nvr_device_id = res.data.list[0].device_id;
    },
    handleImgPath(path) {
      let res =
        process.env.VUE_APP_BASE_PATH +
        ":" +
        process.env.VUE_APP_SERVER_PORT +
        path;
      return res;
    },
    async playDevice(item) {
      let res = await playSipDevice({
        ID: item.ID,
      });
      this.playInfo = res.data;
      this.playUrl = res.data.http;
      this.playDeviceInfo = item;
      this.playType = "http";
      this.playDecodeWasm = false;
      this.playDialogVisible = true;
      this.playDeviceID = item.ID;
      this.sendWSmsg(item.stream_id);
      this.getPlayStreamInfo();
    },
    closePlayDialog() {
      this.playInfo = {
        device_id: "",
        http: "",
        rtmp: "",
        ws_flv: "",
      };
      this.playUrl = "";
      this.playType = "http";
      this.playDeviceInfo = {};
      this.playDecodeWasm = false;
      this.playDialogVisible = false;
      this.playDeviceID = 0;
      this.playStreamInfo = {};
      clearInterval(this.playTimer);
      clearInterval(this.getPlayStreamInfoTimer);
      this.getData();
    },
    async handleNodeClick(data, node) {
      console.log(data)
      console.log(node)
      if (node.level == 1) {
        if (this.showType == "group") {
          this.group_id = data.ID;
        } else {
          this.nvr_device_id = data.device_id;
        }
        this.page = 1;
        this.pageSize = 16;
        await this.getData();
      } else {
        this.playDevice(data);
      }
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
    sendWSmsg(stream_id) {
      this.playTimer = setInterval(() => {
        sendWSPush({
          event: "play_stream_info",
          data: JSON.stringify({
            stream_id,
            schema: "rtmp",
          }),
        });
      }, 5000);
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
.camera-bottom {
  line-height: 12px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.tab-div {
  width: 320px;
  margin: 10px;
}

.fix-tab-item {
  display: flex;
  align-items: center;
  justify-content: left;
  flex-wrap: wrap;
}
</style>
