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

export function menutree(pid) {
  return fetch({
    url: 'Menu/GetMenuTree',
    method: 'get',
    params: { pid }
  });
}

export function menusbypid(pid) {
  return fetch({
    url: 'Menu/GetMenusByPid',
    method: 'get',
    params: { pid }
  });
}

export function menuadd(menu) {
  return fetch({
    url: 'Menu/Add',
    method: 'post',
    data: menu
  });
}

export function menumodify(menu) {
  return fetch({
    url: 'Menu/Modify',
    method: 'put',
    data: menu
  });
}

export function menudelete(id) {
  return fetch({
    url: 'Menu/Delete',
    method: 'delete',
    params: { id }
  });
}

export function menuone(id) {
  return fetch({
    url: 'Menu/GetOne',
    method: 'get',
    params: { id }
  });
}