import service from '@/utils/request'

// @Tags PullStream
// @Summary 创建PullStream
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PullStream true "创建PullStream"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /pullStream/createPullStream [post]
export const createPullStream = (data) => {
  return service({
    url: '/pullStream/createPullStream',
    method: 'post',
    data
  })
}

// @Tags PullStream
// @Summary 删除PullStream
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PullStream true "删除PullStream"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /pullStream/deletePullStream [delete]
export const deletePullStream = (data) => {
  return service({
    url: '/pullStream/deletePullStream',
    method: 'delete',
    data
  })
}

// @Tags PullStream
// @Summary 删除PullStream
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除PullStream"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /pullStream/deletePullStream [delete]
export const deletePullStreamByIds = (data) => {
  return service({
    url: '/pullStream/deletePullStreamByIds',
    method: 'delete',
    data
  })
}

// @Tags PullStream
// @Summary 更新PullStream
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.PullStream true "更新PullStream"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /pullStream/updatePullStream [put]
export const updatePullStream = (data) => {
  return service({
    url: '/pullStream/updatePullStream',
    method: 'put',
    data
  })
}

// @Tags PullStream
// @Summary 用id查询PullStream
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.PullStream true "用id查询PullStream"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /pullStream/findPullStream [get]
export const findPullStream = (params) => {
  return service({
    url: '/pullStream/findPullStream',
    method: 'get',
    params
  })
}

// @Tags PullStream
// @Summary 分页获取PullStream列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取PullStream列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /pullStream/getPullStreamList [get]
export const getPullStreamList = (params) => {
  return service({
    url: '/pullStream/getPullStreamList',
    method: 'get',
    params
  })
}


export const pullStreamPlay = (params) => {
  return service({
    url: '/pullStream/play',
    method: 'get',
    params
  })
}

export const changePullStatus = (data) => {
  return service({
    url: '/pullStream/status',
    method: 'post',
    data
  })
}

export const changePullRequire = (data) => {
  return service({
    url: '/pullStream/require',
    method: 'post',
    data
  })
}

export const changePullRecord = (data) => {
  return service({
    url: '/pullStream/record',
    method: 'post',
    data
  })
}
