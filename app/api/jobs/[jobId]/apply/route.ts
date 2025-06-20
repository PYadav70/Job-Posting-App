import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const session = await auth();

  if (!session?.user || !session.user.id) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  try {
    const jobId = params.jobId;

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return new NextResponse("Job not found", { status: 404 });
    }

    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        userId: session.user.id,
      },
    });

    if (existingApplication) {
      return new NextResponse("You already applied for this job", {
        status: 400,
      });
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        userId: session.user.id,
        status: "PENDING",
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error("Error applying to job:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
