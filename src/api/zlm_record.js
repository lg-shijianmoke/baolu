import service from '@/utils/request'

export const getZLMRecordList = (params) => {
    return service({
        url: '/zlmRecord/list',
        method: 'get',
        params
    })
}

export const playZLMRecord = (data) => {
    return service({
        url: '/zlmRecord/play',
        method: 'post',
        data
    })
}