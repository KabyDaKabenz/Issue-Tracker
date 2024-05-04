import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/client";
import { createIssueSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

// export async function GET(request: Request) {
//   const issues = await prisma.issue.findMany();

//   if (!issues) {
//     return NextResponse.json(
//       { message: "Something went wrong" },
//       { status: 400 }
//     );
//   }

//   return NextResponse.json(issues, { status: 200 });
// }
