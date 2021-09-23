import service from '@/utils/request'

// @Tags SipDevice
// @Summary 创建SipDevice
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SipDevice true "创建SipDevice"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sipDevice/createSipDevice [post]
export const createSipDevice = (data) => {
  return service({
    url: '/sipDevice/createSipDevice',
    method: 'post',
    data
  })
}

// @Tags SipDevice
// @Summary 删除SipDevice
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SipDevice true "删除SipDevice"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sipDevice/deleteSipDevice [delete]
export const deleteSipDevice = (data) => {
  return service({
    url: '/sipDevice/deleteSipDevice',
    method: 'delete',
    data
  })
}

// @Tags SipDevice
// @Summary 删除SipDevice
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除SipDevice"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sipDevice/deleteSipDevice [delete]
export const deleteSipDeviceByIds = (data) => {
  return service({
    url: '/sipDevice/deleteSipDeviceByIds',
    method: 'delete',
    data
  })
}

// @Tags SipDevice
// @Summary 更新SipDevice
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SipDevice true "更新SipDevice"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sipDevice/updateSipDevice [put]
export const updateSipDevice = (data) => {
  return service({
    url: '/sipDevice/updateSipDevice',
    method: 'put',
    data
  })
}

// @Tags SipDevice
// @Summary 用id查询SipDevice
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SipDevice true "用id查询SipDevice"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sipDevice/findSipDevice [get]
export const findSipDevice = (params) => {
  return service({
    url: '/sipDevice/findSipDevice',
    method: 'get',
    params
  })
}

// @Tags SipDevice
// @Summary 分页获取SipDevice列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取SipDevice列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sipDevice/getSipDeviceList [get]
export const getSipDeviceList = (params) => {
  return service({
    url: '/sipDevice/getSipDeviceList',
    method: 'get',
    params
  })
}

export const recordSipDevice = (data) => {
  return service({
    url: '/sipDevice/record',
    method: 'post',
    data
  })
}

export const requireSipDevice = (data) => {
  return service({
    url: '/sipDevice/require',
    method: 'post',
    data
  })
}

export const playSipDevice = (data) => {
  return service({
    url: '/sipDevice/play',
    method: 'post',
    data
  })
}

export const getAllDeviceByType = (params) => {
  return service({
    url: '/sipDevice/getAllDeviceByType',
    method: 'get',
    params
  })
}

export const normalControl = (data) => {
  return service({
    url: '/sipDevice/control/normal',
    method: 'post',
    data
  })
}

export const frontendControl = (data) => {
  return service({
    url: '/sipDevice/control/frontend',
    method: 'post',
    data
  })
}

export const sipRecordList = (params) => {
  return service({
    url: '/sipDevice/sipRecordList',
    method: 'get',
    params
  })
}

export const sipRecordReplay = (data) => {
  return service({
    url: '/sipDevice/sipRecordReplay',
    method: 'post',
    data
  })
}

export const sipRecordControl = (data) => {
  return service({
    url: '/sipDevice/sipRecordControl',
    method: 'post',
    data
  })
}