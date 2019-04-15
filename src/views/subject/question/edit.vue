<template>
  <div class="card-container">
    <el-card class="table-card">
      <div slot="header" class="clearfix">
        <span>试卷详情</span>
      </div>
      <div class="text item">
        <el-form label-position="right" label-width="40px">
          <el-form-item label="类型">
            <el-select v-model="questionData.type" placeholder="请选择">
              <el-option
                label="判断题"
                value="judge"/>
              <el-option
                label="选择题"
                value="select"/>
            </el-select>
          </el-form-item>
          <el-form-item label="题目">
            <el-input v-model="questionData.content" type="textarea" rows="8"/>
          </el-form-item>
          <el-form-item v-for="(item, index) in questionOption" :key="index" :label="index === 0 ? '选项' : ''">
            <el-input v-model="questionOption[index]"/>
            <a v-if="index === questionOption.length - 1" style="color: #72ACE3" @click="addOption">增加选项</a>
            <a v-if="index === questionOption.length - 1" style="color: #72ACE3;margin-left: 10px;" @click="deleteOption">删除选项</a>
          </el-form-item>
          <el-form-item label="答案">
            <el-select v-model="questionNewData.selectyAnswer">
              <el-option v-for="(item, index) in questionOption" :key="index" :label="item" :value="item[0]"/>
            </el-select>
          </el-form-item>
          <el-form-item label="分值">
            <el-input-number v-model="questionData.grade" :min="1" :max="100"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUpdata">更新</el-button>
            <el-button @click="$router.go(-1)">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getQuestionDetails, editQuestionDetails } from '@/api/table'

export default {
  data() {
    return {
      questionId: '',
      questionOption: [],
      questionData: {},
      questionNewData: {
        selectyAnswer: '',
        grade: '',
        type: '',
        content: '',
        examPaperId: '',
        name: '',
        remark: ''
      }
    }
  },
  created() {
    this.questionId = this.$route.params.id
    this.handleGetQuestion()
  },
  methods: {
    handleGetQuestion() {
      getQuestionDetails(this.questionId).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.questionData = res.data.data
          var content_temp = res.data.data.content
          var option_temp = res.data.data.content
          content_temp = content_temp.match(/#(\S*)#/)[1]
          this.questionData.content = content_temp
          const option = []
          if (option_temp.match(/##[A-Z]\s(\S*)##/g)) {
            option.push(option_temp.match(/##[A-Z]\s(\S*)##/g)[0].replace(/##/g, ''))
            option.push(option_temp.match(/##[A-Z]\s(\S*)##/g)[1].replace(/##/g, ''))
            if (option_temp.match(/##[A-Z]\s(\S*)##/g)[2]) option.push(option_temp.match(/##[A-Z]\s(\S*)##/g)[2].replace(/##/g, ''))
            if (option_temp.match(/##[A-Z]\s(\S*)##/g)[3]) option.push(option_temp.match(/##[A-Z]\s(\S*)##/g)[3].replace(/##/g, ''))
          }
          this.questionOption = option
        }
      })
    },
    handleUpdata() {
      var content_temp = '#' + this.questionData.content + '# '
      const optionLen = this.questionOption.length
      for (let i = 0; i < optionLen; i++) {
        content_temp = content_temp + '##' + this.questionOption[i] + '## '
      }
      this.questionNewData.id = this.questionData.id
      this.questionNewData.selectyAnswer = this.questionData.selectyAnswer
      this.questionNewData.grade = this.questionData.grade
      this.questionNewData.type = this.questionData.type
      this.questionNewData.examPaperId = this.questionData.examPaperId
      this.questionNewData.name = this.questionData.name
      this.questionNewData.remark = this.questionData.remark
      // content单独
      this.questionNewData.content = content_temp
      console.log(this.questionNewData)
      editQuestionDetails(this.questionId, this.questionNewData).then(res => {
        if (res.data.code === 0) {
          this.$message({
            'type': 'success',
            'message': '更新题目详情成功!'
          })
          this.$router.go(-1)
        }
      })
    },
    handleEdit(id) {
      this.$router.push({
        name: 'editquestion',
        params: { id: id }
      })
    },
    addOption() {
      if ((this.questionNewData.type === 'judge') && (this.questionOption.length + 1 > 2)) {
        this.$alert('判断题的选项只能有两个，请检查选项', '选项个数错误', {
          confirmButtonText: '确定'
        })
      } else {
        this.questionOption.push('')
      }
    },
    deleteOption() {
      console.log(this.questionOption[this.questionOption.length - 1])
      if ((this.questionNewData.type === 'judge') && (this.questionOption.length + 1 > 2)) {
        this.$alert('判断题的选项只能有两个，请检查选项', '选项个数错误', {
          confirmButtonText: '确定'
        })
      } else if (this.questionOption[this.questionOption.length - 1] === '') {
        this.questionOption.pop()
      } else {
        this.$confirm('最后一个选项不为空, 是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.questionOption.pop()
        })
      }
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
