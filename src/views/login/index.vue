<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">K12在线考试系统</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <el-dialog :modal="false" :visible.sync="dialogRegVisible" title="注册新帐号">
        <el-form ref="regForm" :model="regForm" :rules="regRules" label-position="left">
          <el-form-item label="邮箱" label-width="80px">
            <el-input v-model="regForm.email" autocomplete="off" class="newinput"/>
          </el-form-item>
          <el-form-item label="性别" label-width="80px">
            <el-select v-model="noOne" placeholder="请选择性别" class="newinput">
              <el-option label="未知" value="unknown"/>
              <el-option label="男" value="man"/>
              <el-option label="女" value="woman"/>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" label-width="80px">
            <el-input v-model="regForm.name" autocomplete="off" class="newinput"/>
          </el-form-item>
          <el-form-item label="密码" label-width="80px">
            <el-input v-model="regForm.password" autocomplete="off" class="newinput" type="password"/>
          </el-form-item>
          <el-form-item label="教师编码" label-width="80px">
            <el-input v-model="regForm.number" autocomplete="off" class="newinput"/>
          </el-form-item>
          <el-form-item label="教龄" label-width="80px">
            <el-input v-model="regForm.teachAge" autocomplete="off" class="newinput"/>
          </el-form-item>
          <el-form-item label="就职学校" label-width="80px">
            <el-select v-model="regForm.schoolId" placeholder="请选择就职学校" class="newinput">
              <el-option
                v-for="(item, index) in schoolsList"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="科目" label-width="80px">
            <el-select v-model="regForm.subjectId" placeholder="请选择科目" class="newinput">
              <el-option
                v-for="(item, index) in subjectsList"
                :key="index"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" label-width="80px">
            <el-input v-model="regForm.phone" autocomplete="off" class="newinput"/>
          </el-form-item>
          <el-form-item label="验证码" label-width="80px">
            <el-row>
              <el-col :span="6">
                <el-input v-model="regForm.smsCode" autocomplete="off" class="newinput"/>
              </el-col>
              <el-col :span="6">
                <!-- <el-button :disabled="handleget" type="primary" style="height:47px;margin-left:-20px" @click="isNoRegister">{{ !handleget ? codeButtonText : timeCount}}</el-button> -->
                <el-button :disabled="disabled" type="primary" style="height:47px;margin-left:-20px" @click="isNoRegister1">{{ btntxt }}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogRegVisible = false">取 消</el-button>
          <el-button type="primary" @click="postRegister">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogChangeVisible" :modal="false" title="重置密码">
        <el-form ref="changeForm" :model="changeForm" :rules="changeRules">
          <el-form-item label="手机号码" label-width="80px">
            <el-input v-model="changeForm.phone" autocomplete="off" class="newinput"/>
          </el-form-item>
          <el-form-item label="验证码" label-width="80px">
            <el-row>
              <el-col :span="6">
                <el-input v-model="changeForm.smsCode" autocomplete="off" class="newinput"/>
              </el-col>
              <el-col :span="6">
                <el-button :disabled="disabled2" type="primary" style="height:47px;margin-left:-20px" @click="handleForgetCode">{{ btntxt2 }}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="新密码" label-width="80px">
            <el-input v-model="changeForm.password" autocomplete="off" class="newinput" type="password"/>
          </el-form-item>
          <el-form-item label="确认密码" label-width="80px">
            <el-input v-model="changeForm.passwordAgain" class="newinput" type="password"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogChangeVisible = false">取 消</el-button>
          <el-button type="primary" @click="changePassword">确 定</el-button>
        </div>
      </el-dialog>
      <div class="tips">
        <span style="margin-right:10px;margin-left: 347px"><a @click="dialogRegVisible = true">注册</a></span>
        <span><a @click="dialogChangeVisible=true">忘记密码</a></span>
      </div>
    </el-form>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
import { register, getSchools, getSubjects, isNoRegister, sendSmsCode, changePassword } from '@/api/login'

export default {
  name: 'Login',
  data() {
    return {
      noOne: '',
      dialogRegVisible: false,
      dialogChangeVisible: false,
      disabled: false,
      disabled2: false,
      btntxt: '点击获取验证码',
      btntxt2: '点击获取验证码',
      timeCount2: 0,
      timeCount: 0,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      regRules: {
        email: [{ required: true, trigger: 'blur' }],
        gender: [{ required: true, trigger: 'blur' }],
        name: [{ required: true, trigger: 'blur' }],
        instituteId: [{ required: true, trigger: 'blur' }],
        number: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }],
        phone: [{ required: true, trigger: 'blur' }],
        schoolId: [{ required: true, trigger: 'blur' }],
        smsCode: [{ required: true, trigger: 'blur' }],
        subjectId: [{ required: true, trigger: 'blur' }]
      },
      regForm: {
        email: '',
        name: '',
        number: '',
        password: '',
        phone: '',
        schoolId: '',
        smsCode: '',
        subjectId: '',
        teachAge: ''
      },
      changeForm: {
        phone: '',
        smsCode: '',
        password: ''
      },
      changeRules: {
        phone: [{ required: true, trigger: 'blur' }],
        smsCode: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }],
        passwordAgain: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      schoolsList: [],
      subjectsList: []
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.schools()
    this.subjects()
    this.timer()
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(res => {
            this.loading = false
            console.log(res)
            this.$router.push('/')
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleLogin1() {
      this.$refs.loginForm.validate(valid => {
        this.loading = false
        this.$store.dispatch('VerifyLogin').then(response => {
          console.log(response)
        })
      })
    },
    postRegister() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          this.loading = true
          register(this.regForm).then(res => {
            if (res.data.code === 0) {
              this.$message.success('注册成功')
              this.dialogRegVisible = false
            } else {
              this.$message.error(res.data.errorMsg)
              this.loading = false
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    schools() {
      getSchools().then(res => {
        if (res.data.code === 0) {
          this.schoolsList = res.data.data
        }
      })
    },
    subjects() {
      getSubjects().then(res => {
        if (res.data.code === 0) {
          this.subjectsList = res.data.data.rows
        }
      })
    },
    timer: function() {
      if (this.timeCount > 0) {
        var time = setInterval(() => {
          if (this.timeCount > 0 && this.timeCount <= 60) {
            this.timeCount--
            this.btntxt = this.timeCount + 's后重新获取验证码'
          } else {
            clearInterval(time)
            this.timeCount = 60
            this.btntxt = '点击获取验证码'
            this.disabled = false
          }
        }, 1000)
      } else {
        this.timeCount = 0
        this.btntxt = '点击获取验证码'
        this.disabled = false
      }
    },
    timer2: function() {
      if (this.timeCount2 > 0) {
        var time2 = setInterval(() => {
          if (this.timeCount2 > 0 && this.timeCount2 <= 60) {
            this.timeCount2--
            this.btntxt2 = this.timeCount2 + 's后重新获取验证码'
          } else {
            clearInterval(time2)
            this.timeCount2 = 60
            this.btntxt2 = '点击获取验证码'
            this.disabled2 = false
          }
        }, 1000)
      } else {
        this.timeCount2 = 0
        this.btntxt2 = '点击获取验证码'
        this.disabled2 = false
      }
    },
    isNoRegister1() {
      if (this.regForm.phone) {
        this.timeCount = 60
        this.disabled = true
        this.timer()
      }
      isNoRegister({ phone: this.regForm.phone }).then(res => {
        if (res.data.code === 0) {
          this.sendSmsCode('register_user')
        } else {
          this.$message.error(res.data.errorMsg)
        }
      })
    },
    handleForgetCode() {
      if (this.changeForm.phone) {
        this.timeCount2 = 60
        this.disabled2 = true
        this.timer2()
      }
      this.sendSmsCode('forget_user')
    },
    sendSmsCode(type) {
      sendSmsCode({ phone: type === 'register_user' ? this.regForm.phone : this.changeForm.phone, type: type }).then(res => {
        if (res.data.code === 0) {
          // *
        } else {
          this.$message.error(res.data.errorMsg)
        }
      })
    },
    changePassword() {
      this.$refs.changeForm.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.changeForm.password !== this.changeForm.passwordAgain) {
            this.$message.error('两次密码输入不一致')
            this.loading = false
            return
          } else {
            changePassword(this.changeForm).then(res => {
              if (res.data.code === 0) {
                this.$message.success('修改成功')
                this.dialogChangeVisible = false
              } else {
                this.$message.error(res.data.errorMsg)
                this.loading = false
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#fff;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-input_new {
    .el-input__inner {
      color: #000000;
    }
  }
  .reg-input {
    color: #000;
    border: solid 1px #dcdfe6;
    border-radius: 5px;
    .el-input__inner {
      color: #000;
    }
  }
  .newinput {
    border-radius: 5px;
    border: solid 1px #e9e9e9;
    .el-input__inner {
      color: #000;
    }
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url("../../assets/image/login-bg.jpg") no-repeat;
  background-size: cover;
  // background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    background: hsla(0,0%,100%,.25) border-box;
    overflow: hidden;
    border-radius: .3em;
    box-shadow: 0 0 0 1px hsla(0,0%,100%,.3) inset,
                0 .5em 1em rgba(0, 0, 0, 0.6);
    text-shadow: 0 1px 1px hsla(0,0%,100%,.3);
  }
  .tips {
    font-size: 14px;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #409eff;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
