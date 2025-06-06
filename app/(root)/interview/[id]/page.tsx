import Image from "next/image";
import { redirect } from "next/navigation";
import Agent from "@/components/Agent";
import TechIcons from "@/components/TechIcons";
import { ROUTES } from "@/constants/routes";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/general.action";

const InterviewPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const interview = await getInterviewById(id);
  const user = await getCurrentUser();

  if (!interview) redirect(ROUTES.HOME);

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={interview.coverImage}
              alt="cover image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />

            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>

          <TechIcons techStack={interview.techstack} />
        </div>
        <p className="px-4 py-2 rounded-lg h-fit capitalize bg-dark-200">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.name || "You"}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
      />
    </>
  );
};

export default InterviewPage;
