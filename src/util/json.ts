import fs from 'fs';
import { SERVER_CONFIG } from '@/config';
import { Nullable } from '@/model';
import { resolveCWD } from './path';

const { JSON_TABLE_PATH } = SERVER_CONFIG;

interface Condition<T = unknown> {
    (data: T): boolean;
}

const always = () => true;

class Json {
    public static instance: Json;

    public static getInstance = (): Json => {
        if (!this.instance) {
            this.instance = new Json();
        }
        return this.instance;
    };

    // 添加一个 json table
    public add(jsonPathName: string) {
        const json = getJson(jsonPathName);
        if (fs.existsSync(json)) {
            return;
        }
        fs.writeFileSync(json, '', 'utf8');
    }

    // 删除一个 json table
    public destroy(jsonPathName: string) {
        const json = getJson(jsonPathName);
        if (!fs.existsSync(json)) {
            return;
        }
        fs.unlinkSync(json);
    }

    // 查找 json table 文件数据
    public get<T = unknown>(jsonPathName: string): Nullable<T> {
        const json = getJson(jsonPathName);
        if (!fs.existsSync(json)) {
            return null;
        }
        const result = fs.readFileSync(json, 'utf8');
        return result ? JSON.parse(result) : null;
    }

    // [name].json是否存在condition()条件的数据
    public some<T = unknown>(jsonPathName: string, condition: Condition<T>): boolean {
        const json = getJson(jsonPathName);
        if (!fs.existsSync(json)) {
            return false;
        }
        const rt = this.get<T[]>(jsonPathName);
        if (!rt) {
            return false;
        }
        return rt.some(condition);
    }

    // 查找一条记录
    public find<T = unknown>(jsonPathName: string, condition: Condition<T>): Nullable<T> {
        const json = getJson(jsonPathName);
        if (!fs.existsSync(json)) {
            return null;
        }
        const jsonTable = this.get<T[]>(jsonPathName);
        if (!jsonTable) {
            return null;
        }
        return jsonTable.find(condition) ?? null;
    }

    // 插入一条记录
    public insert<T = unknown>(jsonPathName: string, record: T): T {
        const json = getJson(jsonPathName);
        if (!fs.existsSync(json)) {
            this.add(jsonPathName);
        }
        let jsonTable = this.get<T[]>(jsonPathName);
        if (!jsonTable) {
            jsonTable = [record];
        } else {
            jsonTable.push(record);
        }
        fs.writeFileSync(json, JSON.stringify(jsonTable), 'utf8');
        return record;
    }

    // 更新一条记录
    public update<T = unknown>(
        jsonPathName: string,
        record: Partial<T>,
        whichOne: Condition<T> = always,
    ): Nullable<T> {
        const json = getJson(jsonPathName);
        if (fs.existsSync(json)) {
            const jsonTable = this.get<T[]>(jsonPathName);
            if (jsonTable) {
                for (let i = 0; i < jsonTable.length; i++) {
                    if (whichOne(jsonTable[i])) {
                        jsonTable[i] = { ...jsonTable[i], ...record };
                        fs.writeFileSync(json, JSON.stringify(jsonTable), 'utf8');
                        return jsonTable[i];
                    }
                }
            }
        }
        return null;
    }

    // 更新所有匹配的记录
    public updateBatch<T = unknown>(
        jsonPathName: string,
        record: Partial<T>,
        isMatched: Condition<T> = always,
    ): true {
        const json = getJson(jsonPathName);
        if (fs.existsSync(json)) {
            let jsonTable = this.get<T[]>(jsonPathName);
            if (jsonTable) {
                jsonTable = jsonTable.map((item) =>
                    isMatched(item) ? { ...item, ...record } : item,
                );
                fs.writeFileSync(json, JSON.stringify(jsonTable), 'utf8');
            }
        }
        return true;
    }

    // 删除一条记录
    public delete<T = unknown>(jsonPathName: string, whichOne: Condition<T>): true {
        const json = getJson(jsonPathName);
        if (fs.existsSync(json)) {
            let jsonTable = this.get<T[]>(jsonPathName);
            if (jsonTable) {
                jsonTable = jsonTable.filter((item) => !whichOne(item));
            }
            fs.writeFileSync(json, JSON.stringify(jsonTable), 'utf8');
        }
        return true;
    }

    // 清空json数据
    public clear(jsonPathName: string): true {
        const json = getJson(jsonPathName);
        if (fs.existsSync(json)) {
            fs.writeFileSync(json, '', 'utf8');
        }
        return true;
    }
}

export const json = Json.getInstance();

function getJson(paths: string) {
    const pathsArr = paths.split('/');
    const jsonName = pathsArr.pop();
    return resolveCWD(JSON_TABLE_PATH, ...pathsArr, `${jsonName}.json`);
}
