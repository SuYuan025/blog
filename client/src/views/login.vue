<template>
	<div class="login-container">
		<n-card title="登录">
			<n-form :model="admin" :rules="rules">
				<n-form-item path="account" label="账号">
					<n-input  placeholder="请输入账号" v-model:value="admin.account" />
				</n-form-item>
				<n-form-item path="password" label="密码">
					<n-input placeholder="请输入密码" type="password" v-model:value="admin.password" />
				</n-form-item>
			</n-form>
			<template #footer>
				<n-checkbox v-model:checked="admin.rember" label="记住我"/>
				<n-button type="primary" @click="goLogin">登录</n-button>
			</template>
		</n-card>
	</div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { login } from '@/request/login'
import { adminStore } from '@/stores/adminStore'
import { useRouter } from 'vue-router'
const router = useRouter()

const message = inject('message') as any

const admin = ref({
	account: localStorage.getItem('account') || '',
	password: localStorage.getItem('password') || '',
	rember: localStorage.getItem('rember') == '1' || false
})

const rules = ref({
	account: [
		{ required: true, message: '请输入用户名', trigger: 'blur' },
		{ min: 3, max: 12, message: '用户名长度必须在 3 到 12 个字符', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, max: 12, message: '密码长度必须在 6 到 12 个字符', trigger: 'blur' }
	]
})

const goLogin = async () => {
	const res = await login(admin.value)
	if (res.data.code === 200) {
		adminStore().$state.token = res.data.data.user.token
		adminStore().$state.account = res.data.data.user.account
		adminStore().$state.id = res.data.data.user.id

		if (admin.value.rember) {
			localStorage.setItem('account', admin.value.account)
			localStorage.setItem('password', admin.value.password)
			localStorage.setItem('rember', admin.value.rember ? '1' : '0')
		}

		message.success('登陆成功')

		setTimeout(() => {
			router.push('/dashboard')
		}, 350)
	} else {
		message.error(`\ ${res.data.msg}`)
	}
	console.log(`output->res`,res)
}
</script>

<style scoped>
.login-container {
	margin: 0 auto;
	margin-top: 150px;
	width: 500px;
}
</style>
