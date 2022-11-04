const router = require('koa-router')()
const { db, res } = require('../../utils')

router.prefix('/api/mygeneral')

// 获取武将
router.get(`/`, async (ctx, next) => {
    // db.clear(userAccount)
    const { userAccount } = ctx.request.query
    const rt = db.findJson(userAccount)
    if (rt) {
        ctx.body = res.success(rt)
    } else {
        ctx.body = res.success([])
    }
})

// 新增武将
router.post('/', async (ctx) => {
    const { userAccount, general } = ctx.request.body
    const isExists = db.isExistsOne(userAccount, item => item.name === general.name)
    if (isExists) {
        ctx.body = res.error('已存在同名武将')
    } else {
        const rt = db.insert(userAccount, general)
        ctx.body = res.success(rt)
    }
})

// 编辑武将
router.put('/', async (ctx) => {
    const { userAccount, general } = ctx.request.body
    const isExists = db.isExistsOne(userAccount, item => item.name === general.name)
    if (!isExists) {
        ctx.body = res.error('武将不存在')
    } else {
        const rt = db.updateOne(userAccount, general, item => item.name === general.name)
        ctx.body = res.success(rt)
    }
})

// 删除武将
router.delete('/', async (ctx) => {
    const { userAccount, name } = ctx.request.query
    const isExists = db.isExistsOne(userAccount, item => item.name === name)
    if (!isExists) {
        ctx.body = res.error('武将不存在')
    } else {
        const rt = db.removeOne(userAccount, item => item.name === name)
        if (rt) {
            ctx.body = res.success('删除成功')
        } else {
            ctx.body = res.error('未知错误')
        }
    }
})

module.exports = router
