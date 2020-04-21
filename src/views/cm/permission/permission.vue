<template>
    <div class="permission-wrap">
        <Row>
            <Col span="3">
                <Button type="info" @click="addRole()">角色管理</Button>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <Table 
            border 
            ref="selection" 
            :columns="roleColumns" 
            :data="rolesData" 
            @on-selection-change="startdelete" 
            style="margin:20px;"
        ></Table>
        <Modal v-model="visableModal" :title="this.ModalType === 'new' ? '添加角色' : '修改角色'" @on-ok="addOrEditRole">
            <Form :model="role" :label-width="80">
                <FormItem label="名字">
                    <Input v-model="role.name" placeholder="请输入角色名字"></Input>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="role.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入角色备注"></Input>
                </FormItem>
                <FormItem label="权限">
                    <Tree :data="role.routes" show-checkbox multiple ref="routeTree"></Tree>
                </FormItem>
            </Form>
        </Modal>
        <Modal
            v-model="showPermission"
            title="修改权限"
            width="40vw"
            class="white-modal"
        >
            <div class="role">
                <div v-for="(item, index) in permission" :key="index" class="role-menu-wrap">
                    <div class="menu-name">{{moduleName(permission,index)}}</div>
                    <div class="opera-btn">
                        <CheckboxGroup v-model="permission[index]" @on-change="checkAllGroupChange">
                            <Checkbox :label="pmissionName(permission,index,0)">增加</Checkbox>
                            <Checkbox :label="pmissionName(permission,index,1)">删除</Checkbox>
                            <Checkbox :label="pmissionName(permission,index,2)">查询</Checkbox>
                            <Checkbox :label="pmissionName(permission,index,3)">修改</Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button type="primary" @click="submitPermission()">确定</Button>
            </div>
        </Modal>
            </Col>
        </Row>
    </div>
</template>

<script lang="ts" src="./permission.ts"></script>

<style lang="less">
    @import './permission.less';
</style>

