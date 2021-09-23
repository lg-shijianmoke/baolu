import service from '@/utils/request'

export const getNVRDeviceList = (params) => {
    return service({
        url: '/nvr/list',
        method: 'get',
        params
    })
}

export const findSipNvr = (params) => {
    return service({
        url: '/nvr/detail',
        method: 'get',
        params
    })
}

export const createSipNvr = (data) => {
    return service({
        url: '/nvr/create',
        method: 'post',
        data
    })
}

export const updateSipNvr = (data) => {
    return service({
        url: '/nvr/update',
        method: 'put',
        data
    })
}

export const deleteSipNvr = (data) => {
    return service({
        url: '/nvr/delete',
        method: 'delete',
        data
    })
}


export const deleteSipNvrByIds = (data) => {
    return service({
        url: '/nvr/deleteByIds',
        method: 'delete',
        data
    })
}

export const changeNvrAuto = (data) => {
    return service({
        url: '/nvr/auto',
        method: 'put',
        data
    })
}

export const changeNvrPlayType = (data) => {
    return service({
        url: '/nvr/tcp',
        method: 'put',
        data
    })
}