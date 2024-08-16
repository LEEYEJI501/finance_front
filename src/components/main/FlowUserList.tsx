import React, { useEffect, useState } from "react";
import { Card, Button } from "@/components/index";
import { fetchGetUnFollwedUsers, fetchFollowUser } from "@/services/social";
import { IUserSync } from "@/types/social";
import { useStorage } from "@/hooks/useStorage";
import { useToast } from "@/contexts/ToastContext";
import constants from "@/constants";

const FlowUserList: React.FC = () => {
  const { isLoggedIn, user } = useStorage();
  const [users, setUsers] = useState<IUserSync[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const loadUnFollwedUserList = async () => {
      if (isLoggedIn) {
        const { users } = await fetchGetUnFollwedUsers();
        setUsers(users);
      }
    };

    loadUnFollwedUserList();
  }, [isLoggedIn]);

  const handleFollowUser = async (id: number, username: string) => {
    if (isLoggedIn && user) {
      await fetchFollowUser(user.id, id);

      showToast(
        `${username} 팔로우 완료! 이제부터 피드 알람을 확인 할 수 있어요.`,
        constants.TOAST_TYPES.SUCCESS
      );
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      {isLoggedIn && (
        <div className="flex space-x-4 my-2">
          {users.map((user) => (
            <Card
              key={user.userId}
              className="w-48 h-64 bg-gray text-black p-4 rounded-lg border border-gray-300 shadow-sm flex-shrink-0"
            >
              <img
                src={"/default-profile.png"}
                alt={`${user.username} 프로필 이미지`}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-center font-semibold truncate">
                {user.username}
              </p>
              <Button
                onClick={() => handleFollowUser(user.userId, user.username)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                팔로우
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlowUserList;
