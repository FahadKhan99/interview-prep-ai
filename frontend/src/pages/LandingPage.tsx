import { useNavigate } from "react-router-dom";
import HERO_IMG from "../assets/hero-image.png";
import { APP_FEATURES } from "../utils/data";
import { useState } from "react";
import { LuSparkles } from "react-icons/lu";
import Login from "../pages/auth/Login";
import SignUp from "./auth/SignUp";
import Modal from "../components/Modal";

const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState<"login" | "signup">("login");

  const handleCTA = () => {};

  return (
    <>
      <div className="w-full min-h-full bg-[#FFFCEF]">
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0" />

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* navbar */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold">
              Interview Prep AI
            </div>
            <button
              className="bg-linear-to-r from-[#FF9324] to-[#E99A4B] text-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
              onClick={() => setOpenAuthModel(!openAuthModel)}
            >
              Login / Sign Up
            </button>
          </header>

          {/* hero section */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 pb-8 md:mb-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-bold bg-amber-100 px-3 py-1 rounded-full border border-amber-400">
                  <LuSparkles /> AI Powered
                </div>
              </div>

              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Ace Interviews with <br />{" "}
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#ff9324_0%,_#fcd760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery - your ultimate interview toolkit is
                here.
              </p>

              <button
                className="bg-black font-semibold text-sm text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-full relative z-10">
        <div>
          <section className="mx-auto max-w-6xl flex items-center justify-center -mt-36 ">
            <img
              src={HERO_IMG}
              alt="Hero Image"
              className="w-[80vw] rounded-lg"
            />
          </section>
        </div>

        <div className="w-full min-h-full bg-[#FFFCEF] mt-10 ">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center mb-12">
                Features That Make You Shine
              </h2>

              <div className="flex flex-col items-center gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature) => {
                    return (
                      <div
                        id={feature.id}
                        className="bg-[#FFFEF8] p-6 rounded-xs shadow-xl hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                      >
                        <h3 className="text-base font-semibold mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>

                {/* remaining 2 features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  {APP_FEATURES.slice(3).map((feature) => {
                    return (
                      <div
                        id={feature.id}
                        className="bg-[#FFFEF8] p-6 rounded-xs shadow-xl hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                      >
                        <h3 className="text-base font-semibold mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="bg-[#FFFCEF] py-10 px-4">
          <div className="container mx-auto text-center text-gray-800">
            <div className="flex justify-center items-center gap-2 mb-2">
              <div className="text-black text-xl font-bold">
                Interviews Prep <span className="text-[#FF9324]">AI</span>
              </div>
            </div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Fahad Khan. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      <Modal
        isOpen={openAuthModel}
        onClose={() => {
          setOpenAuthModel(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
