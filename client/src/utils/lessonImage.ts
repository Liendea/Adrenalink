import type { Lesson } from "@/types/types";
import surfImg from "@/assets/image.png";
import kiteImg from "@/assets/kite-surf.png";
import climbImg from "@/assets/climbing.png";
import snowboardImg from "@/assets/snowboard.png";
import windImg from "@/assets/wind-surf.png";
import wakeImg from "@/assets/wakeboard.png";

const sportImageMap: Record<string, string> = {
  surf: surfImg,
  kitesurf: kiteImg,
  climbing: climbImg,
  snowboard: snowboardImg,
  windsurf: windImg,
  wakeboard: wakeImg,
};

export function getLessonImage(
  lesson: Pick<Lesson, "imageUrl" | "sportType">,
): string {
  return lesson.imageUrl ?? sportImageMap[lesson.sportType] ?? surfImg;
}
