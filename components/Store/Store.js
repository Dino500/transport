import { action } from "easy-peasy";

export default {
  filter: {
    from: null,
    to: null,
    dateFrom: null,
    dateTo: null,
    aktivan: false,
  },

  range: {
    from: null,
    to: null,
  },
  setFilter: action((state, peyload) => {
    state.filter.from = peyload.from;
    state.filter.to = peyload.to;
  }),

  setactiv: action((state, payload) => {
    console.log(payload);
    state.filter.from = payload.from;
    state.filter.to = payload.to;
    state.filter.dateFrom = payload.dateFrom;
    state.filter.dateTo = payload.dateTo;
    state.filter.aktivan = true;
  }),

  deaktiviraj: action((state, payload) => {
    state.filter.aktivan = false;
  }),
  deleteFilter: action((state) => {
    state.filter.from = null;
    state.filter.to = null;
    state.filter.aktivan = false;
  }),

  setRange: action((state, payload) => {
    state.range.from = payload.from;
    state.range.to = payload.to;
  }),
};
