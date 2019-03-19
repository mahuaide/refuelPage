/**
 * Created by Administrator on 2017/4/13.
 */
import * as types from './type'
import {lsWrite, lsRead} from '../common/js/ls'
export default {
  [types.LOGIN]: (state, data) => {
    state.user = data;
    lsWrite("user",data);
  },
  [types.LOGOUT]: (state) => {
    state.user={};
  },
}
