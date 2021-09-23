import service from '@/utils/request'

// @Tags ZLMediaKit
// @Summary 创建ZLMediaKit
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ZLMediaKit true "创建ZLMediaKit"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /zlm/createZLMediaKit [post]
export const createZLMediaKit = (data) => {
  return service({
    url: '/zlm/createZLMediaKit',
    method: 'post',
    data
  })
}

// @Tags ZLMediaKit
// @Summary 删除ZLMediaKit
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ZLMediaKit true "删除ZLMediaKit"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /zlm/deleteZLMediaKit [delete]
export const deleteZLMediaKit = (data) => {
  return service({
    url: '/zlm/deleteZLMediaKit',
    method: 'delete',
    data
  })
}

// @Tags ZLMediaKit
// @Summary 删除ZLMediaKit
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除ZLMediaKit"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /zlm/deleteZLMediaKit [delete]
export const deleteZLMediaKitByIds = (data) => {
  return service({
    url: '/zlm/deleteZLMediaKitByIds',
    method: 'delete',
    data
  })
}

// @Tags ZLMediaKit
// @Summary 更新ZLMediaKit
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.ZLMediaKit true "更新ZLMediaKit"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /zlm/updateZLMediaKit [put]
export const updateZLMediaKit = (data) => {
  return service({
    url: '/zlm/updateZLMediaKit',
    method: 'put',
    data
  })
}

// @Tags ZLMediaKit
// @Summary 用id查询ZLMediaKit
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.ZLMediaKit true "用id查询ZLMediaKit"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /zlm/findZLMediaKit [get]
export const findZLMediaKit = (params) => {
  return service({
    url: '/zlm/findZLMediaKit',
    method: 'get',
    params
  })
}

// @Tags ZLMediaKit
// @Summary 分页获取ZLMediaKit列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取ZLMediaKit列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /zlm/getZLMediaKitList [get]
export const getZLMediaKitList = (params) => {
  return service({
    url: '/zlm/getZLMediaKitList',
    method: 'get',
    params
  })
}

export const pingZLMediaKitList = (data) => {
  return service({
    url: '/zlm/ping',
    method: 'post',
    data
  })
}