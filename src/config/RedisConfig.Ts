// import { createClient, print } from "redis";
// import { promisifyAll } from "bluebird";

// import { REDIS } from "./index";

// const options = {
//   host: REDIS.host,
//   port: REDIS.port,
//   password: REDIS.password,
//   detect_buffers: true,
// };

// const client = promisifyAll(createClient(options));

// client.on("error", (err) => {
//   console.log("Redis Client Error:", err);
// });

// /**
//  * @description 设置redis键值
//  * @param {string} key
//  * @param {string | Object} value
//  * @param {number} time 过期时间，单位秒
//  * @returns void
//  */
// const setValue = (key, value, time = 0) => {
//   if (typeof value === "undefined" || value == null || value === "") {
//     return;
//   }
//   if (typeof value === "string") {
//     const setParams = [key, value];
//     if (time > 0) {
//       setParams.push(...["EX", time]);
//     }
//     client.set.apply(client, setParams);
//   } else if (typeof value === "object") {
//     Object.keys(value).forEach((k) => {
//       client.hset(key, k, value[k], print);
//     });
//   }
// };

// const getValue = (key) => {
//   return client.getAsync(key);
// };

// const getHValue = (key) => {
//   return client.hgetallAsync(key);
// };

// const delValue = (key) => {
//   client.del(key, (err, res) => {
//     if (res === 1) {
//       return true;
//     } else {
//       console.log("delete Error: ", err);
//       return false;
//     }
//   });
// };

// export { setValue, getValue, getHValue, delValue };
