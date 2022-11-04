const router = require('koa-router')()
const { db, res } = require('../../utils')
const jwt = require('jsonwebtoken')

router.prefix('/api/user')
const jsonName = 'user'
const cert = 'ns'

// 注册
router.post(`/logon`, async (ctx, next) => {
    const { userAccount } = ctx.request.body
    if (db.isExistsOne(jsonName, user => {
        return userAccount === user.userAccount
    })) {
        ctx.body = res.error('当前用户已存在！')
    } else {
        const rt = db.insert(jsonName, {
            ...ctx.request.body,
            nickName: 'n-' + userAccount
        })
        ctx.body = res.success({
            userAccount,
            nickName: rt.nickName
        })
    }
})

// 登录
router.post('/login', async (ctx, next) => {
    const {
        userAccount,
        pwd
    } = ctx.request.body
    const rt = db.findOne(jsonName, user => user.userAccount === userAccount && user.pwd === pwd)
    if (rt) {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 7,
            data: userAccount
        }, cert)
        ctx.body = res.success({
            userAccount: rt.userAccount,
            nickName: rt.nickName,
            token
        })
    } else {
        ctx.body = res.error('用户名或密码错误')
    }
})

module.exports = router
