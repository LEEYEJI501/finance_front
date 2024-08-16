import React from "react";
import { Card } from "@/components/index";

const FlowUserList: React.FC = () => {
  const users = [
    { id: 1, name: "oasis7979", followText: "hyojun12345님이 팔로우합니다" },
    { id: 2, name: "dbdj.cjd", followText: "" },
    { id: 3, name: "자영", followText: "" },
    { id: 4, name: "Hellin", followText: "jnn.fit님 외 6명이 팔로우합니다" },
    { id: 5, name: "blue_sky22", followText: "happy_life님이 팔로우합니다" },
    { id: 6, name: "foodie_lover", followText: "yummy_yum님이 팔로우합니다" },
    { id: 7, name: "fitness_guru", followText: "fit_me님이 팔로우합니다" },
    {
      id: 8,
      name: "art_enthusiast",
      followText: "design_dream님이 팔로우합니다",
    },
    { id: 9, name: "tech_geek", followText: "code_master님이 팔로우합니다" },
    { id: 10, name: "movie_buff", followText: "cinema_fan님이 팔로우합니다" },
    { id: 11, name: "book_worm", followText: "read_more님이 팔로우합니다" },
    {
      id: 12,
      name: "nature_lover",
      followText: "green_world님이 팔로우합니다",
    },
    { id: 13, name: "gamer_gal", followText: "play_hard님이 팔로우합니다" },
    {
      id: 14,
      name: "music_maniac",
      followText: "sound_of_music님이 팔로우합니다",
    },
    {
      id: 15,
      name: "fashion_freak",
      followText: "style_guru님이 팔로우합니다",
    },
  ];

  return (
    <div className="w-full overflow-x-auto ">
      <div className="flex space-x-4 my-2">
        {users.map((user) => (
          <Card
            key={user.id}
            className="w-48 h-64 bg-gray text-black p-4 rounded-lg border border-gray-300 shadow-sm flex-shrink-0 flex-grow-0"
          >
            <img
              src={"/default-profile.png"}
              alt={`${user.name} 프로필 이미지`}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <p className="text-center font-semibold truncate">{user.name}</p>
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
