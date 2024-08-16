import React from "react";
import { fetchActivityRead } from '@/services/social';

interface NotificationDropdownProps {
  activities: any[];
}

const handleActivityRead = async (id: number) => {
    await fetchActivityRead(id);
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ activities }) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-black border border-gray-700 rounded shadow-lg z-10">
      <div className="p-4 text-white">
        <h4 className="font-bold mb-2 text-sm text-green-razer">Notifications</h4>
        {activities.length > 0 ? (
          <ul className="space-y-2">
            {activities.map((activity, index) => (
              <li key={index} className="p-2 text-white text-xs" onClick={() => {
                handleActivityRead(activity.activity_id)
              }}>
                [{index + 1}] {activity.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-white">No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
