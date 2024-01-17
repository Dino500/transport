import { action } from "easy-peasy";

export default {
  filter: {
    from: null,
    to: null,
    aktivan: false
  },

  range: {
    from: null,
    to: null
  },
  setFilter: action((state, peyload) => {

    state.filter.from = peyload.from;
    state.filter.to = peyload.to;

  }),

  setactiv: action((state, payload) => {
    state.filter.from = payload.from;
    state.filter.to = payload.to;
    state.filter.aktivan = true;
  }),

  deaktiviraj: action((state, payload) => {
    state.filter.aktivan = false;
  }),
  deleteFiler: action((state) => {
    state.filter.from = null;
    state.filter.to = null;
  })

  ,
  setRange: action((state, payload) => {
    state.range.from = payload.from;
    state.range.to = payload.to;
  })
}
