<template>
  <div class="card-container">
    <el-card class="table-card">
      <div slot="header" class="clearfix">
        <span>试卷管理</span>
      </div>
      <div class="text item">
        <el-row :gutter="16" type="flex" justify="right">
          <el-col :span="16">
            <el-button type="primary" size="mini" @click="handleNewPaper">新建试卷</el-button>
          </el-col>
          <el-col :span="3">
            <el-input v-model="paper.name" placeholder="请输入试卷名"/>
          </el-col>
          <el-col :span="3">
            <el-select v-model="paper.status" placeholder="请选择">
              <el-option
                label="全部"
                value=""/>
              <el-option
                label="正常"
                value="enabled"/>
              <el-option
                label="禁用"
                value="disabled"/>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="handleGetPaper">查询</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-table
            :data="table.tableData"
            @row-click="handleRow"
          >
            <el-table-column
              width="200"
              prop="name"
              label="试卷名"
              align="center"
            />
            <el-table-column
              prop="description"
              align="center"
              label="描述"
            />
            <el-table-column
              label="状态"
              width="220"
              align="center"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 'enabled'" type="success">正常</el-tag>
                <el-tag v-if="scope.row.status === 'disabled'" type="danger">禁用</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="220"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <!-- 新建试卷dialog层 -->
      <el-dialog :visible.sync="dialogFormVisible" title="新建试卷">
        <el-form :model="newPaper">
          <el-form-item label="试卷名">
            <el-input v-model="newPaper.name" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="试卷描述">
            <el-input v-model="newPaper.description" autocomplete="off"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handlePutNewPaper">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getPaperList, deletePaper, newPaper } from '@/api/table'

export default {
  data() {
    return {
      dialogFormVisible: false,
      table: {
        tableData: []
      },
      paper: {
        name: '',
        pageNum: '0',
        pageSize: '100',
        status: ''
      },
      newPaper: {
        name: '',
        subjectId: '1',
        description: ''
      }
    }
  },
  created() {
    this.handleGetPaper()
  },
  methods: {
    handleGetPaper() {
      getPaperList(this.paper).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.table.tableData = res.data.data.rows
        }
      })
    },
    handleNewPaper() {
      this.newPaper.name = ''
      this.dialogFormVisible = true
    },
    handlePutNewPaper() {
      newPaper(this.newPaper).then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: 'success',
            message: '新建成功!'
          })
          this.dialogFormVisible = false
          this.handleGetPaper()
        }
      })
    },
    handleRow(row, column, event) {
      if (column.target.innerText !== '删除') {
        this.$router.push({
          name: 'paperdetails',
          params: { id: row.id }
        })
      }
    },
    handleDelete(id) {
      this.$confirm('此操作将删除该试卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        deletePaper(id).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.handleGetPaper()
          }
        })
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
    min-height: calc(100vh - 70px);
    margin: 10px;
  }
</style>
