import {
  rolepage, rolelist, roleadd, rolemodify, roledelete, rolemenu,
  menutree, menusbyrid, menuadd, menumodify, menudelete,
  adminpage, adminadd, adminmodify, admindelete
} from 'api/system';

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

    // 角色列表
    RoleList({ commit }) {
      return new Promise((resolve, reject) => {
        rolelist().then(response => {
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

    // 权限编辑
    RoleMenu({ commit }, rm) {
      return new Promise((resolve, reject) => {
        rolemenu(rm.rid, rm.mids).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 全部菜单树
    MenusTree({ commit }, pid) {
      return new Promise((resolve, reject) => {
        menutree(pid).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 角色菜单id集合
    MenusByRid({ commit }, rid) {
      return new Promise((resolve, reject) => {
        menusbyrid(rid).then(response => {
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
    },

    // 用户列表
    AdminPage({ commit }, { pageindex, pagesize, loginrealname }) {
      return new Promise((resolve, reject) => {
        adminpage(pageindex, pagesize, loginrealname).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 用户添加
    AdminAdd({ commit }, admin) {
      return new Promise((resolve, reject) => {
        adminadd(admin).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 用户修改
    AdminModify({ commit }, admin) {
      return new Promise((resolve, reject) => {
        adminmodify(admin).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 用户删除
    AdminDelete({ commit }, id) {
      return new Promise((resolve, reject) => {
        admindelete(id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default system;
