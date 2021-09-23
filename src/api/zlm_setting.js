import service from '@/utils/request'

export const getZLMConfig = (params) => {
    return service({
        url: '/zlmSetting/getConfig',
        method: 'get',
        params
    })
}

export const setZLMConfig = (data) => {
    return service({
        url: '/zlmSetting/setConfig',
        method: 'post',
        data
    })
}