import type { Lesson } from "@/types/types";
import LessonListItem from "../components/LessonListItem";
import "./ClassesTab.scss";

type ClassesTabProps = {
  lessons: Lesson[];
};

export default function ClassesTab({ lessons }: ClassesTabProps) {
  if (lessons.length === 0) {
    return <p className="classes-tab__empty">No classes available yet.</p>;
  }

  return (
    <div className="classes-tab">
      {lessons.map((lesson) => (
        <LessonListItem key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}
