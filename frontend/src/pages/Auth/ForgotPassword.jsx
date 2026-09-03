import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  Leaf,
  CheckCircle,
} from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, this only shows the success message.
    // Later we will connect this to the Flask backend.
    console.log("Password reset requested for:", email);

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#343E4F]">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex min-h-[64px] max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF0E9]">
              <Leaf
                size={21}
                className="text-[#E57036]"
              />
            </div>

            <span className="text-lg font-bold text-[#343E4F]">
              D-Agro Market AI
            </span>
          </Link>

          {/* Login */}
          <Link
            to="/login"
            className="text-sm font-semibold text-[#E57036] hover:underline"
          >
            Log In
          </Link>

        </div>
      </header>


      {/* =====================================================
          MAIN
      ====================================================== */}
      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12 sm:px-6">

        <div className="w-full max-w-md">

          {/* =================================================
              CARD
          ================================================== */}
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

            {!submitted ? (

              <>
                {/* Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0E9]">
                  <Mail
                    size={26}
                    className="text-[#E57036]"
                  />
                </div>


                {/* Heading */}
                <div className="mt-6 text-center">

                  <h1 className="text-2xl font-bold text-[#343E4F] sm:text-3xl">
                    Forgot Password?
                  </h1>

                  
                </div>


                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="mt-8"
                >

                  {/* Email */}
                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-[#343E4F]"
                    >
                      Email Address
                    </label>

                    <div className="relative">

                      <Mail
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        placeholder="Enter your email address"
                        required
                        className="h-12 w-full rounded-lg border border-gray-200 bg-white pl-11 pr-4 text-sm text-[#343E4F] outline-none transition placeholder:text-gray-400 focus:border-[#E57036] focus:ring-2 focus:ring-[#E57036]/10"
                      />

                    </div>

                  </div>


                  {/* Submit */}
                  <button
                    type="submit"
                    className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#E57036] px-5 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Send Reset Link

                    <ArrowRight size={17} />

                  </button>

                </form>


                {/* Back to Login */}
                <div className="mt-6 text-center">

                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#343E4F] hover:text-[#E57036]"
                  >
                    <ArrowLeft size={16} />

                    Back to Login
                  </Link>

                </div>
              </>

            ) : (

              /* =================================================
                 SUCCESS MESSAGE
              ================================================== */
              <div className="py-6 text-center">

                {/* Success Icon */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                  <CheckCircle
                    size={28}
                    className="text-green-600"
                  />
                </div>


                <h1 className="mt-6 text-2xl font-bold text-[#343E4F]">
                  Check Your Email
                </h1>


                <p className="mt-3 text-sm leading-6 text-gray-500">
                  If an account exists for
                  <span className="font-semibold text-[#343E4F]">
                    {" "}
                    {email}
                  </span>
                  , we've sent instructions to reset your
                  password.
                </p>


                <p className="mt-3 text-xs text-gray-400">
                  Don't see the email? Check your spam or junk
                  folder.
                </p>


                {/* Back to Login */}
                <Link
                  to="/login"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-[#343E4F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2B3444]"
                >
                  <ArrowLeft size={16} />

                  Back to Login
                </Link>

              </div>

            )}

          </div>


          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-400">
            © 2024 D-Agro Market AI. Supporting Ethiopia's
            Agricultural Growth.
          </p>

        </div>

      </main>

    </div>
  );
}

export default ForgotPassword;