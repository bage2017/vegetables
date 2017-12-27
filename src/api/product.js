import fetch from 'utils/fetch';

export function producttypetree(pid) {
  return fetch({
    url: 'ProductType/GetByPid',
    method: 'get',
    params: { pid }
  });
}

export function producttypeadd(PID, CatName, CatSort) {
  const data = {
    PID,
    CatName,
    CatSort
  }
  return fetch({
    url: 'ProductType/Add',
    method: 'post',
    data
  });
}

export function producttypemodify(ID, PID, CatName, CatSort) {
  const data = {
    ID,
    PID,
    CatName,
    CatSort
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

