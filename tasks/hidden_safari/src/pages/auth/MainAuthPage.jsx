import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function MainAuthPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const handleSwitchAuth = () => {
    const newPath = isLoginPage ? "/register" : "/login";
    navigate(newPath);
  };

  return (
    <section className="px-4 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
          <div className="ml-auto">
            <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-slate-900">
              Seamless Adventures for an Exclusive Lifestyle
            </h2>
            <p className="text-sm mt-6 text-slate-500 leading-relaxed">
              Experience hassle-free travel with our dedicated team — where
              every journey feels effortless, and every moment unforgettable.
            </p>

            <p className="text-sm mt-12 text-slate-500">
              {isLoginPage ? (
                <>
                  Don't have an account?
                  <button
                    onClick={handleSwitchAuth}
                    className="text-[#c0392b] font-medium hover:underline ml-1"
                  >
                    Register here
                  </button>
                </>
              ) : (
                <>
                  Already have an account?
                  <button
                    onClick={handleSwitchAuth}
                    className="text-[#c0392b] font-medium hover:underline ml-1"
                  >
                    Login here
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Component Switch based on URL */}
          {isLoginPage ? <Login /> : <Register />}
        </div>
      </div>
    </section>
  );
}
