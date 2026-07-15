import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react"
import GroupInfo from "./GroupInfo";

const ChatBox = () => {

  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const { selectedChat,isGroupInfoOpen ,setIsGroupInfoOpen } = useContext(ChatContext);

  const user = useSelector(
    (state) => state.auth.user
  );


  const getSender = (users) => {
    return users?.find(
      (u) => u._id !== user._id
    );
  };


  if (!selectedChat) {
    return (
      <div className="
        bg-transparent
        w-full
        h-full
        rounded-2xl
        flex
        items-center
        justify-center
      ">

      </div>
    );
  }


  const sender = getSender(selectedChat.users);


  return (

    <div
      className="
      bg-white
      w-full
      h-full
      flex
      flex-col
      overflow-hidden
      "
    >


      {/* HEADER */}

      <div
        className="
        p-2
        flex
        items-center
        gap-4
        px-6
        border-b
        shrink-0
        "
      >

        <img
          src={
            sender?.pic
          }
          className="
          
          w-12
          h-12
          rounded-full
          object-cover
          "
        />


        <div>
          <h2 className="text-lg font-semibold">
            {
              selectedChat.isGroupChat
                ? selectedChat.chatName
                : sender?.name
            }
          </h2>

          <p className="text-sm text-green-500">
            online
          </p>

        </div>

{/* ----------------------------eye button------------------ */}
         {
    selectedChat.isGroupChat && (

      <button

      onClick={()=>
setIsGroupInfoOpen(!isGroupInfoOpen)
}

      className="
      ml-auto
      text-xl
      hover:scale-110
      transition
      "
      >

        <i className="ri-more-2-line font-bold"></i>

      </button>

  

    )
  }

      {
isGroupInfoOpen &&

<GroupInfo />

}


      </div>



      {/* MESSAGE AREA */}

      <div
        className="
        
        flex-1
        overflow-y-auto
        px-6
        py-5
        "
      >


        <div
          className="
          h-115
          flex
          justify-center
          "
        >

          <p className="
            text-gray-400
            text-sm
            mt-10
          ">
            No messages yet
          </p>

        </div>


      </div>





      {/* INPUT */}

      <div
        className="
  p-3
  px-5
  flex
  items-center
  border-t
  shrink-0
  "
      >


        <div
          className="
    flex
    w-full
    gap-3
    items-center
    "
        >


          {/* Input Box */}

          <div
            className="
      flex-1
      relative
      "
          >

            <input

              type="text"

              value={message}

              onChange={(e) => setMessage(e.target.value)}

              placeholder="Type a message..."

              className="
w-full
border
border-gray-300
rounded-full
px-5
py-3
pl-12
outline-none
focus:ring-2
focus:ring-blue-300
"

            />


            {/* Emoji Button */}

            <button

              onClick={() => setShowEmoji(!showEmoji)}

              className="
absolute
left-4
top-1/2
-translate-y-1/2
text-xl
hover:scale-110
transition
"

            >
              <i className="ri-emoji-sticker-line"></i>

            </button>

            {
              showEmoji && (

                <div
                  className="
                           absolute
                          bottom-14
                          left-0
                           z-50
                          "
                >

                  <EmojiPicker

                    onEmojiClick={(emojiData) => {

                      setMessage(
                        message + emojiData.emoji
                      )

                    }}

                  />

                </div>

              )
            }

          </div>



          {/* Send Button */}

          <button
            className="
      bg-blue-500
      text-white
      px-7
      py-3
      rounded-full
      hover:bg-blue-600
      "
          >
            Send
          </button>



        </div>


      </div>


    </div>

  );
};

export default ChatBox;