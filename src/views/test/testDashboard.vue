<template>
  <div class="card-container">
    <el-card class="table-card">
      <div slot="header" class="clearfix">
        <span>考试看板</span>
      </div>
      <div class="text item">
        <el-card class="examCard" shadow="hover">
          <div class="cardLeft">
            <div class="examName">2019学年度期中考试</div>
            <div class="examDate">
              <svg-icon icon-class="date"/>
              <span>2019-05-01</span>
              <span>至</span>
              <span>2019-05-08</span>
            </div>
          </div>
          <div class="cardRight">
            <div class="examNum">
              <div>
                <span style="color:#ff669b">20</span>
                <span>/</span>
                <span style="color:#3888fa">55</span>
              </div>
              <div style="font-size: 12px;color: #707070">
                <span>已交卷</span>
                <span style="margin-left: 1em">考试人数</span>
              </div>
            </div>
          </div>
          <div style="clear: both"/>
        </el-card>
        <el-card class="examCard" shadow="hover">
          <div class="cardLeft">
            <div class="examName">2019学年度期中考试</div>
            <div class="examDate">
              <svg-icon icon-class="date"/>
              <span>2019-05-01</span>
              <span>至</span>
              <span>2019-05-08</span>
            </div>
          </div>
          <div class="cardRight">
            <div class="examNum">
              <div>
                <span style="color:#ff669b">20</span>
                <span>/</span>
                <span style="color:#3888fa">55</span>
              </div>
              <div style="font-size: 12px;color: #707070">
                <span>已交卷</span>
                <span style="margin-left: 1em">考试人数</span>
              </div>
            </div>
          </div>
          <div style="clear: both"/>
        </el-card>
        <el-card class="examCard" shadow="hover">
          <div class="cardLeft">
            <div class="examName">2019学年度期中考试</div>
            <div class="examDate">
              <svg-icon icon-class="date"/>
              <span>2019-05-01</span>
              <span>至</span>
              <span>2019-05-08</span>
            </div>
          </div>
          <div class="cardRight">
            <div class="examNum">
              <div>
                <span style="color:#ff669b">20</span>
                <span>/</span>
                <span style="color:#3888fa">55</span>
              </div>
              <div style="font-size: 12px;color: #707070">
                <span>已交卷</span>
                <span style="margin-left: 1em">考试人数</span>
              </div>
            </div>
          </div>
          <div style="clear: both"/>
        </el-card>
        <el-card class="examCard" shadow="hover">
          <div class="cardLeft">
            <div class="examName">2019学年度期中考试</div>
            <div class="examDate">
              <svg-icon icon-class="date"/>
              <span>2019-05-01</span>
              <span>至</span>
              <span>2019-05-08</span>
            </div>
          </div>
          <div class="cardRight">
            <div class="examNum">
              <div>
                <span style="color:#ff669b">20</span>
                <span>/</span>
                <span style="color:#3888fa">55</span>
              </div>
              <div style="font-size: 12px;color: #707070">
                <span>已交卷</span>
                <span style="margin-left: 1em">考试人数</span>
              </div>
            </div>
          </div>
          <div style="clear: both"/>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getQuestionDetails, editQuestionDetails } from '@/api/table'

export default {
  data() {
    return {
      examList: {
        name: '',
        beginTime: '',
        endTime: '',
        totalPeople: '',
        completePeople: ''
      }
    }
  },
  created() {
  // 123
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
      this.questionOption.push('')
      console.log(this.questionOption)
    },
    deleteOption() {
      this.questionOption.pop()
      console.log(this.questionOption)
    }
  }
}
</script>

<style lang="scss" scope>
  .card-container {
    width: calc(100vw - 180px);
  }
  .examCard {
    margin-bottom: 20px;
    .cardLeft {
      float: left;
      .examName {
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: bold;
      }
      .examDate {
        font-size: 14px;
      }
    }
    .cardRight {
      float: right;
      height: 60px;
      .examNum{
        font-size: 30px;
      }
    }
    // .el-card__body::after {
    //   content: "";
    //   clear: both;
    // }
  }
</style>
<style lang="scss">
  .table-card {
    width: calc(100vw - 200px);
    min-height: calc(100vh - 70px);
    margin: 10px;
  }
</style>
