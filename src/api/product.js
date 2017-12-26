import fetch from 'utils/fetch';

export function producttypetree(pid) {
  return fetch({
    url: 'ProductType/GetByPid',
    method: 'get',
    params: { pid }
  });
}

export function producttypeadd(PID, CatName, CatSort, status) {
  const data = {
    PID,
    CatName,
    CatSort,
    Status: status ? 2 : 1
  }
  return fetch({
    url: 'ProductType/Add',
    method: 'post',
    data
  });
}

export function producttypemodify(ID, PID, CatName, CatSort, status) {
  const data = {
    ID,
    PID,
    CatName,
    CatSort,
    Status: status ? 2 : 1
  }
  return fetch({
    url: 'ProductType/Modify',
    method: 'put',
    data
  });
}

export function producttypedelete(id) {
  return fetch({
    url: 'ProductType/Delete',
    method: 'delete',
    params: { id }
  });
}

