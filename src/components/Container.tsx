import { ChildrenProps } from "@/types/ChildrenProps";

export default function Container({ children }: ChildrenProps) {
  return <div className="max-w-4xl p-4 mx-auto">{children}</div>;
}
