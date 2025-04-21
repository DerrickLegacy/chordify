import React from "react";
import SectionHeader from "../../components/section_header/SectionHeader";

export default function UserProfile() {
  const loggedInUserEmail = JSON.parse(localStorage.getItem("hiddenSafariLoggedInUse_email"));
  const usersJson = localStorage.getItem("hidden_safari_user");

  if (!usersJson) {
    return <div className="text-center py-20">No user data found</div>;
  }

  const userObj = JSON.parse(usersJson);
  let user = null;

  Object.keys(userObj).forEach(key => {
    if (userObj[key]?.email === loggedInUserEmail) {
      user = userObj[key];
    }
  });

  if (!user) {
    return <div className="text-center py-20">User not found</div>;
  }

  const teamPageDetails = {
    mainText: "Profile",
    minorText: "My ",
    description: "",
  };

  return (
    <section className="pt-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          mainText={teamPageDetails.mainText}
          minorText={teamPageDetails.minorText}
          description={teamPageDetails.description}
        />
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-2xl overflow-hidden mt-10 p-6">
          <div className="flex flex-col items-center space-y-4">
            <img
              className="w-28 h-28 rounded-full border-4 border-[#e27160] object-cover"
              src="/images/person_avatar.png"
              alt="User profile"
            />
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            {user.phone && <p className="text-sm text-gray-500">{user.phone}</p>}
            {user.location && <p className="text-sm text-gray-500">{user.location}</p>}
            <button className="mt-4 px-4 py-2 bg-[#e27160] text-white rounded-lg hover:bg-[#c75b4c] transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}