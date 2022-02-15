export default {
  state: {
    loading: [],
    key: null,
    step: "buy",
    selectedStep: 'buy',
    currentError: null,
  },
  actions: {

  },
  mutations: {
    setKey(state, val) {
      state.key = val;
    },
    setLoading(state, { name, enable }) {
      if (enable) {
        state.loading.push(name);
      } else {
        state.loading = state.loading.filter((el) => el !== name);
      }
    },
    setStep(state, val) {
      state.step = val;
    },
    setSelectedStep(state, val) {
      state.selectedStep = val;
    },
    setError(state, val) {
      state.currentError = val;
    }
  },
  getters: {
    getKey(state) {
      return state.key;
    },
    getError(state) {
      return state.currentError;
    },
    getSelectedStep(state) {
      return state.selectedStep;
    },
    getLoading(state) {
      return state.loading.length > 0;
    },
    getStep(state) {
      return state.step
    },
  }
}