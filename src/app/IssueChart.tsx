"use client";

import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface IssueChartProps {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: IssueChartProps) => {
  const data = [
    { label: "Open", value: open, fill: "var(--red-a11)" },
    { label: "In Progress", value: inProgress, fill: "var(--violet-a11)" },
    { label: "Closed", value: closed, fill: "var(--green-a11)" },
  ];

  return (
    <Card className="shadow-lg">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60} fill="fill" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
