/**
 * Created by Administrator on 2017/4/13.
 */
import * as types from './type'
export default {
  [types.LOGIN]: (state, data) => {
    state.user = data;
  },
  [types.LOGOUT]: (state) => {
    state.user={};
  },
}
