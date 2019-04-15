<template>
  <div class="card-container">
    <el-card class="table-card">
      <div slot="header" class="clearfix">
        <span>试卷详情</span>
      </div>
      <div class="text item">
        <el-row :gutter="16" type="flex" justify="center">
          <span style="font-size:20px;font-weight:bold;margin-top:20px;margin-bottom:20px">{{ paperName }}</span>
        </el-row>
        <el-row :gutter="16" type="flex" justify="right">
          <el-col :span="19">
            <el-button type="primary" size="mini" @click="handleAdd">添加题目</el-button>
          </el-col>
          <el-col :span="3">
            <el-input v-model="paper.name" size="mini"/>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="mini" @click="handleGetPaperDetails">查询</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-table
            :data="table.questionData"
          >
            <el-table-column
              width="100"
              prop="type"
              align="center"
              label="类型"
            >
              <template slot-scope="scope">
                <el-tag v-if="scope.row.type === 'select'" type="success">选择题</el-tag>
                <el-tag v-if="scope.row.type === 'judge'" type="warning">判断题</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              :formatter="questionContent"
              prop="content"
              label="题目内容"
              align="center"
            />
            <el-table-column
              align="center"
              label="选项"
            >
              <template slot-scope="scope">
                <div v-for="(item, index) in scope.row.optionContent" :key="index">{{ item }}</div>
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              prop="grade"
              align="center"
              label="分值"
            />
            <el-table-column
              width="220"
              align="selectyAnswer"
              label="正确答案"
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
    </el-card>
  </div>
</template>

<script>
import { getPaperDetails, deleteQuestion } from '@/api/table'

export default {
  data() {
    return {
      paperId: '',
      paperName: '',
      table: {
        questionData: []
      },
      paper: {
        name: '',
        pageNum: '0',
        pageSize: '100',
        status: ''
      }
    }
  },
  created() {
    this.paperId = this.$route.params.id
    this.handleGetPaperDetails()
  },
  methods: {
    handleGetPaperDetails() {
      getPaperDetails(this.paperId).then(res => {
        if (res.data.errorMsg === '操作成功') {
          this.paperName = res.data.data.name
          this.table.questionData = res.data.data.examQuestionList
          const rowsLen = res.data.data.examQuestionList.length
          for (let i = 0; i < rowsLen; i++) {
            this.table.questionData[i].optionContent = this.$options.methods.optionContent(res.data.data.examQuestionList[i].content)
          }
        }
      })
    },
    questionContent(row, column, cellValue) {
      var content_temp = row.content
      if (content_temp.match(/#(\S*)#/)) {
        content_temp = content_temp.match(/#(\S*)#/)[1]
      }
      return content_temp
    },
    optionContent(data) {
      const option = []
      var content_temp = data
      if (content_temp.match(/##[A-Z]\s(\S*)##/g)) {
        option.push(content_temp.match(/##[A-Z]\s(\S*)##/g)[0].replace(/##/g, ''))
        option.push(content_temp.match(/##[A-Z]\s(\S*)##/g)[1].replace(/##/g, ''))
        if (content_temp.match(/##[A-Z]\s(\S*)##/g)[2]) option.push(content_temp.match(/##[A-Z]\s(\S*)##/g)[2].replace(/##/g, ''))
        if (content_temp.match(/##[A-Z]\s(\S*)##/g)[3]) option.push(content_temp.match(/##[A-Z]\s(\S*)##/g)[3].replace(/##/g, ''))
      }
      return option
    },
    handleEdit(id) {
      this.$router.push({
        name: 'editquestion',
        params: { id: id }
      })
    },
    handleAdd() {
      this.$router.push({
        name: 'addquestion',
        params: { paperId: this.paperId }
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteQuestion(id).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.handleGetPaperDetails()
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
