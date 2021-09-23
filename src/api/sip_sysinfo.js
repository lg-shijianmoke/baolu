import service from '@/utils/request'

export const getSipSysInfo = (params) => {
    return service({
        url: '/sipSystemInfo/config',
        method: 'get',
        params
    })
}