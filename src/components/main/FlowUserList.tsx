import React, { useEffect, useState } from "react";
import { Card } from "@/components/index";
import { fetchGetUnFollwedUsers } from "@/services/social";
import { IUserSync } from "@/types/social";

const FlowUserList: React.FC = () => {

  const [users, setUsers] = useState<IUserSync[]>([]);

  useEffect(() => {
    const loadUnFollwedUserList = async () => {
        const { users } = await fetchGetUnFollwedUsers();
        setUsers(users)
    };

    loadUnFollwedUserList();
  }, []);

  return (
    <div className="w-full overflow-x-auto ">
      <div className="flex space-x-4 my-2">
        {users.map((user) => (
          <Card
            key={user.userId}
            className="w-48 h-64 bg-gray text-black p-4 rounded-lg border border-gray-300 shadow-sm flex-shrink-0 flex-grow-0"
          >
            <img
              src={"/default-profile.png"}
              alt={`${user.username} 프로필 이미지`}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-center font-semibold truncate">{user.username}</p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              팔로우
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlowUserList;
