import service from '@/utils/request'

// @Tags RecordModel
// @Summary 创建RecordModel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.RecordModel true "创建RecordModel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /recordModel/createRecordModel [post]
export const createRecordModel = (data) => {
  return service({
    url: '/recordModel/createRecordModel',
    method: 'post',
    data
  })
}

// @Tags RecordModel
// @Summary 删除RecordModel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.RecordModel true "删除RecordModel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /recordModel/deleteRecordModel [delete]
export const deleteRecordModel = (data) => {
  return service({
    url: '/recordModel/deleteRecordModel',
    method: 'delete',
    data
  })
}

// @Tags RecordModel
// @Summary 删除RecordModel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除RecordModel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /recordModel/deleteRecordModel [delete]
export const deleteRecordModelByIds = (data) => {
  return service({
    url: '/recordModel/deleteRecordModelByIds',
    method: 'delete',
    data
  })
}

// @Tags RecordModel
// @Summary 更新RecordModel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.RecordModel true "更新RecordModel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /recordModel/updateRecordModel [put]
export const updateRecordModel = (data) => {
  return service({
    url: '/recordModel/updateRecordModel',
    method: 'put',
    data
  })
}

// @Tags RecordModel
// @Summary 用id查询RecordModel
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.RecordModel true "用id查询RecordModel"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /recordModel/findRecordModel [get]
export const findRecordModel = (params) => {
  return service({
    url: '/recordModel/findRecordModel',
    method: 'get',
    params
  })
}

// @Tags RecordModel
// @Summary 分页获取RecordModel列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取RecordModel列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /recordModel/getRecordModelList [get]
export const getRecordModelList = (params) => {
  return service({
    url: '/recordModel/getRecordModelList',
    method: 'get',
    params
  })
}


export const getRecordDeviceIds = (params) => {
  return service({
    url: '/recordModel/getRecordDeviceIds',
    method: 'get',
    params
  })
}

export const selectDevices = (data) => {
  return service({
    url: '/recordModel/selectDevices',
    method: 'post',
    data
  })
}