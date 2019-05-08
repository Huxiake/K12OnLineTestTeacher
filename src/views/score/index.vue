<template>
  <div class="card-container">
    <el-card class="table-card">
      <div slot="header" class="clearfix">
        <span>场次列表</span>
      </div>
      <div class="text item">
        <el-row :gutter="16" type="flex" justify="right">
          <el-col :span="10">
            <el-button type="primary" size="mini" @click="handlenewExam">新建场次</el-button>
          </el-col>
          <el-col :span="4">
            <el-input v-model="exam.name" placeholder="请输入姓名"/>
          </el-col>
          <el-col :span="4">
            <el-select v-model="exam.status" placeholder="请选择班级">
              <el-option
                label="601班"
                value="enabled"/>
              <el-option
                label="602班"
                value="disabled"/>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="exam.status" placeholder="请选择场次">
              <el-option
                label="全部"
                value="enabled"/>
              <el-option
                label="第一月考"
                value="enabled1"/>
              <el-option
                label="期中"
                value="disabled"/>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="handleGetExam">查询</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-table
            :data="gradeData"
          >
            <el-table-column
              prop="姓名"
              align="center"
              label="姓名"
            />
            <el-table-column
              prop="场次"
              align="center"
              label="场次"
            />
            <el-table-column
              prop="分数"
              align="center"
              label="分数"
            />
            <el-table-column
              prop="排名"
              align="center"
              label="排名"
            />
          </el-table>
        </el-row>
      </div>
      <!-- 新建试卷dialog层 -->
      <el-dialog :visible.sync="dialogAddVisible" title="新建场次">
        <el-form :model="newExam">
          <el-form-item label="姓名">
            <el-input v-model="newExam.name"/>
          </el-form-item>
          <el-form-item label="考试开始时间">
            <el-date-picker
              v-model="newExam.beginTime"
              type="date"
              placeholder="选择开始日期"
              value-format="timestamp"/>
          </el-form-item>
          <el-form-item label="考试接收时间">
            <el-date-picker
              v-model="newExam.endTime"
              type="date"
              placeholder="选择结束日期"
              value-format="timestamp"/>
          </el-form-item>
          <el-form-item label="试卷名称">
            <el-select v-model="newExam.examPaperId">
              <el-option
                v-for="(item, index) in paperList"
                :key="index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary" @click="handlePutAddExam">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑试卷dialog层 -->
      <el-dialog :visible.sync="dialogEditVisible" title="编辑场次">
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
import { getPaperList, getExamList, deleteExam, addExam, editExam } from '@/api/table'

export default {
  data() {
    return {
      gradeData: [
        {
          姓名: '胡霞客',
          场次: '第一月考',
          排名: '2',
          分数: '119'
        },
        {
          姓名: '胡小鹏',
          场次: '第一月考',
          排名: '1',
          分数: '128'
        },
        {
          姓名: '黄滢滢',
          场次: '第一月考',
          排名: '3',
          分数: '85'
        },
        {
          姓名: '黄大非',
          场次: '第一月考',
          排名: '4',
          分数: '80'
        },
        {
          姓名: '刘五',
          场次: '第一月考',
          排名: '5',
          分数: '70'
        },
        {
          姓名: '赵四',
          场次: '第一月考',
          排名: '6',
          分数: '81'
        },
        {
          姓名: '胡霞客',
          场次: '期中',
          排名: '2',
          分数: '106'
        },
        {
          姓名: '黄滢滢',
          场次: '期中',
          排名: '1',
          分数: '130'
        },
        {
          姓名: '胡小鹏',
          场次: '期中',
          排名: '5',
          分数: '66'
        },
        {
          姓名: '黄大非',
          场次: '期中',
          排名: '4',
          分数: '70'
        },
        {
          姓名: '刘五',
          场次: '期中',
          排名: '3',
          分数: '82'
        },
        {
          姓名: '赵四',
          场次: '期中',
          排名: '4',
          分数: '70'
        }
      ],
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
        beginTime: '',
        endTime: '',
        examPaperId: ''
      },
      paper: {
        pageNum: '0',
        pageSize: '100'
      },
      paperList: {}
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
      // 获取试卷列表
      if (Object.keys(this.paperList).length === 0) {
        getPaperList(this.paper).then(res => {
          if (res.data.code === 0) {
            this.paperList = res.data.data.rows
            this.dialogEditVisible = false
            this.handleGetExam()
          }
        })
      }
    },
    handlePutAddExam() {
      addExam(this.newExam).then(res => {
        if (res.data.code === 0) {
          this.dialogAddVisible = false
          this.handleGetExam()
        }
      })
    },
    handleEdit() {
      this.dialogEditVisible = true
      if (Object.keys(this.paperList).length === 0) {
        getPaperList().then(res => {
          if (res.data.code === 0) {
            this.paperList = res.data.data.rows
            this.dialogEditVisible = false
            this.handleGetExam()
          }
        })
      }
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
