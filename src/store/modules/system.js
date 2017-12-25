import { rolepage, roleadd, rolemodify, roledelete } from 'api/system';

const system = {
  actions: {
    // 角色分页
    RolePage({ commit }, pageparam) {
      return new Promise((resolve, reject) => {
        rolepage(pageparam.pageindex, pageparam.pagesize, pageparam.isasc).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 角色添加
    RoleAdd({ commit }, role) {
      return new Promise((resolve, reject) => {
        roleadd(role.RoleName, role.Status, role.Remark).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 角色修改
    RoleModify({ commit }, role) {
      return new Promise((resolve, reject) => {
        rolemodify(role.Id, role.RoleName, role.Status, role.Remark).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 角色删除
    RoleDelete({ commit, id }) {
      return new Promise((resolve, reject) => {
        roledelete(id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default system;
