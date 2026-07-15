import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import ViewGroupMember from "./ViewGroupMember";

const GroupInfo = () => {
  const { selectedChat, setIsGroupInfoOpen, isViewMembersOpen ,setIsViewMembersOpen } =
    useContext(ChatContext);

  return (
    <div
      className="
      absolute
      top-25
      right-0
      mr-4
      w-80
      bg-white
      rounded-2xl
      shadow-2xl
      border
      z-50
      overflow-hidden
      animate-in
      fade-in
      zoom-in-95
      duration-200
      "
    >
      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between
        px-5
        py-4
        border-b
        bg-gray-50
        "
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Group Info
        </h2>

        <button
          onClick={() => setIsGroupInfoOpen(false)}
          className="
          w-9
          h-9
          rounded-full
          hover:bg-gray-200
          transition
          "
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      {/* Group */}

      <div
        className="
        flex
        flex-col
        items-center
        py-6
        px-5
        "
      >
        <img
          src={selectedChat?.chatName?.slice(0, 2).toUpperCase()}
          alt="group"
          className="
          w-20
          h-20
          rounded-full
          object-cover
          border-4
          border-gray-100
          "
        />

        <h3
          className="
          mt-4
          text-xl
          font-semibold
          text-gray-500
          "
        >
         <span className="text-gray-800">Admin: </span>{selectedChat?.groupAdmin?.name}
        </h3>
        

        <p className="text-gray-500 text-sm mt-1">
          {selectedChat.users.length} Members
        </p>
      </div>

      {/* Divider */}

      <div className="border-t"></div>

      {/* Options */}

      <div className="p-3">

        <button
        onClick={() => setIsViewMembersOpen(true)}
          className="
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          hover:bg-gray-100
          transition
          "
        >
          <i className="ri-user-star-line text-lg text-blue-500"></i>

          <span className="font-medium">
            View Members
          </span>
        </button>


        <button
          className="
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          hover:bg-gray-100
          transition
          "
        >
          <i className="ri-user-add-line text-lg text-green-600"></i>

          <span className="font-medium">
            Add Member
          </span>
        </button>

        <button
          className="
          w-full
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          hover:bg-red-50
          text-red-600
          transition
          "
        >
          <i className="ri-logout-box-r-line text-lg"></i>

          <span className="font-medium">
            Leave Group
          </span>
        </button>

      </div>

      {
  isViewMembersOpen && <ViewGroupMember />
}
    </div>
  );
};

export default GroupInfo;