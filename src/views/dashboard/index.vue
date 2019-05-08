<template>
  <div class="dashboard-container">
    <grade-analysis :chart-data="newVisitis"/>
    <bin-tu :chart-data="newVisitis"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GradeAnalysis from './chart/GradeAnalysis'
import BinTu from './chart/BinTu'

export default {
  name: 'Dashboard',
  components: {
    GradeAnalysis,
    BinTu
  },
  data() {
    return {
      newVisitis: {
        expectedData: [88, 82, 80, 77, 92, 73, 90],
        actualData: [87, 82, 81, 74, 90, 80, 89]
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
