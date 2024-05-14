import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilterSkeleton from "./IssueStatusFilterSkeleton";
import { Suspense } from "react";
import dynamic from "next/dynamic";

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
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssuesToolbar;
