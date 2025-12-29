import axios from "axios";

// 获取分类
export async function getCategories() {
  return axios({
    url: "/category/list",
    method: "get",
  });
}

// 新增分类
export async function addCategory(data: any) {
  return axios({
    url: "/category/_token/add",
    method: "post",
    data,
  });
}

// 删除分类
export async function deleteCategory(id: any) {
  return axios({
    url: `/category/_token/delete?id=${id}`,
    method: "delete",
  });
}

// 修改分类
export async function updateCategory(data: any) {
  return axios({
    url: "/category/_token/update",
    method: "put",
    data,
  });
}