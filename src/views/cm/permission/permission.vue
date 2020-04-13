<template>
    <div class="permission-wrap">
        <Button type="info" @click="addRole">角色管理</Button>
        <Modal v-model="visableModal" :title="this.ModalType === 'new' ? '添加角色' : '修改角色'">
            <Form :model="role" :label-width="80">
                <FormItem label="名字">
                    <Input v-model="role.name" placeholder="请输入角色名字"></Input>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="role.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入角色备注"></Input>
                </FormItem>
                <FormItem label="权限">
                    <Tree :data="routes" show-checkbox multiple ref="routeTree"></Tree>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script lang="ts" src="./permission.ts"></script>

<style lang="less">
    @import './permission.less';
</style>

