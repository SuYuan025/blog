import { defineStore } from 'pinia'

export const adminStore = defineStore("admin", {
  state: () => ({
    id: 0,
    account: "",
    token: ""
  }),
  actions: {},
  getters: {},
});