import request from '@/utils/request'

// 分页查询角色数据
export const GetSysUserListByPage = (pageNum , pageSize , queryDto) => {
    return request({
        url: '/admin/system/sysUser/findByPage/' + pageNum + "/" + pageSize,
        method: 'get',
        //接口 使用 requestbody 使用data
        //没有注解 使用parems
        params: queryDto
    })
}