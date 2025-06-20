// src/app/(routes)/quiz/[topic]/page.js

import React, { Suspense } from "react";
import { getQuizByTopic } from "@/data/quizzes/page";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import QuizContent from "@/components/quiz/QuizContent"; // ✅ Import normally

// ✅ Server-only metadata function
export async function generateMetadata({ params }) {
  const { topic } = params;
  const quiz = topic ? getQuizByTopic(topic) : null;

  if (!quiz) {
    return {
      title: "Quiz Not Found - Connecting Dots ERP",
      description:
        "The requested quiz topic was not found. Explore our other interactive quizzes to test your knowledge.",
    };
  }

  const formattedTopic = topic
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedTopic} Quiz | Test Your Knowledge - Connecting Dots ERP`,
    description: `Challenge yourself with our comprehensive ${formattedTopic} quiz. Test your skills with ${quiz.questions?.length || "multiple"} interactive questions and improve your expertise.`,
  };
}

export default function QuizPage({ params }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <QuizContent params={params} />
    </Suspense>
  );
}
