import { useEffect, useRef, useState } from "react";
import {
  LuCheck,
  LuChevronDown,
  LuCopy,
  LuPin,
  LuPinOff,
  LuSparkles,
} from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

interface Props {
  question: string;
  answer: string;
  onLearMore: () => void;
  isPinned: boolean;
  onTogglePin: () => void;
}

const QuestionCard = ({
  question,
  answer,
  onLearMore,
  isPinned,
  onTogglePin,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleAnswerCopy = async () => {
    try {
      await navigator.clipboard.writeText(answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Answer Copy failed", err);
    }
  };

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <div className="bg-white overflow-hidden rounded-lg mb-4 py-4 px-5 shadow-xl shadow-gray-100/70 border border-gray-100/60 group">
        <div className="flex items-start justify-between cursor-pointer">
          <div className="flex gap-3.5 items-start">
            <span className="text-md md:text-[15px] font-semibold mt-1 text-gray-400 leading-[18px]">
              Q.
            </span>

            <h3
              className="text-md md:text-lg font-medium text-gray-800 md:mr-20 md-0"
              onClick={toggleExpand}
            >
              {question}
            </h3>
          </div>

          <div className="flex items-center justify-end ml-4 relative">
            <div
              className={`flex ${
                isExpanded ? "md:flex" : "md:hidden group-hover:flex"
              }`}
            >
              <button
                onClick={handleAnswerCopy}
                className="flex items-center gap-2 text-md text-teal-800 font-medium bg-teal-50 px-3 py-1 mr-2 rounded text-nowrap border border-teal-50 hover:border-teal-200 cursor-pointer"
                aria-label="Copy Answer"
              >
                {copied ? (
                  <LuCheck className="text-green-600" size={16} />
                ) : (
                  <LuCopy size={16} />
                )}
                {copied && (
                  <span className="absolute top-8 right-35 bg-black text-white text-xs rounded-md px-2 py-1 opacity-80 group-hover:opacity-100 transition">
                    Copied!
                  </span>
                )}
              </button>

              <button
                className="flex items-center gap-2 text-md text-indigo-800 font-medium bg-indigo-50 px-3 py-1 mr-2 rounded text-nowrap border border-indigo-50 hover:border-indigo-200 cursor-pointer"
                onClick={onTogglePin}
              >
                {isPinned ? (
                  <LuPinOff className="text-md" />
                ) : (
                  <LuPin className="text-md" />
                )}
              </button>
              <button
                className="flex items-center gap-2 text-md text-cyan-800 font-medium bg-cyan-50 px-3 py-1 mr-2 rounded text-nowrap border border-cyan-50 hover:border-cyan-200 cursor-pointer"
                onClick={() => {
                  setIsExpanded(true);
                  onLearMore();
                }}
              >
                <LuSparkles className="text-md" />
                <span className="hidden md:block">Learn more</span>
              </button>
            </div>

            <button
              className="text-gray-400 hover:text-gray-500 cursor-pointer "
              onClick={toggleExpand}
            >
              <LuChevronDown
                size={20}
                className={`transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* answer */}
        <div
          className="transition-all duration-300 ease-in-out"
          style={{ maxHeight: `${height}px` }}
        >
          <div
            ref={contentRef}
            className="mt-4 text-gray-700 bg-gray-50 p-4 rounded-lg"
          >
            {isExpanded && <AIResponsePreview content={answer} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
