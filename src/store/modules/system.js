import { rolepage, roleadd, rolemodify, roledelete } from 'api/system';

const role = {
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
    RoleAdd({ commit, role }) {
      return new Promise((resolve, reject) => {
        roleadd(role.RoleName, role.Remark).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 角色修改
    RoleModify({ commit, state }) {
      return new Promise((resolve, reject) => {
        rolemodify(state.Id, state.RoleName, state.Remark).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 角色删除
    RoleDelete({ commit, state }) {
      return new Promise((resolve, reject) => {
        roledelete(state.id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default role;
