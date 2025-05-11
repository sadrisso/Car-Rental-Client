import React from "react";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 md:py-16 rounded-2xl shadow-xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-blue-500 object-cover"
            src={user?.photoURL || "https://i.pravatar.cc/300"}
            alt={user?.displayName || "User"}
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {user?.displayName || "Shoeb Akter Drisso"}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              MERN Stack Developer
            </p>
            <p className="mt-1 text-sm text-gray-500">Rangpur, Bangladesh</p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center md:justify-start gap-3">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Follow
              </button>
              <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">
                Message
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center my-8">
          <div>
            <h4 className="text-xl font-semibold text-gray-700">34</h4>
            <p className="text-sm text-gray-500">Projects</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-700">21</h4>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-700">12</h4>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>

        {/* Bio Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">About Me</h3>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            I’m a passionate MERN Stack developer who loves building useful and
            beautiful web applications. My goal is to help others through
            technology and keep learning every day.
          </p>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
