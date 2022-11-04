import fs from "fs";
import path from "path";

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const getTable = (name) => resolve(`data/${name}.json`);

const always = () => true;

export class Db {
  constructor() {
    this.jsonF = null;
  }

  // 判断文件/文件路径是否存在
  exists(f) {
    return fs.existsSync(f);
  }

  // 添加一个json
  addJson(name) {
    if (!name) return;
    const json = getTable(name);
    if (this.exists(json)) return;
    fs.writeFileSync(json, "", "utf8");
  }

  // 删除一个json
  deleteJson(name) {
    if (!name) return;
    this.jsonF = getTable(name);
    if (!this.exists(this.jsonF)) return;
    fs.unlinkSync(this.jsonF);
    this.jsonF = null;
  }

  // [name].json是否存在condition()条件的数据
  isExistsOne(name, condition) {
    this.jsonF = getTable(name);
    if (!this.exists(this.jsonF)) return false;
    const rt = this.findJson(name);
    if (!rt) return false;
    return rt.some(condition);
  }

  // 查找json文件数据
  findJson(name) {
    this.jsonF = getTable(name);
    if (!this.exists(this.jsonF)) return null;
    const json = fs.readFileSync(this.jsonF, "utf8");
    return json ? JSON.parse(json) : null;
  }

  // 查找一条记录
  findOne(name, condition) {
    this.jsonF = getTable(name);
    if (!this.exists(this.jsonF)) return null;
    const rt = this.findJson(name);
    if (!rt) return null;
    return rt.find(condition);
  }

  // 插入一条记录
  insert(name, data) {
    this.jsonF = getTable(name);
    if (!this.exists(this.jsonF)) {
      this.addJson(name);
    }
    let rt = this.findJson(name);
    if (!rt) {
      rt = [data];
    } else {
      rt.push(data);
    }
    fs.writeFileSync(this.jsonF, JSON.stringify(rt), "utf8");
    return data;
  }

  // 更新一条记录
  updateOne(name, data, whichOne = always) {
    this.jsonF = getTable(name);
    if (!this.exists(this.jsonF)) return;
    let rt = this.findJson(name);
    if (!rt) {
      rt = [data];
    } else {
      for (let i = 0; i < rt.length; i++) {
        if (whichOne(rt[i])) {
          rt[i] = { ...rt[i], ...data };
          break;
        }
      }
    }
    fs.writeFileSync(this.jsonF, JSON.stringify(rt), "utf8");
    return data;
  }

  // 更新所有匹配的记录
  updateAllMatched(name, data, isMatched = always) {
    this.jsonF = getTable(name);
    if (!this.exists(this.jsonF)) return;
    let rt = this.findJson(name);
    if (!rt) {
      rt = [data];
    } else {
      rt = rt.map((item) => (isMatched(item) ? { ...item, ...data } : item));
    }
    fs.writeFileSync(this.jsonF, JSON.stringify(rt), "utf8");
  }

  // 删除一条记录
  removeOne(name, whichOne) {
    this.jsonF = getTable(name);
    if (!this.exists(this.jsonF)) return;
    let rt = this.findJson(name);
    if (rt) {
      rt = rt.filter((item) => !whichOne(item));
    }
    fs.writeFileSync(this.jsonF, JSON.stringify(rt), "utf8");
    return true;
  }

  // 清空json数据
  clear(name) {
    this.jsonF = getTable(name);
    if (!this.exists(this.jsonF)) return;
    fs.writeFileSync(this.jsonF, "", "utf8");
  }
}

Db.getInstance = function () {
  if (!Db.instance) {
    Db.instance = new Db();
  }
  return Db.instance;
};

export const db = Db.getInstance();
