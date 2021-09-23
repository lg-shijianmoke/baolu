import service from '@/utils/request'

export const bigScreenPlay = (data) => {
  return service({
    url: '/bigScreen/play',
    method: 'post',
    data
  })
}

export const bigScreenList = (params) => {
    return service({
        url: '/bigScreen/list',
        method: 'get',
        params
    })
}

export const bigScreenDel = (data) => {
  return service({
    url: '/bigScreen/del',
    method: 'post',
    data
  })
}