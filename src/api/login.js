import fetch from 'utils/fetch';

export function login(username, userpwd) {
  const data = {
    LoginName: username,
    LoginPwd: userpwd
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

