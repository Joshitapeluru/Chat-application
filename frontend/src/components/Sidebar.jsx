import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUserLoading,
  } = useChatStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  // ✅ Filter users who are online based on isOnline
  const onlineUsers = users.filter((user) => user.isOnline);

  // ✅ Filter based on toggle
  const filteredUsers = showOnlineOnly ? onlineUsers : users;

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) {
    return (
      <aside className="w-72 p-4 text-white bg-zinc-900">
        <p>Loading contacts...</p>
      </aside>
    );
  }

  return (
    <aside className="h-full w-72 bg-zinc-900 text-white border-r border-zinc-800 flex flex-col">
      {/* Header */}
      <div className="border-b border-zinc-800 px-5 py-4">
        <div className="flex items-center gap-2 text-zinc-300">
          <Users className="w-5 h-5" />
          <span className="font-semibold text-lg">Contacts</span>
        </div>
      </div>

      {/* Show online toggle */}
      <div className="px-5 py-3">
        <label className="flex items-center gap-2 text-sm text-zinc-400">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="accent-purple-500"
          />
          Show online only
          <span className="text-xs text-zinc-500">({onlineUsers.length} online)</span>
        </label>
      </div>

      {/* User list */}
      <div className="overflow-y-auto px-3 flex-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              selectedUser?._id === user._id
                ? "bg-zinc-800 ring-1 ring-purple-600"
                : "hover:bg-zinc-800"
            }`}
          >
            <div className="relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
              {/* ✅ Dot color based on isOnline */}
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-zinc-900 ${
                  user.isOnline ? "bg-green-500" : "bg-gray-500"
                }`}
              />
            </div>

            <div className="text-left">
              <p className="font-medium text-sm truncate">{user.fullName}</p>
              <p className="text-xs text-zinc-400">
                {user.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4 text-sm">
            No users available
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
