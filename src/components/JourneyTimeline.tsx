import React from "react";
import { Smile, Moon, Sun } from "lucide-react";
import { Card } from "./Card";

interface TimelineReflection {
  id: string;
  dateStr: string;
  text: string;
  iconType: "smile" | "moon" | "sun";
  activeDot: boolean;
  opacityClass: string;
}

const mockReflections: TimelineReflection[] = [
  {
    id: "ref-1",
    dateStr: "Yesterday, 8:45 AM",
    text: "รู้สึก overwhelmed นิดหน่อยกับ morning rush แต่การได้ take time 5 นาทีเพื่อหายใจลึกๆ มันช่วย recenter focus ของวันได้ดีจริงๆ...",
    iconType: "smile",
    activeDot: true,
    opacityClass: "opacity-100",
  },
  {
    id: "ref-2",
    dateStr: "Oct 8, 9:20 PM",
    text: "เย็นนี้ productive แบบ surprisingly เลยทีเดียว! เพิ่งมารู้ตัวว่า anxiety ลดลงเยอะมากเวลาได้ lay out เสื้อผ้าเตรียมไว้ล่วงหน้าก่อนคืนหนึ่ง",
    iconType: "moon",
    activeDot: false,
    opacityClass: "opacity-90",
  },
  {
    id: "ref-3",
    dateStr: "Oct 6, 7:15 AM",
    text: "ตื่นมาแล้วรู้สึก rested สุดๆ การได้มานั่งดื่ม morning coffee เงียบๆ ก่อนที่คนอื่นจะตื่นนี่เป็น favorite part ของวันเลย",
    iconType: "sun",
    activeDot: false,
    opacityClass: "opacity-80",
  },
];

export function JourneyTimeline() {
  return (
    <section className="flex flex-col gap-6 mb-12">
      <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary px-2 border-b border-surface-variant pb-2 inline-block max-w-max">
        Recent Reflections
      </h3>

      <div className="flex flex-col gap-8 relative pl-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-variant">
        {mockReflections.map((ref) => {
          return (
            <div key={ref.id} className="relative">
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[30px] top-1.5 h-3 w-3 rounded-full border-2 border-surface-container-low z-10 ${
                  ref.activeDot ? "bg-secondary" : "bg-outline-variant"
                }`}
              />

              {/* Card Container */}
              <Card className={`rounded-xl p-5 ${ref.opacityClass}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {ref.dateStr}
                  </span>

                  {ref.iconType === "smile" && (
                    <Smile className="w-4 h-4 text-secondary opacity-50 stroke-[1.5]" />
                  )}
                  {ref.iconType === "moon" && (
                    <Moon className="w-4 h-4 text-primary opacity-50 stroke-[1.5]" />
                  )}
                  {ref.iconType === "sun" && (
                    <Sun className="w-4 h-4 text-success-soft opacity-80 stroke-[1.5]" />
                  )}
                </div>

                <p className="font-quote text-quote text-on-surface italic">
                  &quot;{ref.text}&quot;
                </p>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
}
