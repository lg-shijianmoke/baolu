<template>
  <div class="system">
    <el-form ref="form" :model="config" label-width="100px" class="system">
      <!--  Setting start  -->
      <h2>系统配置</h2>
      <el-form-item label="环境值">
        <el-input v-model="config.system.env" />
      </el-form-item>
      <el-form-item label="端口值">
        <el-input v-model.number="config.system.addr" />
      </el-form-item>
      <el-form-item label="数据库类型">
        <el-select v-model="config.system.dbType">
          <el-option value="mysql" />
          <el-option value="sqlite" />
          <el-option value="sqlserver" />
          <el-option value="postgresql" />
        </el-select>
      </el-form-item>
      <el-form-item label="Oss类型">
        <el-select v-model="config.system.ossType">
          <el-option value="local" />
          <el-option value="qiniu" />
          <el-option value="tencent-cos" />
          <el-option value="aliyun-oss" />
        </el-select>
      </el-form-item>
      <el-form-item label="配置文件环境变量名">
        <el-input v-model.number="config.system.configEnv" />
      </el-form-item>
      <el-form-item label="数据初始化">
        <el-checkbox v-model="config.system.needInitData">开启</el-checkbox>
      </el-form-item>
      <el-form-item label="多点登录拦截">
        <el-checkbox v-model="config.system.useMultipoint">开启</el-checkbox>
      </el-form-item>
      <!--  Setting end  -->

      <el-form-item>
        <el-button type="primary" @click="update">立即更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getZLMConfig, setZLMConfig } from '@/api/zlm_setting'
export default {
  name: 'Config',
  data() {
    return {
      config: {
        system: {},
        jwt: {},
        casbin: {},
        mysql: {},
        sqlite: {},
        redis: {},
        qiniu: {},
        tencentCOS: {},
        aliyunOSS: {},
        captcha: {},
        zap: {},
        local: {},
        email: {}
      }
    }
  },
  async created() {
    await this.initForm()
  },
  methods: {
    async initForm() {
      const res = await getZLMConfig()
      if (res.code === 0) {
        this.config = res.data
      }
    },
    async update() {
      const res = await setZLMConfig({ config: this.config })
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '配置成功'
        })
        await this.initForm()
      }
    },
  }
}
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
