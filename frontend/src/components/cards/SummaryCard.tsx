import { LuTrash2 } from "react-icons/lu";
import type { Lesson } from "../../utils/types";
import { getInitials } from "../../utils/helper";

type Props = {
  lesson: Lesson;
  colors: { id: number; bgcolor: string };
  lastUpdatedAt: string;
  onSelect: () => void;
  onDelete: () => void;
};

const SummaryCard = ({
  lesson,
  colors,
  lastUpdatedAt,
  onDelete,
  onSelect,
}: Props) => {
  return (
    <div
      className="bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-4 relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-white flex rounded-md items-center justify-center mr-4">
            <span className="text-lg font-semibold text-black">
              {getInitials(lesson.role)}
            </span>
          </div>

          {/* content container */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              {/* title and skill */}
              <div>
                <h2 className="text-[17px] font-medium">{lesson.role}</h2>
                <p className="text-xs text-medium text-gray-900">
                  {lesson.topicsToFocus}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-0 right-0"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 />
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <div className="text-[11px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full whitespace-nowrap">
            Experience: {lesson.experience}{" "}
            {lesson.experience === "1" ? "Year" : "Years"}
          </div>

          <div className="text-[11px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full whitespace-nowrap">
            {lesson.questions.length} Q&A
          </div>

          <div className="text-[11px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full whitespace-nowrap">
            Last Updated: {lastUpdatedAt}
          </div>
        </div>

        <p className="text-[13px] text-gray-500 line-clamp-2 mt-3">
          {lesson.description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
