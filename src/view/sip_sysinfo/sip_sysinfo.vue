<template>
  <div class="system">
    <el-form ref="form" :model="config" label-width="180px" class="system">
      <h2>SIP信令配置</h2>
      <el-form-item label="SIP ID">
        <el-input v-model="config.lid" readonly />
      </el-form-item>

      <el-form-item label="SIP 地址">
        <el-input v-model="config.addr" readonly />
      </el-form-item>

      <el-form-item label="SIP 域">
        <el-input v-model="config.region" readonly />
      </el-form-item>

      <el-form-item label="SIP 设备前缀">
        <el-input v-model="config.uid" readonly />
      </el-form-item>

      <el-form-item label="SIP 通道设备前缀">
        <el-input v-model="config.did" readonly />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getSipSysInfo } from "@/api/sip_sysinfo";
export default {
  name: "Config",
  data() {
    return {
      config: {
        region: "",
        uid: "",
        did: "",
        lid: "",
        addr:""
      },
    };
  },
  async created() {
    await this.initForm();
  },
  methods: {
    async initForm() {
      const res = await getSipSysInfo();
      if (res.code === 0) {
        this.config = res.data;
      }
    },
  },
};
</script>

<style lang="scss">
.system {
  h2 {
    padding: 10px;
    margin: 10px 0;
    font-size: 16px;
    box-shadow: -4px 1px 3px 0px #e7e8e8;
  }
}
</style>
