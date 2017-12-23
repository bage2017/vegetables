import fetch from 'utils/fetch';

export function rolelist(pageindex, pagesize, isasc) {
  return fetch({
    url: 'Role/PageList',
    method: 'get',
    params: {
      pageindex,
      pagesize,
      isasc
    }
  });
}

export function roleadd(rolename, remark) {
  const data = {
    RoleName: rolename,
    Remark: remark
  };
  return fetch({
    url: 'Role/Add',
    method: 'post',
    data
  });
}

export function rolemodify(rolename, remark) {
  const data = {
    RoleName: rolename,
    Remark: remark
  };
  return fetch({
    url: 'Role/Add',
    method: 'put',
    data
  });
}

export function roledelete(id) {
  return fetch({
    url: 'Role/Delete',
    method: 'delete',
    params: { id }
  });
}

