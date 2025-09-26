import {
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl p-10 bg-white rounded-2xl shadow-2xl">
        {/* Left side: text */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
            SpendWise
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Take control of your finances with ease. <br />
            Track, manage, and grow your wealth — all in one place.
          </p>

          {/* Action Buttons */}
          <SignedOut>
            <div className="flex gap-6 justify-center md:justify-start">
              <SignInButton mode="modal">
                <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow hover:bg-blue-700 transition">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="px-6 py-3 text-lg font-semibold text-blue-600 border border-blue-600 rounded-xl shadow hover:bg-blue-50 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>

        {/* Right side: illustration */}
        <div className="hidden md:block">
          <img
            src="/flaticon.svg"
            alt="Finance illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} SpendWise. All rights reserved.
      </footer>
    </div>
  );
};
