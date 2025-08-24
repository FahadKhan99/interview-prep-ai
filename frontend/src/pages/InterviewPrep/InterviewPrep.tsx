import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import type { ConceptExplanation, Lesson } from "../../utils/types";
import moment from "moment";
import RoleInfoHeader from "./components/RoleInfoHeader";
import api from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { AnimatePresence, motion } from "framer-motion";
import QuestionCard from "../../components/cards/QuestionCard";
import toast from "react-hot-toast";
import { LuCircleAlert } from "react-icons/lu";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/loader/SkeletonLoader";

const InterviewPrep = () => {
  const { lessonId } = useParams();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [error, setError] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState<ConceptExplanation | null>(
    null
  );
  const [explanationCache, setExplanationCache] = useState<
    Record<string, ConceptExplanation>
  >({});

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  const fetchLessonById = async () => {
    try {
      const res = await api.get(API_PATHS.LESSON.GET_ONE(lessonId!));

      if (res.data && res.data.lesson) {
        setLesson(res.data.lesson);
      }
    } catch (error) {
      console.log("Error fetching lesson by Id: ", error);
    }
  };

  // generate concept explanation (learn more)
  const generateConceptExplanation = async (
    questionId: string,
    question: string
  ) => {
    try {
      setError("");
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      // check cache
      if (explanationCache[questionId]) {
        const cached = explanationCache[questionId];
        if (cached) {
          setExplanation(cached);
          setIsLoading(false);
          return;
        }
      }

      const res = await api.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        question,
      });

      if (res.data) {
        setExplanation(res.data);

        // store in cache
        setExplanationCache((prev) => ({
          ...prev,
          [questionId]: res.data,
        }));
      }
    } catch (error) {
      setError("Failed to generate explanation, Try again later");
      console.log("Error generating concept explanation: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePin = async (questionId: string) => {
    try {
      const res = await api.post(API_PATHS.QUESTION.PIN(questionId));
      if (res.data && res.data.lesson) {
        toast.success("Question Pinned Successfully");
        fetchLessonById();
      }
    } catch (error) {
      console.log("Error toggling question pin: ", error);
    }
  };

  const uploadMoreQuestions = async () => {};

  useEffect(() => {
    if (lessonId) {
      fetchLessonById();
    }

    return () => {};
  }, [lesson]);
  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={lesson?.role || ""}
        topicsToFocus={lesson?.topicsToFocus || ""}
        experience={lesson?.experience || "-"}
        questions={lesson?.questions?.length || "-"}
        description={lesson?.description || ""}
        lastUpdated={
          lesson?.updatedAt
            ? moment(lesson.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 px-4">
        <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {lesson?.questions.map((question, index) => {
                return (
                  <motion.div
                    key={question._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout // key prop that animates the position changes
                    layoutId={`question-${question._id || index}`} // helps framer tracks specific items
                  >
                    <QuestionCard
                      question={question.question}
                      answer={question.answer}
                      onLearMore={() =>
                        generateConceptExplanation(
                          question._id,
                          question.question
                        )
                      }
                      isPinned={question.isPinned}
                      onTogglePin={() => handleTogglePin(question._id)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title={isLoading ? undefined : explanation?.title}
          >
            {error && (
              <p className="flex gap-2 text-md text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" /> {error}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <AIResponsePreview content={explanation.explanation} />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
