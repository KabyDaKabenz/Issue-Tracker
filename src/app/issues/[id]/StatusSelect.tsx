"use client";

import { Select, Flex, Text } from "@radix-ui/themes";
import { Issue, Status } from "@prisma/client";
import { statusSelection } from "../(issuelist)/IssueStatusFilter";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const changeStatus = async (status: Status) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status,
      });

      router.refresh();
    } catch (error) {
      toast.error("Changes could not be saved.");
    }
  };

  return (
    <Flex direction="column" gap="4">
      <Text size="2" weight="bold" align="center">
        Status
      </Text>
      <Select.Root
        defaultValue={issue.status || "OPEN"}
        onValueChange={changeStatus}
      >
        <Select.Trigger placeholder="Status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statusSelection.map((status) => (
              <Select.Item key={status.label} value={status.value!}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </Flex>
  );
};

export default StatusSelect;
