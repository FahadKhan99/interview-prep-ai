import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import SpinnerLoader from "../../components/loader/SpinnerLoader";
import api from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useUserContext } from "../../hooks/useUserContext";

const CreateLessonForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();

    const { role, description, experience, topicsToFocus } = formData;

    if (!role || !description || !topicsToFocus || !experience) {
      setError("Please fill all the required details");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // call the api to generate questions
      const aiResponse = await api.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        numberOfQuestions: 10,
      });
      console.log(aiResponse.data);
      // an array [{question, answer}, ...]
      const generatedQuestions = aiResponse.data;
      console.log(generatedQuestions);

      if (generatedQuestions) {
        const res = await api.post(API_PATHS.LESSON.CREATE, {
          ...formData,
          questions: generatedQuestions,
        });

        const { lesson } = res.data;

        if (lesson._id) {
          navigate(`/interview-prep/${lesson._id}`);
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
        console.log("Error creating lesson: ", error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-[85vw] md:w-[60vw] lg:w-[40vw] p-7 flex flex-col justify-center">
      <h3 className="font-semibold text-lg text-black">
        Start a New Interview Journey
      </h3>
      <p className="text-[14px] text-slate-500 mt-[5px] mb-6">
        Fill out a few quick details and unlock your personalized set of
        interview questions!
      </p>

      <form onSubmit={handleCreateLesson}>
        <Input
          value={formData.role}
          label="Target Role"
          onChange={({ target }) => handleChange("role", target.value)}
          placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
          type="text"
        />
        <Input
          value={formData.experience}
          label="Years of Experience"
          onChange={({ target }) => handleChange("experience", target.value)}
          placeholder="(e.g., 1 year, 3 years, 5+ years)"
          type="number"
        />
        <Input
          value={formData.topicsToFocus}
          label="Topics to Focus On"
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          placeholder="(Comma-separated, e.g., React, Node.js, MongoDB)"
          type="text"
        />
        <Input
          value={formData.description}
          label="Description"
          onChange={({ target }) => handleChange("description", target.value)}
          placeholder="(Any specific goals or notes for this lesson)"
          type="text"
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading && <SpinnerLoader />} Create Lesson
        </button>
      </form>
    </div>
  );
};

export default CreateLessonForm;
