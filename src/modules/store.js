// eslint-disable-next-line no-unused-vars
import { reactive, readonly, computed } from "vue";

const state = reactive({
  msg: ["hi"],
  config: {
    "user": {},
    "features": {}
  }
});

export default {
  state: readonly(state),
  actions: {
    isAuth() {
      return Boolean(Object.keys(state.config.user).length);
    },
    add(item) {
      state.msg.push(item);
    },
    set(key, value) {
      state.config[key] = value;
    },
  }
};
