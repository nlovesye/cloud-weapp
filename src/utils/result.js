export function createResult({ code = 200, msg = "成功!", data } = {}) {
  return {
    code,
    msg,
    data,
  };
}
