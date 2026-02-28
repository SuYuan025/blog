import { defineStore } from "pinia";

export const adminStore = defineStore("admin", {
  state: () => ({
    id: 0,
    account: "",
    token: "",
  }),
  actions: {
    setAdmin(admin: any) {
      this.id = admin.id;
      this.account = admin.account;
      this.token = admin.token;
    },
  },
  getters: {},
});
