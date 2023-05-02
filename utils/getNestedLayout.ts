import { GetLayout } from "@/types/layout";
import { ReactNode } from "react";

export const getNestedLayout = (parent: GetLayout, child: GetLayout) => {
  return (page: ReactNode) => parent(child(page));
};
