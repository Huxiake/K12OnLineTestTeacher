<template>
  <div class="card-container">
    <el-card class="table-card">
      <div slot="header" class="clearfix">
        <span>试卷详情</span>
      </div>
      <div class="text item">
        <el-form label-position="right" label-width="40px">
          <el-form-item label="类型">
            <el-select v-model="questionNewData.type" placeholder="请选择" @change="typeChange">
              <el-option
                label="判断题"
                value="judge"/>
              <el-option
                label="选择题"
                value="select"/>
            </el-select>
          </el-form-item>
          <el-form-item label="题目">
            <el-input v-model="questionNewData.content" type="textarea" rows="8"/>
          </el-form-item>
          <el-form-item v-for="(item, index) in questionOption" :key="index" :label="index === 0 ? '选项' : ''">
            <el-input v-model="questionOption[index]"/>
            <a v-if="index === questionOption.length - 1" style="color: #72ACE3" @click="addOption">增加一个选项</a>
            <a v-if="(index === questionOption.length - 1) && questionOption.length !== 1" style="color: #72ACE3" @click="deleteOption">删除一个选项</a>
          </el-form-item>
          <el-form-item label="答案">
            <el-select v-model="questionNewData.selectyAnswer">
              <el-option v-for="(item, index) in questionOption" :key="index" :label="item" :value="item[0]"/>
            </el-select>
          </el-form-item>
          <el-form-item label="分值">
            <el-input-number v-model="questionNewData.grade" :min="1" :max="100"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUpdata">提交</el-button>
            <el-button @click="$router.go(-1)">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addQuestionDetails } from '@/api/table'

export default {
  data() {
    return {
      questionOption: ['', ''],
      questionNewData: {
        selectyAnswer: '',
        grade: '',
        type: '',
        content: '',
        examPaperId: '',
        name: 'this',
        remark: ''
      }
    }
  },
  created() {
    this.questionNewData.examPaperId = this.$route.params.paperId
  },
  methods: {
    handleUpdata() {
      var content_temp = '#' + this.questionNewData.content + '# '
      const optionLen = this.questionOption.length
      for (let i = 0; i < optionLen; i++) {
        content_temp = content_temp + '##' + this.questionOption[i] + '## '
      }
      this.questionNewData.content = content_temp
      console.log(this.questionNewData)
      addQuestionDetails(this.questionNewData).then(res => {
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
    typeChange() {
      if ((this.questionNewData.type === 'judge') && (this.questionOption.length > 2)) {
        this.$alert('判断题的选项只能有两个，请检查选项', '选项个数错误', {
          confirmButtonText: '确定'
        })
      }
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
      if ((this.questionNewData.type === 'judge') && (this.questionOption.length + 1 > 2)) {
        this.$alert('判断题的选项只能有两个，请检查选项', '选项个数错误', {
          confirmButtonText: '确定'
        })
      } else {
        this.questionOption.pop()
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
