<template>
  <div class="card-container">
    <el-card class="table-card">
      <div slot="header" class="clearfix">
        <span>考试看板</span>
      </div>
      <div v-for="(item, index) in examList" :key="index" class="text item">
        <el-card class="examCard" shadow="hover">
          <div class="cardLeft">
            <div class="examName">{{ item.name }}</div>
            <div class="examDate">
              <svg-icon icon-class="date"/>
              <span>{{ $moment(item.beginTime).format('YYYY-MM-DD') }}</span>
              <span>至</span>
              <span>{{ $moment(item.endTime).format('YYYY-MM-DD') }}</span>
            </div>
          </div>
          <div class="cardRight">
            <div class="examNum">
              <div>
                <span style="color:#ff669b;">{{ item.donePeople > 10 ? '' : 0 }}{{ item.donePeople }}</span>
                <span>/</span>
                <span style="color:#3888fa">{{ item.donePeople > 10 ? '' : 0 }}{{ item.totalPeople }}</span>
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
import { getExamList } from '@/api/table'

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
    this.ExamList()
  },
  methods: {
    ExamList() {
      console.log('111')
      getExamList().then(res => {
        if (res.data.code === 0) {
          this.examList = res.data.data.rows
          console.log(this.examList)
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
