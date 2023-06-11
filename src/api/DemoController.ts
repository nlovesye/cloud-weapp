import { ApplicationContext, JsonRecord } from '@/model';
import { genAppResponseBodyT } from '@/util';
import { json } from '@/util';

const jsonTable = 'demo';

class DemoController {
    // constructor() {}

    // 查询
    async get(ctx: ApplicationContext) {
        const result = json.get(jsonTable);
        ctx.body = genAppResponseBodyT({ data: result });
    }

    // 添加
    async add(ctx: ApplicationContext) {
        const data = ctx.request.body;
        const record = {
            ...data,
            id: Math.random(),
        };
        json.insert(jsonTable, record);
        ctx.body = genAppResponseBodyT({ data: record });
    }

    // 更新
    async update(ctx: ApplicationContext) {
        const { id, ...restData } = ctx.request.body;
        json.update<JsonRecord>(jsonTable, restData, (d) => d.id === id);
        ctx.body = genAppResponseBodyT({ message: `${id}更新成功` });
    }

    // 删除
    async delete(ctx: ApplicationContext) {
        const { id } = ctx.request.body;
        json.delete<JsonRecord>(jsonTable, (d) => d.id === id);
        ctx.body = genAppResponseBodyT({ message: `${id}删除成功` });
    }

    // 清空
    async clear(ctx: ApplicationContext) {
        json.clear(jsonTable);
        ctx.body = genAppResponseBodyT();
    }
}

export default new DemoController();
