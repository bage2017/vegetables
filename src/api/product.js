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

export function productpage(pageparam) {
  return fetch({
    url: 'Product/GetPage',
    method: 'get',
    params: pageparam
  });
}

export function productadd(product) {
  return fetch({
    url: 'Product/Create',
    method: 'post',
    data: product
  });
}

export function productmodify(product) {
  return fetch({
    url: 'Product/Update',
    method: 'put',
    data: product
  });
}

export function productdelete(id) {
  return fetch({
    url: 'Product/Delete',
    method: 'delete',
    params: { id }
  });
}