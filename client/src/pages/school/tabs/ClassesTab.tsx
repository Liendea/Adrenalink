import type { Lesson } from "@/types/types";
import Card_Small from "../../../components/cards/card-small/Card_Small";
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
        <Card_Small key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}
