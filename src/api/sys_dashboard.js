import service from '@/utils/request'

export const dashboardData = (params) => {
    return service({
        url: '/dashboard',
        method: 'get',
        params
    })
}