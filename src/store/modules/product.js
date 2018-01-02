import {
  producttypetree, producttypeadd, producttypemodify, producttypedelete,
  productpage, productadd, productmodify, productdelete
} from 'api/product';

const product = {
  actions: {
    // 产品分类树
    ProductTypeTree({ commit }, pid) {
      return new Promise((resolve, reject) => {
        producttypetree(pid).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 产品分类添加
    ProductTypeAdd({ commit }, ptype) {
      return new Promise((resolve, reject) => {
        producttypeadd(ptype.PID, ptype.CatName, ptype.CatSort).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 产品分类修改
    ProductTypeModify({ commit }, ptype) {
      return new Promise((resolve, reject) => {
        producttypemodify(ptype.ID, ptype.PID, ptype.CatName, ptype.CatSort).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 产品分类删除
    ProductTypeDelete({ commit }, id) {
      return new Promise((resolve, reject) => {
        producttypedelete(id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 产品分页
    ProductPage({ commit }, pageparam) {
      return new Promise((resolve, reject) => {
        productpage(pageparam).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 产品添加
    ProductAdd({ commit }, product) {
      return new Promise((resolve, reject) => {
        productadd(product).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 产品修改
    ProductModify({ commit }, product) {
      return new Promise((resolve, reject) => {
        productmodify(product).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 产品删除
    ProductDelete({ commit }, id) {
      return new Promise((resolve, reject) => {
        productdelete(id).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default product;
