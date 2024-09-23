import { useMutation } from "@tanstack/react-query";
import { searchFn } from "@/services/route.service.api";
import { SearchReq } from "@/types/route.search.types";

export const useSearch = () => {
  const search = useMutation({
    mutationFn: (searchData: SearchReq) => searchFn(searchData),
  });

  return { search };
};
