/**
 * Created by Administrator on 2017/8/2.
 */
export function lsWrite(key, value) {
  let refuel = window.localStorage.__ai_refuel_PC__;
  if (!refuel) {
    refuel = {};
  } else {
    refuel = JSON.parse(refuel);
  }
  refuel[key] = value;
  window.localStorage.__ai_refuel_PC__ = JSON.stringify(refuel);
};

export function lsRead(key) {
  let refuel = window.localStorage.__ai_refuel_PC__;
  if (!refuel) {
    return "";
  }
  refuel = JSON.parse(refuel);
  if (!refuel) {
    return "";
  }
  let ret = refuel[key];
  return ret || "";
};
