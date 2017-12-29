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

export function rolelist() {
  return fetch({
    url: 'Role/GetRoles',
    method: 'get'
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

export function rolemenu(Rid, Mids) {
  const data = {
    Rid,
    Mids
  }
  return fetch({
    url: 'Role/AddRoleMenu',
    method: 'post',
    data
  });
}

export function menutree(pid) {
  return fetch({
    url: 'Menu/GetMenuTree',
    method: 'get',
    params: { pid }
  });
}

export function menusbyrid(rid) {
  return fetch({
    url: 'Menu/GetMenusByRid',
    method: 'get',
    params: { rid }
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

export function adminpage(pageindex, pagesize, loginrealname) {
  return fetch({
    url: 'Admin/PageList',
    method: 'get',
    params: {
      pageindex,
      pagesize,
      loginrealname
    }
  });
}

export function adminadd(admin) {
  const data = admin;
  return fetch({
    url: 'Admin/Add',
    method: 'post',
    data
  });
}

export function adminmodify(admin) {
  const data = admin;
  return fetch({
    url: 'Admin/Modify',
    method: 'put',
    data
  });
}

export function admindelete(id) {
  return fetch({
    url: 'Admin/Delete',
    method: 'delete',
    params: { id }
  });
}