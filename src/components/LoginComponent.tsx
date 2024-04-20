import { addUser } from "@/redux/proSlice";
import { Key } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import supabase from "@/supabase/config";
import toast from "react-hot-toast";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Combined message state
  const [isAuth, setIsAuth] = useState(false); // Combined message state
  const [route, setRoute] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const dispatch = useDispatch();
  const handleEmailChange = (e: { target: { value: any } }) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test if the entered email matches the regex pattern
    const isValidEmail = emailRegex.test(enteredEmail);

    if (!isValidEmail) {
      setMessage("Please enter a valid email address.");
      setIsSubmitDisabled(true);
    } else {
      setMessage(""); // Clear previous messages when input changes
      setIsSubmitDisabled(false);
    }
  };

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from("admins")
      .select("email")
      .eq("email", email)
      .single();

    if (data && data.email && email === data.email) {
      const userInformation = { email };
      dispatch(addUser(userInformation));
      setMessage("You are authorized to login."); // Set authorized message
      setIsAuth(true);
      setRoute("/admin");
      return;
    } else {
      // First, perform a query to check if the username or email already exist
      const { data, error } = await supabase
        .from("ask_to_be_an_admin")
        .select("email")
        .eq("email", email);

      if (error) {
        console.error("Error checking for existing records:", error.message);
        return; // Exit the function early if an error occurs
      }

      // If there are existing records with the same username or email, inform the user and return
      if (data && data.length > 0) {
        setMessage(
          "You have already sent a request. Please wait for the super admin to accept it."
        );
        return;
      }

      // If no existing records are found, proceed with inserting the new record
      try {
        await supabase.from("ask_to_be_an_admin").insert({ email: email });
        setMessage("Your request was sent to the super admin.");
        toast.success("Sent 🎉");
        // setUsername("");
        setEmail("");
        setIsAuth(false);
      } catch (error) {
        console.error("Error inserting data:", (error as any).message);

        setMessage(
          "An error occurred while sending your request. Please try again later."
        );
      }
    }
  };

  return (
    <div className="relative py-3 w-full">
      <div className="absolute w-full inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-3xl"></div>
      <div className="relative w-full px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <div>
            <h1 className="text-2xl font-semibold">Ask to be an Admin</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <div
              className={`${
                isAuth ? "hidden" : "block"
              } py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7`}
            >
              
              <div className="relative">
                <input
                required
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  placeholder="Email address"
                />
                <label
                  htmlFor="email"
                  className={`absolute left-0 -top-3.5 text-gray-600 text-sm ${
                    email
                      ? "-top-3.5"
                      : "peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2"
                  } transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm`}
                >
                  Email Address
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className={`bg-blue-500 '} text-white rounded-md px-2 py-1 ${
                  isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitDisabled}
              >
                Submit
              </button>
            </div>

            <div className="relative mt-5">
              {!isAuth && message && (
                <p
                  className={`${
                    message.includes("authorized")
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {message}
                </p>
              )}
              {isAuth && (
                <div className="text-sm mt-2">
                  <span className="text-center w-full inline-block flex items-center justify-center py-10">
                    <Key className="text-blue-600" size={100} />
                  </span>
                  You are authorized now, visit
                  <Link
                    className="underline hover:text-blue-600 mx-1"
                    href={route}
                  >
                    Admin page
                  </Link>
                  to manage your data
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
