<template>
  <div class="card-container">
    <el-card class="table-card">
      <div slot="header" class="clearfix">
        <span>学生管理</span>
      </div>
      <div class="text item">
        <el-row :gutter="16" type="flex" justify="right">
          <el-col :span="19">
            <!-- <el-button type="primary">新增学生</el-button> -->
          </el-col>
          <el-col :span="3">
            <el-select v-model="classId" placeholder="请选择班级">
              <el-option
                v-for="(item, index) in classlist"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input/>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="studentList">查询</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-table
            :data="table.tableData"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="table-expand">
                  <el-form-item label="姓名">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="学号">
                    <span>{{ props.row.number }}</span>
                  </el-form-item>
                  <el-form-item label="性别">
                    <!-- <span>{{ props.row.gender }}</span> -->
                    <span>男</span>
                  </el-form-item>
                  <el-form-item label="联系电话">
                    <span>{{ props.row.loginPhone }}</span>
                  </el-form-item>
                  <el-form-item label="学校">
                    <span>实验小学</span>
                  </el-form-item>
                  <el-form-item label="家长电话">
                    <span>15915940033</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              prop="name"
              label="姓名"
              align="center"
            />
            <el-table-column
              prop="number"
              align="center"
              label="学号"
            />
            <el-table-column
              width="100"
              align="center"
              label="性别"
            >
              <template slot-scope="scope">
                <svg-icon v-if="scope.row.gender === 'man'" icon-class="man"/>
                <svg-icon v-if="scope.row.gender === 'woman'" icon-class="woman"/>
                <svg-icon v-if="scope.row.gender === 'unknown'" icon-class="unknown"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="email"
              align="center"
              label="邮箱"
            />
            <el-table-column
              prop="loginPhone"
              align="center"
              label="电话"
            />
          </el-table>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getClassList, getStudentList } from '@/api/table'

export default {
  data() {
    return {
      classId: '',
      classlist: [],
      table: {
        tableData: []
      }
    }
  },
  created() {
    this.classList()
  },
  methods: {
    classList() {
      getClassList().then(res => {
        if (res.data.code === 0) {
          this.classlist = res.data.data
          console.log(this.classlist)
        }
      })
    },
    studentList() {
      getStudentList(this.classId).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.table.tableData = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scope>
  .card-container {
    width: calc(100vw - 180px);
  }
  .table-card {
    width: calc(100vw - 200px);
    height: calc(100vh - 70px);
    margin: 10px;
  }
  .table-expand {
    font-size: 0;
    .label {
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
</style>
