<template>
  <div class="card-container">
    <el-card class="table-card">
      <div slot="header" class="clearfix">
        <span>场次列表</span>
      </div>
      <div class="text item">
        <el-row :gutter="16" type="flex" justify="right">
          <el-col :span="16">
            <el-button type="primary" size="mini" @click="handlenewExam">新建场次</el-button>
          </el-col>
          <el-col :span="3">
            <el-input v-model="exam.name" placeholder="请输入试卷名"/>
          </el-col>
          <el-col :span="3">
            <el-select v-model="exam.status" placeholder="请选择">
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
            <el-button type="primary" @click="handleGetExam">查询</el-button>
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
              label="场次名称"
              align="center"
            />
            <el-table-column
              prop="remark"
              align="center"
              label="描述"
            />
            <el-table-column
              prop="remark"
              align="center"
              label="考试班级"
            />
            <el-table-column
              prop="remark"
              align="center"
              label="考试人数"
              width="100"
            />
            <el-table-column
              label="考试时间"
              width="300"
              align="center"
            >
              <template slot-scope="scope">
                <svg-icon icon-class="date"/>
                <el-tag v-if="scope.row.status === 'disabled'" type="danger">禁用</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="场次状态"
              width="100"
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
                  @click="handleEdit(scope.row.id)">编辑</el-button>
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
      <el-dialog :visible.sync="dialogAddVisible" title="新建试卷">
        <el-form :model="newExam">
          <el-form-item label="试卷名">
            <el-input v-model="newExam.name"/>
          </el-form-item>
          <el-form-item label="试卷描述">
            <el-input v-model="newExam.description"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handlePutAddExam">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑试卷dialog层 -->
      <el-dialog :visible.sync="dialogEditVisible" title="新建试卷">
        <el-form :model="newExam">
          <el-form-item label="试卷名">
            <el-input v-model="newExam.name"/>
          </el-form-item>
          <el-form-item label="试卷描述">
            <el-input v-model="newExam.description"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="handlePutEditExam">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getExamList, deleteExam, addExam, editExam } from '@/api/table'

export default {
  data() {
    return {
      dialogAddVisible: false,
      dialogEditVisible: false,
      table: {
        tableData: []
      },
      exam: {
        name: '',
        pageNum: '0',
        pageSize: '100',
        status: ''
      },
      newExam: {
        name: '',
        subjectId: '1',
        description: ''
      }
    }
  },
  created() {
    this.handleGetExam()
  },
  methods: {
    handleGetExam() {
      getExamList().then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.table.tableData = res.data.data.rows
        }
      })
    },
    handlenewExam() {
      this.newExam.name = ''
      this.dialogAddVisible = true
    },
    handlePutAddExam() {
      addExam(this.newExam).then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: 'success',
            message: '新建成功!'
          })
          this.dialogAddVisible = false
          this.handleGetExam()
        }
      })
    },
    handleEdit() {
      this.dialogEditVisible = true
    },
    handlePutEditExam() {
      editExam(this.newExam).then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          this.dialogEditVisible = false
          this.handleGetExam()
        }
      })
    },
    handleRow(row, column, event) {
      if (column.target.innerText !== '删除') {
        this.$router.push({
          name: 'examdetails',
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
        deleteExam(id).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.handleGetExam()
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
