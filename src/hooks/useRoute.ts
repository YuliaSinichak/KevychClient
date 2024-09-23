import { DeleteFn } from "@/services/route.service.api";
import { useMutation } from "@tanstack/react-query";

export const useRoute = () => {
  const DeleteRequest = useMutation({
    mutationFn: DeleteFn,
  });

  return {
    delete: DeleteRequest,
  };
};
