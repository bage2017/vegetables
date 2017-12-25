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

export function roleadd(RoleName, Status, Remark) {
  const data = {
    RoleName,
    Status,
    Remark
  };
  return fetch({
    url: 'Role/Add',
    method: 'post',
    data
  });
}

export function rolemodify(Id, RoleName, Status, Remark) {
  const data = {
    Id,
    RoleName,
    Status,
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

