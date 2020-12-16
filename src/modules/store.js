import { reactive, readonly } from "vue";

const state = reactive({
  msg: ["hi"],
  config: {
    "user": {},
    "features": {}
  }
});

export default {
  state: readonly(state),
  isAuth: Boolean(Object.keys(state.config.user).length),
  actions: {
    add(item) {
      state.msg.push(item);
    },
    set(key, value) {
      state.config[key] = value;
    },
  }
};
