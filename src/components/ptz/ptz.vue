<template>
  <div>
    <div style="display: flex; justify-content: left">
      <div class="control-wrapper">
        <div
          class="control-btn control-top"
          @mousedown="ptzCamera(0, 2, 0)"
          @mouseup="ptzCamera(0, 0, 0)"
        >
          <i class="el-icon-caret-top"></i>
          <div class="control-inner-btn control-inner"></div>
        </div>
        <div
          class="control-btn control-left"
          @mousedown="ptzCamera(2, 0, 0)"
          @mouseup="ptzCamera(0, 0, 0)"
        >
          <i class="el-icon-caret-left"></i>
          <div class="control-inner-btn control-inner"></div>
        </div>
        <div
          class="control-btn control-bottom"
          @mousedown="ptzCamera(0, 1, 0)"
          @mouseup="ptzCamera(0, 0, 0)"
        >
          <i class="el-icon-caret-bottom"></i>
          <div class="control-inner-btn control-inner"></div>
        </div>
        <div
          class="control-btn control-right"
          @mousedown="ptzCamera(1, 0, 0)"
          @mouseup="ptzCamera(0, 0, 0)"
        >
          <i class="el-icon-caret-right"></i>
          <div class="control-inner-btn control-inner"></div>
        </div>
        <div class="control-round">
          <div class="control-round-inner">
            <i class="fa fa-pause-circle"></i>
          </div>
        </div>
        <div
          style="position: absolute; left: 7.25rem; top: 1.25rem"
          @mousedown="ptzCamera(0, 0, 1)"
          @mouseup="ptzCamera(0, 0, 0)"
        >
          <i
            class="el-icon-zoom-in control-zoom-btn"
            style="font-size: 1.875rem"
          ></i>
        </div>
        <div
          style="
            position: absolute;
            left: 7.25rem;
            top: 3.25rem;
            font-size: 1.875rem;
          "
          @mousedown="ptzCamera(0, 0, 2)"
          @mouseup="ptzCamera(0, 0, 0)"
        >
          <i class="el-icon-zoom-out control-zoom-btn"></i>
        </div>
        <div
          class="contro-speed"
          style="position: absolute; left: 4px; top: 7rem; width: 9rem"
        >
          <el-slider v-model="controlSpeed" :max="255"></el-slider>
        </div>
      </div>

      <div class="control-panel">
        <el-button-group>
          <el-tag
            style="
              position: absolute;
              left: 0rem;
              top: 0rem;
              width: 5rem;
              text-align: center;
            "
            size="medium"
            type="info"
            >预置位编号</el-tag
          >
          <el-input-number
            style="position: absolute; left: 5rem; top: 0rem; width: 6rem"
            size="mini"
            v-model="presetPos"
            controls-position="right"
            :precision="0"
            :step="1"
            :min="1"
            :max="255"
          >
          </el-input-number>
          <el-button
            style="position: absolute; left: 11rem; top: 0rem; width: 5rem"
            size="mini"
            icon="el-icon-add-location"
            @click="presetPosition(129, presetPos)"
            >设置</el-button
          >
          <el-button
            style="position: absolute; left: 27rem; top: 0rem; width: 5rem"
            size="mini"
            type="primary"
            icon="el-icon-place"
            @click="presetPosition(130, presetPos)"
            >调用</el-button
          >
          <el-button
            style="position: absolute; left: 16rem; top: 0rem; width: 5rem"
            size="mini"
            icon="el-icon-delete-location"
            @click="presetPosition(131, presetPos)"
            >删除</el-button
          >
          <el-tag
            style="
              position: absolute;
              left: 0rem;
              top: 2.5rem;
              width: 5rem;
              text-align: center;
            "
            size="medium"
            type="info"
            >巡航速度</el-tag
          >
          <el-input-number
            style="position: absolute; left: 5rem; top: 2.5rem; width: 6rem"
            size="mini"
            v-model="cruisingSpeed"
            controls-position="right"
            :precision="0"
            :min="1"
            :max="4095"
          ></el-input-number>
          <el-button
            style="position: absolute; left: 11rem; top: 2.5rem; width: 5rem"
            size="mini"
            icon="el-icon-loading"
            @click="setSpeedOrTime(134, cruisingGroup, cruisingSpeed)"
            >设置</el-button
          >
          <el-tag
            style="
              position: absolute;
              left: 16rem;
              top: 2.5rem;
              width: 5rem;
              text-align: center;
            "
            size="medium"
            type="info"
            >停留时间</el-tag
          >
          <el-input-number
            style="position: absolute; left: 21rem; top: 2.5rem; width: 6rem"
            size="mini"
            v-model="cruisingTime"
            controls-position="right"
            :precision="0"
            :min="1"
            :max="4095"
          ></el-input-number>
          <el-button
            style="position: absolute; left: 27rem; top: 2.5rem; width: 5rem"
            size="mini"
            icon="el-icon-timer"
            @click="setSpeedOrTime(135, cruisingGroup, cruisingTime)"
            >设置</el-button
          >
          <el-tag
            style="
              position: absolute;
              left: 0rem;
              top: 4.5rem;
              width: 5rem;
              text-align: center;
            "
            size="medium"
            type="info"
            >巡航组编号</el-tag
          >
          <el-input-number
            style="position: absolute; left: 5rem; top: 4.5rem; width: 6rem"
            size="mini"
            v-model="cruisingGroup"
            controls-position="right"
            :precision="0"
            :min="0"
            :max="255"
          ></el-input-number>
          <el-button
            style="position: absolute; left: 11rem; top: 4.5rem; width: 5rem"
            size="mini"
            icon="el-icon-add-location"
            @click="setCommand(132, cruisingGroup, presetPos)"
            >添加点</el-button
          >
          <el-button
            style="position: absolute; left: 16rem; top: 4.5rem; width: 5rem"
            size="mini"
            icon="el-icon-delete-location"
            @click="setCommand(133, cruisingGroup, presetPos)"
            >删除点</el-button
          >
          <el-button
            style="position: absolute; left: 21rem; top: 4.5rem; width: 5rem"
            size="mini"
            icon="el-icon-delete"
            @click="setCommand(133, cruisingGroup, 0)"
            >删除组</el-button
          >
          <el-button
            style="position: absolute; left: 27rem; top: 5rem; width: 5rem"
            size="mini"
            type="primary"
            icon="el-icon-video-camera-solid"
            @click="setCommand(136, cruisingGroup, 0)"
            >巡航</el-button
          >
          <el-tag
            style="
              position: absolute;
              left: 0rem;
              top: 7rem;
              width: 5rem;
              text-align: center;
            "
            size="medium"
            type="info"
            >扫描速度</el-tag
          >
          <el-input-number
            style="position: absolute; left: 5rem; top: 7rem; width: 6rem"
            size="mini"
            v-model="scanSpeed"
            controls-position="right"
            :precision="0"
            :min="1"
            :max="4095"
          ></el-input-number>
          <el-button
            style="position: absolute; left: 11rem; top: 7rem; width: 5rem"
            size="mini"
            icon="el-icon-loading"
            @click="setSpeedOrTime(138, scanGroup, scanSpeed)"
            >设置</el-button
          >
          <el-tag
            style="
              position: absolute;
              left: 0rem;
              top: 9rem;
              width: 5rem;
              text-align: center;
            "
            size="medium"
            type="info"
            >扫描组编号</el-tag
          >
          <el-input-number
            style="position: absolute; left: 5rem; top: 9rem; width: 6rem"
            size="mini"
            v-model="scanGroup"
            controls-position="right"
            :precision="0"
            :step="1"
            :min="0"
            :max="255"
          ></el-input-number>
          <el-button
            style="position: absolute; left: 11rem; top: 9rem; width: 5rem"
            size="mini"
            icon="el-icon-d-arrow-left"
            @click="setCommand(137, scanGroup, 1)"
            >左边界</el-button
          >
          <el-button
            style="position: absolute; left: 16rem; top: 9rem; width: 5rem"
            size="mini"
            icon="el-icon-d-arrow-right"
            @click="setCommand(137, scanGroup, 2)"
            >右边界</el-button
          >
          <el-button
            style="position: absolute; left: 27rem; top: 7rem; width: 5rem"
            size="mini"
            type="primary"
            icon="el-icon-video-camera-solid"
            @click="setCommand(137, scanGroup, 0)"
            >扫描</el-button
          >
          <el-button
            style="position: absolute; left: 27rem; top: 9rem; width: 5rem"
            size="mini"
            type="danger"
            icon="el-icon-switch-button"
            @click="ptzCamera(0, 0, 0)"
            >停止</el-button
          >
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import { normalControl, frontendControl } from "@/api/sip_device";
export default {
  name: "SipPtz",
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      channelId: this.id,
      presetPos: 1,
      cruisingSpeed: 50,
      cruisingTime: 5,
      cruisingGroup: 0,
      scanSpeed: 50,
      scanGroup: 0,
      controlSpeed:50,
    };
  },
  methods: {
    async ptzCamera(leftRight, upDown, zoom) {
      let cmdCode = zoom * 16 + upDown * 4 + leftRight;
      console.log("云台控制：" + leftRight + " : " + upDown + " : " + zoom);
      await frontendControl({
        ID: this.channelId,
        cmd_code: cmdCode,
        horizon_speed: this.controlSpeed,
        vertical_speed: this.controlSpeed,
        zoom_speed: this.controlSpeed,
      });
    },
    async presetPosition(cmdCode, presetPos) {
      console.log(
        "预置位控制：" + this.presetPos + " : 0x" + cmdCode.toString(16)
      );
      await normalControl({
        ID: this.channelId,
        cmd_code: cmdCode,
        parameter1: 0,
        parameter2: presetPos,
        cmd_code2: 0,
      });
    },
    async setSpeedOrTime(cmdCode, groupNum, parameter) {
      let parameter2 = parameter % 256;
      let combindCode2 = Math.floor(parameter / 256) * 16;
      console.log(
        "前端控制：0x" +
          cmdCode.toString(16) +
          " 0x" +
          groupNum.toString(16) +
          " 0x" +
          parameter2.toString(16) +
          " 0x" +
          combindCode2.toString(16)
      );
      await normalControl({
        ID: this.channelId,
        cmd_code: cmdCode,
        parameter1: groupNum,
        parameter2: parameter2,
        cmd_code2: combindCode2,
      });
    },
    async setCommand(cmdCode, groupNum, parameter) {
      console.log(
        "前端控制：0x" +
          cmdCode.toString(16) +
          " 0x" +
          groupNum.toString(16) +
          " 0x" +
          parameter.toString(16) +
          " 0x0"
      );
      await normalControl({
        ID: this.channelId,
        cmd_code: cmdCode,
        parameter1: groupNum,
        parameter2: parameter,
        cmd_code2: 0,
      });
    },
  },
};
</script>

<style>
.control-wrapper {
  position: relative;
  width: 6.25rem;
  height: 6.25rem;
  max-width: 6.25rem;
  max-height: 6.25rem;
  border-radius: 100%;
  margin-top: 1.5rem;
  margin-left: 0.5rem;
  float: left;
}

.control-panel {
  position: relative;
  top: 0;
  left: 5rem;
  height: 11rem;
  max-height: 11rem;
}

.control-btn {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 44%;
  height: 44%;
  border-radius: 5px;
  border: 1px solid #78aee4;
  box-sizing: border-box;
  transition: all 0.3s linear;
}
.control-btn:hover {
  cursor: pointer;
}

.control-btn i {
  font-size: 20px;
  color: #78aee4;
  display: flex;
  justify-content: center;
  align-items: center;
}
.control-btn i:hover {
  cursor: pointer;
}
.control-zoom-btn:hover {
  cursor: pointer;
}

.control-round {
  position: absolute;
  top: 21%;
  left: 21%;
  width: 58%;
  height: 58%;
  background: #fff;
  border-radius: 100%;
}

.control-round-inner {
  position: absolute;
  left: 13%;
  top: 13%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 70%;
  font-size: 40px;
  color: #78aee4;
  border: 1px solid #78aee4;
  border-radius: 100%;
  transition: all 0.3s linear;
}

.control-inner-btn {
  position: absolute;
  width: 60%;
  height: 60%;
  background: #fafafa;
}

.control-top {
  top: -8%;
  left: 27%;
  transform: rotate(-45deg);
  border-radius: 5px 100% 5px 0;
}

.control-top i {
  transform: rotate(45deg);
  border-radius: 5px 100% 5px 0;
}

.control-top .control-inner {
  left: -1px;
  bottom: 0;
  border-top: 1px solid #78aee4;
  border-right: 1px solid #78aee4;
  border-radius: 0 100% 0 0;
}

.control-top .fa {
  transform: rotate(45deg) translateY(-7px);
}

.control-left {
  top: 27%;
  left: -8%;
  transform: rotate(45deg);
  border-radius: 5px 0 5px 100%;
}

.control-left i {
  transform: rotate(-45deg);
}

.control-left .control-inner {
  right: -1px;
  top: -1px;
  border-bottom: 1px solid #78aee4;
  border-left: 1px solid #78aee4;
  border-radius: 0 0 0 100%;
}

.control-left .fa {
  transform: rotate(-45deg) translateX(-7px);
}

.control-right {
  top: 27%;
  right: -8%;
  transform: rotate(45deg);
  border-radius: 5px 100% 5px 0;
}

.control-right i {
  transform: rotate(-45deg);
}

.control-right .control-inner {
  left: -1px;
  bottom: -1px;
  border-top: 1px solid #78aee4;
  border-right: 1px solid #78aee4;
  border-radius: 0 100% 0 0;
}

.control-right .fa {
  transform: rotate(-45deg) translateX(7px);
}

.control-bottom {
  left: 27%;
  bottom: -8%;
  transform: rotate(45deg);
  border-radius: 0 5px 100% 5px;
}

.control-bottom i {
  transform: rotate(-45deg);
}

.control-bottom .control-inner {
  top: -1px;
  left: -1px;
  border-bottom: 1px solid #78aee4;
  border-right: 1px solid #78aee4;
  border-radius: 0 0 100% 0;
}

.control-bottom .fa {
  transform: rotate(-45deg) translateY(7px);
}
</style>