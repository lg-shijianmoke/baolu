<template>
  <div>
    <div>
      <div class="fix-center">
        <el-radio-group
          v-model="screenType"
          @change="changeScreenType"
          style="margin-bottom: 30px"
        >
          <el-radio-button label="1" :value="1">单屏</el-radio-button>
          <el-radio-button label="4" :value="4">四分屏</el-radio-button>
          <el-radio-button label="9" :value="9">九分屏</el-radio-button>
          <el-radio-button label="16" :value="16">十六分屏</el-radio-button>
        </el-radio-group>
      </div>

      <el-row :gutter="2" v-for="rowIndex in spanCount" :key="rowIndex">
        <el-col
          :span="24 / spanCount"
          v-for="colIndex in spanCount"
          :key="colIndex"
        >
          <div>
            <div style="position: relative">
              <a
                style="position: absolute; right: 0; z-index: 999"
                @click="delScore(getComputedItem(rowIndex, colIndex).score)"
                type="text"
                >清除播放</a
              >
              <a
                style="position: absolute; left: 0; z-index: 999"
                @click="openDialog(getComputedItem(rowIndex, colIndex).score)"
                type="text"
                >选择通道</a
              >
            </div>
            <!-- {{ Math.sqrt(screenType) * (rowIndex - 1) + colIndex }} -->
            <EasyPlayer
              :videoUrl="getComputedItem(rowIndex, colIndex).url"
              fluent
              autoplay
              live
            >
            </EasyPlayer>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :before-close="closeDialog"
      :visible.sync="dialogFormVisible"
      title="选择通道"
    >
      <el-select v-model="deviceId" @change="chooseDevice" placeholder="请选择">
        <el-option-group
          v-for="nvr in nvrWithChildArr"
          :key="nvr.ID"
          :label="nvr.name ? nvr.name : nvr.device_id"
        >
          <el-option
            v-for="device in nvr.devices"
            :key="device.ID"
            :label="device.name ? device.name : device.device_id"
            :value="device.ID"
          >
          </el-option>
        </el-option-group>
      </el-select>
    </el-dialog>
  </div>
</template>

<script>
import { bigScreenPlay, bigScreenList, bigScreenDel } from "@/api/big_screen";
import { getNVRDeviceList } from "@/api/sip_nvr";
import EasyPlayer from "@easydarwin/easyplayer";
export default {
  name: "BigScreen",
  components: {
    EasyPlayer,
  },
  filters: {
    formatStreamStatus(status) {
      return status ? "在线" : "离线";
    },
  },
  created() {
    this.changeScreenType(9);
    this.getAllDeviceData();
  },
  data() {
    return {
      playList: [],
      dialogFormVisible: false,
      page: 1,
      pageSize: 15,
      nvrWithChildArr: [],
      formData: {
        score: 0,
        id: 0,
      },
      screenType: 9,
      spanCount: 3,
      deviceId:0
    };
  },
  methods: {
    async getAllDeviceData() {
      let res = await getNVRDeviceList({
        page: 1,
        pageSize: 9999,
        child: true,
      });
      this.nvrWithChildArr = res.data.list;
    },
    async getPlayListData() {
      let _this = this;
      let res = await bigScreenList({
        screen_type: parseInt(_this.screenType),
      });
      if (res.code == 0) {
        res.data.forEach((item) => {
          _this.playList[item.score - 1] = { score: item.score, url: item.url };
        });
      }
      this.$forceUpdate()
    },
    openDialog(score) {
      this.formData.score = score;
      this.dialogFormVisible = true;
    },
    closeDialog() {
      this.formData = {
        score: 0,
        id: 0,
      };
      this.dialogFormVisible = false;
    },
    async chooseDevice(id) {
      this.formData.id = id;
      let res = await bigScreenPlay(this.formData);
      if (res.code == 0) {
        let score = res.data.score;
        let url = res.data.url;
        this.playList[score - 1] = { score, url };
        this.closeDialog();
      }
    },
    async delScore(score) {
      let res = await bigScreenDel({ score });
      if (res.code == 0) {
        this.playList[score - 1].url = "";
      }
      this.$forceUpdate()
    },
    changeScreenType(screenType) {
      this.playList = [];
      this.screenType = parseInt(screenType);
      this.spanCount = Math.sqrt(this.screenType);
      for (let i = 1; i < parseInt(screenType) + 1; i++) {
        this.playList.push({
          score: i,
          url: "",
        });
      }
      this.getPlayListData();
    },
    getComputedItem(rowIndex, colIndex) {
      let index = this.spanCount * (rowIndex - 1) + colIndex - 1;
      return this.playList[index];
    },
  },
};
</script>

<style>
.fix-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

#text-absolute-left {
  position: relative;
  float: left;
  z-index: 999;
}

#text-absolute-right {
  position: relative;
  float: right;
  z-index: 999;
}
</style>>