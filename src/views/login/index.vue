<template>
    <div class="login-container" style="background-color: #141a48;margin: 0px;overflow: hidden;">
    <div id="canvascontainer" ref='can'></div>
    <Form ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules"  class="card-box login-form">
        <Form-item prop="LoginName">
            <Input type="text" v-model="loginForm.LoginName" placeholder="Username" autoComplete="on">
                <Icon type="ios-person-outline" slot="prepend" ></Icon>
            </Input>
        </Form-item>
        <Form-item prop="LoginPwd">
            <Input type="password" v-model="loginForm.LoginPwd" placeholder="Password" @keyup.enter.native="handleLogin">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleLogin('loginForm')" long>登录</Button>
        </Form-item>
           </Form>
    </div>
</template>
<script>
let wwidth = window.innerWidth,
  wheight = window.innerHeight;
export default {
  name: 'login',
  data() {
    const validateUser = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('用户名不能小于3位'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        LoginName: 'admin',
        LoginPwd: ''
      },
      loginRules: {
        LoginName: [
          { required: true, trigger: 'blur', validator: validateUser }
        ],
        LoginPwd: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      showDialog: false
    };
  },
  mounted() {
    container = document.createElement('div');
    this.$refs.can.appendChild(container);
    camera = new THREE.PerspectiveCamera(75, wwidth / wheight, 1, 10000);
    camera.position.z = 1000;
    scene = new THREE.Scene();
    particles = new Array();
    let PI2 = Math.PI * 2;
    let material = new THREE.ParticleCanvasMaterial({
      color: 0x0078de,
      program(context) {
        context.beginPath();
        context.arc(0, 0, 1, 0, PI2, true);
        context.fill();
      }
    });
    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        particle = particles[i++] = new THREE.Particle(material);
        particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2;
        particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2;
        scene.add(particle);
      }
    }
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(wwidth, wheight);
    container.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove, false); //
    window.addEventListener('resize', onWindowResize, false);
    animate();
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('Login', this.loginForm)
            .then(response => {
              if (response.Code == 200) {
                this.$Message.success('登录成功');
                this.loading = false;
                this.$router.push({ path: '/' });
              } else {
                this.$Message.error(response.Message);
              }
            })
            .catch(err => {
              this.$Message.error(err);
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1);
      // const hashObj = getQueryObject(hash);
      // const originUrl = window.location.origin;
      // history.replaceState({}, '', originUrl);
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // };
      // const codeName = hashObj[codeMap[this.auth_type]];
      // if (!codeName) {
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' });
      //   });
      // }
    }
  },
  init() {},
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan);
  }
};

var SEPARATION = 100,
  AMOUNTX = 50,
  AMOUNTY = 50;
let container;
let camera, scene, renderer;
let particles,
  particle,
  count = 0;
let mouseX = 0,
  mouseY = 0;
let windowHalfX = wwidth / 2;
let windowHalfY = wheight / 2; // animate();
function init() {}
function onWindowResize() {
  windowHalfX = wwidth / 2;
  windowHalfY = wheight / 2;
  camera.aspect = wwidth / wheight;
  camera.updateProjectionMatrix();
  renderer.setSize(wwidth, wheight);
}
function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}
function onDocumentTouchStart(event) {
  if (event.touches.length === 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length === 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}
function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
  let i = 0;
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++];
      particle.position.y =
        Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
      particle.scale.x = particle.scale.y =
        (Math.sin((ix + count) * 0.3) + 1) * 2 +
        (Math.sin((iy + count) * 0.5) + 1) * 2;
    }
  }
  renderer.render(scene, camera);
  count += 0.1;
}
</script>
<style>
.login-container a {
  color: #0078de;
}
body {
  overflow: hidden;
}
#canvascontainer {
  position: absolute;
  top: 0px;
}
.wz-input-group-prepend {
  background-color: #141a48;
  border: 1px solid #2d8cf0;
  border-right: none;
  color: #2d8cf0;
}
</style>

<style rel="stylesheet/scss" lang="scss">
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}
.login-container {
  height: 100vh;
  background-color: #2d3a4b;

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  input {
    background: transparent;
    border: 1px solid #2d8cf0;
    -webkit-appearance: none;
    border-radius: 3px;
    padding: 12px 5px 12px 15px;
    color: #eeeeee;
    height: 47px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: #eeeeee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .forget-pwd {
    color: #fff;
  }
}
</style>
