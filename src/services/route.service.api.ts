import { DeleteReq } from "@/types/route.delete.types";
import { appApi } from "./app.service.api";
import { SearchReq } from "@/types/route.search.types";

export const DeleteFn = async (routeData: DeleteReq) => {
  const id = Number(routeData);
  await appApi.delete(`/route/${id}`);
};

export const searchFn = async (searchData: SearchReq) => {
  const response = await appApi.post("/route/search", searchData);
  return response.data;
};
