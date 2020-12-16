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
  actions: {
    add(item) {
      state.msg.push(item);
    },
    set(key, value) {
      state.config[key] = value;
    }
  }
};
