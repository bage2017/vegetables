import fetch from 'utils/fetch';

export function rolepage(pageindex, pagesize, isasc) {
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

export function roleadd(RoleName, Remark) {
  const data = {
    RoleName,
    Remark
  };
  return fetch({
    url: 'Role/Add',
    method: 'post',
    data
  });
}

export function rolemodify(Id, RoleName, Remark) {
  const data = {
    Id,
    RoleName,
    Remark
  };
  return fetch({
    url: 'Role/Modify',
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

