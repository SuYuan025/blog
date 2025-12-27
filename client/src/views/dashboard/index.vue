<template>
    <div>
      dashboard
      {{ admin }}
    </div>
</template>
  
<script setup lang='ts'>
import { adminStore } from '@/stores/adminStore'

const admin = adminStore()
</script>
  
<style scoped>
  
</style>