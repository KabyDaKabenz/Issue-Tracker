import AddIssueButton from "@/components/AddIssueButton";
import { Flex } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import IssueStatusFilterSkeleton from "./IssueStatusFilterSkeleton";

const IssueStatusFilter = dynamic(() => import("./IssueStatusFilter"), {
  ssr: false,
  loading: () => <IssueStatusFilterSkeleton />,
});

const IssuesToolbar = () => {
  return (
    <Flex justify="between">
      <Suspense>
        <IssueStatusFilter />
      </Suspense>
      <AddIssueButton />
    </Flex>
  );
};

export default IssuesToolbar;
