import fetch from 'utils/fetch';

export function login(LoginName, LoginPwd) {
  const data = {
    LoginName,
    LoginPwd
  };
  return fetch({
    url: 'Admin/Login',
    method: 'post',
    data
  });
}

export function logout() {
  return fetch({
    url: 'Admin/LogOut',
    method: 'delete'
  });
}

export function getInfo() {
  return fetch({
    url: 'Admin/GetById',
    method: 'get',
    params: { id: -6 }
  });
}

