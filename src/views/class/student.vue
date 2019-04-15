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
            <el-input/>
          </el-col>
          <el-col :span="2">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-table
            :data="table.tableData"
          >
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
              prop="birthday"
              align="center"
              label="生日"
            />
            <el-table-column
              prop="loginPhone"
              align="center"
              label="电话"
            />
            <el-table-column
              align="center"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getStudentList } from '@/api/table'

export default {
  data() {
    return {
      table: {
        tableData: []
      }
    }
  },
  created() {
    getStudentList('1').then(res => {
      if (res.data.errorMsg === '操作成功') {
        this.table.tableData = res.data.data
      }
    })
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
</style>
