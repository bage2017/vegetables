import { rolepage, roleadd, rolemodify, roledelete, menutree, menusbypid, menuadd, menumodify, menudelete, menuone } from 'api/system';

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
      const Status = role.Status ? 2 : 1;
      return new Promise((resolve, reject) => {
        roleadd(role.RoleName, Status, role.Remark).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 角色修改
    RoleModify({ commit }, role) {
      const Status = role.Status ? 2 : 1;
      return new Promise((resolve, reject) => {
        rolemodify(role.Id, role.RoleName, Status, role.Remark).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 角色删除
    RoleDelete({ commit }, id) {
      return new Promise((resolve, reject) => {
        roledelete(id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 彩单树
    MenusTree({ commit }, pid) {
      return new Promise((resolve, reject) => {
        menutree(pid).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 子集菜单
    MenusByPid({ commit }, pid) {
      return new Promise((resolve, reject) => {
        menusbypid(pid).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取一条菜单
    MenuOne({ commit }, id) {
      return new Promise((resolve, reject) => {
        menuone(id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 菜单添加
    MenuAdd({ commit }, menu) {
      return new Promise((resolve, reject) => {
        menuadd(menu).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 菜单修改
    MenuModify({ commit }, menu) {
      return new Promise((resolve, reject) => {
        menumodify(menu).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 菜单删除
    MenuDelete({ commit }, id) {
      return new Promise((resolve, reject) => {
        menudelete(id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default system;
