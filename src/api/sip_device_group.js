import service from '@/utils/request'

// @Tags DeviceGroup
// @Summary 创建DeviceGroup
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceGroup true "创建DeviceGroup"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /deviceGroup/createDeviceGroup [post]
export const createDeviceGroup = (data) => {
  return service({
    url: '/deviceGroup/createDeviceGroup',
    method: 'post',
    data
  })
}

// @Tags DeviceGroup
// @Summary 删除DeviceGroup
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceGroup true "删除DeviceGroup"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /deviceGroup/deleteDeviceGroup [delete]
export const deleteDeviceGroup = (data) => {
  return service({
    url: '/deviceGroup/deleteDeviceGroup',
    method: 'delete',
    data
  })
}

// @Tags DeviceGroup
// @Summary 删除DeviceGroup
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除DeviceGroup"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /deviceGroup/deleteDeviceGroup [delete]
export const deleteDeviceGroupByIds = (data) => {
  return service({
    url: '/deviceGroup/deleteDeviceGroupByIds',
    method: 'delete',
    data
  })
}

// @Tags DeviceGroup
// @Summary 更新DeviceGroup
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.DeviceGroup true "更新DeviceGroup"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /deviceGroup/updateDeviceGroup [put]
export const updateDeviceGroup = (data) => {
  return service({
    url: '/deviceGroup/updateDeviceGroup',
    method: 'put',
    data
  })
}

// @Tags DeviceGroup
// @Summary 用id查询DeviceGroup
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.DeviceGroup true "用id查询DeviceGroup"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /deviceGroup/findDeviceGroup [get]
export const findDeviceGroup = (params) => {
  return service({
    url: '/deviceGroup/findDeviceGroup',
    method: 'get',
    params
  })
}

// @Tags DeviceGroup
// @Summary 分页获取DeviceGroup列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取DeviceGroup列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /deviceGroup/getDeviceGroupList [get]
export const getDeviceGroupList = (params) => {
  return service({
    url: '/deviceGroup/getDeviceGroupList',
    method: 'get',
    params
  })
}


export const getAllDevicesWithChild = (params) => {
  return service({
    url: '/deviceGroup/getAllDevicesWithChild',
    method: 'get',
    params
  })
}