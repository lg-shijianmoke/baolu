import service from '@/utils/request'

// @Tags PushStream
// @Summary 创建PushStream
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PushStream true "创建PushStream"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /pushStream/createPushStream [post]
export const createPushStream = (data) => {
  return service({
    url: '/pushStream/createPushStream',
    method: 'post',
    data
  })
}

// @Tags PushStream
// @Summary 删除PushStream
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PushStream true "删除PushStream"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /pushStream/deletePushStream [delete]
export const deletePushStream = (data) => {
  return service({
    url: '/pushStream/deletePushStream',
    method: 'delete',
    data
  })
}

// @Tags PushStream
// @Summary 删除PushStream
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除PushStream"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /pushStream/deletePushStream [delete]
export const deletePushStreamByIds = (data) => {
  return service({
    url: '/pushStream/deletePushStreamByIds',
    method: 'delete',
    data
  })
}

// @Tags PushStream
// @Summary 更新PushStream
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PushStream true "更新PushStream"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /pushStream/updatePushStream [put]
export const updatePushStream = (data) => {
  return service({
    url: '/pushStream/updatePushStream',
    method: 'put',
    data
  })
}

// @Tags PushStream
// @Summary 用id查询PushStream
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.PushStream true "用id查询PushStream"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /pushStream/findPushStream [get]
export const findPushStream = (params) => {
  return service({
    url: '/pushStream/findPushStream',
    method: 'get',
    params
  })
}

// @Tags PushStream
// @Summary 分页获取PushStream列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取PushStream列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /pushStream/getPushStreamList [get]
export const getPushStreamList = (params) => {
  return service({
    url: '/pushStream/getPushStreamList',
    method: 'get',
    params
  })
}
