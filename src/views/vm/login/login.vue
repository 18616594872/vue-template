<template>
    <div class="Login-wrap">
        <h1 class="form">后台管理系统</h1>
		<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" class="demo-ruleForm login-container">
			<h2 class="title">用户登录</h2>
			<FormItem prop="userName">
				<Input type="text" v-model="formValidate.userName" placeholder="用户名" @on-change="changeLogBtnState">
				<Icon type="ios-person-outline" slot="prepend"></Icon>
				</Input>
			</FormItem>
			<FormItem prop="passWord">
				<Input type="password" v-model="formValidate.passWord" placeholder="密码"
					@keyup.enter.native="handleSubmit('formValidate')" @on-change="changeLogBtnState">
				<Icon type="ios-lock-outline" slot="prepend"></Icon>
				</Input>
				<div class="ivu-form-item-error-tip">{{errTipMes}}</div>
			</FormItem>
			<FormItem>
				<checkbox v-model="checked" checked class="remember">一周内记住密码</checkbox>
			</FormItem>
			<FormItem>
				<Button type="primary" style="width:100%;" @click="handleSubmit('formValidate')" :loading="loading">
					<span v-if="!loading">登录</span>
					<span v-else>Loading...</span>
				</Button>
			</FormItem>
		</Form>
    </div>
</template>

<script lang="ts" src="./login.ts"></script>

<style lang="less">
    @import './login.less';
</style>

