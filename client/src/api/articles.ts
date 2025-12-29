import axios from "axios";

// 获取文章
export async function getArticles(params?: any) {
  return axios({
    url: "/blog/search",
    method: "get",
    params,
  });
}

// 获取文章详情
export async function getArticle(id: any) {
  return axios({
    url: `/blog/detail?id=${id}`,
    method: "get",
  });
}

// 新增文章
export async function addArticle(data: any) {
  return axios({
    url: "/blog/_token/add",
    method: "post",
    data,
  });
}

// 删除文章
export async function deleteArticle(id: any) {
  return axios({
    url: `/blog/_token/delete?id=${id}`,
    method: "delete",
  });
}

// 修改文章
export async function updateArticle(data: any) {
  return axios({
    url: "/blog/_token/update",
    method: "put",
    data,
  });
}
