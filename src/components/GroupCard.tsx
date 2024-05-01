import { Group } from "@/types";
import React, { SetStateAction } from "react";

type GroupCardProps = {
  group: Group;
  selectedGroup: Group | null;
  setSelectedGroup: React.Dispatch<SetStateAction<Group | null>>;
};

const GroupCard = ({
  group,
  selectedGroup,
  setSelectedGroup,
}: GroupCardProps) => {
  return (
    <>
      <div
        onClick={() => setSelectedGroup(group)}
        className={`flex items-center p-2 border-b-2 text-xl font-semibold ${
          selectedGroup?._id===group._id ? "bg-gray-100" : ""
        }`}
      >
        {group.groupName}
      </div>
    </>
  );
};

export default GroupCard;
