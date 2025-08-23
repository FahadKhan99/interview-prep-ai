import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useEffect, useState } from "react";
import type { Lesson } from "../../utils/types";
import api from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuPlus } from "react-icons/lu";
import SummaryCard from "../../components/cards/SummaryCard";
import { CARD_BG } from "../../utils/data";
import moment from "moment";
import Modal from "../../components/Modal";
import CreateLessonForm from "./CreateLessonForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState<{
    open: boolean;
    data: Lesson | null;
  }>({
    open: false,
    data: null,
  });

  const fetchAllLessons = async () => {
    try {
      const res = await api.get(API_PATHS.LESSON.GET_ALL);

      if (res.data && res.data.lessons) {
        setLessons(res.data.lessons);
      }
    } catch (error) {
      console.log("Error fetching all lessons: ", error);
      throw error;
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    try {
      const res = await api.delete(API_PATHS.LESSON.DELETE(lessonId));
      const { message } = res.data;
    } catch (error) {
      console.log("Error deleting lesson: ", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAllLessons();
  }, []);
  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-6 md:px-0">
          {lessons.map((lesson, index) => (
            <SummaryCard
              key={index}
              colors={CARD_BG[index % CARD_BG.length]}
              lesson={lesson}
              lastUpdatedAt={
                lesson.updatedAt
                  ? moment(lesson.updatedAt).format("Do MM YY")
                  : ""
              }
              onSelect={() => navigate(`/interview-prep/${lesson._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data: lesson })}
            />
          ))}
        </div>

        <button
          className="h-12 md:h-12 flex items-center gap-3 justify-center bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold rounded-full px-4 text-gray-100 hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-200 fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-xl text-gray-100" /> Add New
        </button>
      </div>
      <Modal
        hideHeader
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
      >
        <div>
          <CreateLessonForm />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
