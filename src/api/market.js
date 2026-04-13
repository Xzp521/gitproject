import request from '@/utils/request'

const api_name = '/admin/system/market'
// 获取行情信息
export const FindMarket = () => {
    return request({
        url: `${api_name}/findMarket`,
        method: 'get',
    })
}

//获取连版
export const GetContinuityTrend = (params) => {
    return request({
        url: `${api_name}/getContinuityTrend`,
        method: 'post',
        data: params
    })
}

//日线晋级率
export const GetDayRise = (params) => {
    return request({
        url: `${api_name}/getDayRise`,
        method: 'post',
        data: params
    })
}

//分时晋级率
export const GetTimeRise = (params) => {
    return request({
        url: `${api_name}/getTimeRise`,
        method: 'post',
        data: params
    })
}

//溢价率日报
export const GetYjRateDay = (params) => {
    return request({
        url: `${api_name}/getYjRateDay`,
        method: 'post',
        data: params
    })
}

//分时溢价率
export const GetYjRateTime = (params) => {
    return request({
        url: `${api_name}/getYjRateTime`,
        method: 'post',
        data: params
    })
}

//昨日涨停溢价分布
export const GetYjDistribution = (params) => {
    return request({
        url: `${api_name}/getYjDistribution`,
        method: 'post',
        data: params
    })
}

//涨跌停统计
export const GetLimitDown = (params) => {
    return request({
        url: `${api_name}/getLimitDown`,
        method: 'post',
        data: params
    })
}

//涨跌停分布
export const GetLimitDownDis = (params) => {
    return request({
        url: `${api_name}/getLimitDownDis`,
        method: 'post',
        data: params
    })
}

//股票涨跌停
export const GetStockLimitDown = (params) => {
    return request({
        url: `${api_name}/getStockLimitDown`,
        method: 'post',
        data: params
    })
}

//龙头强势股
export const GetRencentHotStocks = (params) => {
    return request({
        url: `${api_name}/getRencentHotStocks`,
        method: 'post',
        data: params
    })
}

//今日异动股
export const GetAnomalyToday = (params) => {
    return request({
        url: `${api_name}/getAnomalyToday`,
        method: 'post',
        data: params
    })
}

//连版天梯
export const GetConnectedBoardLadder = (params) => {
    return request({
        url: `${api_name}/getConnectedBoardLadder`,
        method: 'post',
        data: params
    })
}