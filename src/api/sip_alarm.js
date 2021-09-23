import service from '@/utils/request'

export const getAlarmList = (params) => {
    return service({
        url: '/sipAlarm/list',
        method: 'get',
        params
    })
}