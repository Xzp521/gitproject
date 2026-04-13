import request from '@/utils/request'

//${base_api}
const base_api = '/admin/system/sysUser'

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

// 新增用户的方法
export const SaveSysUser = (sysUser) => {
    return request({
        url: "/admin/system/sysUser/saveSysUser",
        method: "post",
        data: sysUser
    })
}

// 修改用户的方法
export const UpdateSysUser = (sysUser) => {
    return request({
        url: "/admin/system/sysUser/updateSysUser",
        method: "put",
        data: sysUser
    })
}

// 删除用户的方法
export const DeleteSysUser = (userId) => {
    return request({
        url: "/admin/system/sysUser/deleteById/" + userId,
        method: "delete"
    })
}

// 给用户分配角色请求
export const DoAssignRoleToUser = (assginRoleVo) => {
    return request({
        url: "/admin/system/sysUser/doAssign",
        method: 'post',
        data: assginRoleVo
    })
}
