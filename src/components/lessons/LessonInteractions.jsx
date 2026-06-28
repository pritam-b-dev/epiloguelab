"use client";

import LessonActions from "./LessonActions";

export default function LessonInteractions({
  lesson,
  user,
  isFavorited,
  isLiked,
  onOpenReport,
}) {
  return (
    <>
      <LessonActions
        lesson={lesson}
        user={user}
        isFavorited={isFavorited}
        isLiked={isLiked}
        onReport={onOpenReport}
      />
    </>
  );
}
