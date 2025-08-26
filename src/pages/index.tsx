import { Outfit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const outfit = Outfit({
  subsets: ["latin"],
});

const META: Record<
  string,
  { w: number; h: number; hints: Array<string>; solutions: Array<string> }
> = {
  "1B": {
    w: 40,
    h: 23,
    hints: [
      "The light beam Lyra currently have seems to bounce off walls, can you use this to hit the sensor somehow?",
    ],
    solutions: ["https://youtu.be/h6UDy-ydBCo"],
  },
  "2A": {
    w: 40,
    h: 23,
    hints: [
      "Lyra has two beams for two different sensors, trigger both and she should be able to get through!",
    ],
    solutions: ["https://youtu.be/KW7mX8JgQ9A"],
  },
  "2B": {
    w: 40,
    h: 23,
    hints: [
      "Similar to the last level, Lyra has two sensors to hit, but also some platforming to do!",
    ],
    solutions: ["https://youtu.be/XW5A9tiarZY"],
  },
  "2C": {
    w: 40,
    h: 23,
    hints: [
      "After Lyra shoots each light beam, the starting position and light beam stays there. What happens if the terrain changes but the light beam is still there?",
    ],
    solutions: ["https://youtu.be/RJw8mD6K6T4"],
  },
  "2D": {
    w: 40,
    h: 23,
    hints: ["Light takes time to travel, maybe you can be faster?"],
    solutions: ["https://youtu.be/hFPL8ZvkT-g"],
  },
  "2E": {
    w: 40,
    h: 23,
    hints: ["No tricks on this one, just pure platforming!"],
    solutions: ["https://youtu.be/pieP6AU81KA"],
  },
  "2F": {
    w: 40,
    h: 23,
    hints: [
      "How can you fire the purple beam in a way that stays on both when the pink crystals are inactive and when they are active? (You’ll need the red crystals active for this!)",
    ],
    solutions: ["https://youtu.be/H421Bpc0bjk"],
  },
  "2G": {
    w: 40,
    h: 23,
    hints: [
      "Can you line up both light beams in a way such that they will always hit a sensor regardless of which crystals are active?",
    ],
    solutions: ["https://youtu.be/vYKmuYvokRo", "https://youtu.be/EUBEEFX8gWg"],
  },
  "3A": {
    w: 40,
    h: 23,
    hints: [
      "It seems like the other beams bounce off the white one, how can you use this?",
    ],
    solutions: ["https://youtu.be/p3MIW2A_4so"],
  },
  "3B": {
    w: 40,
    h: 23,
    hints: [
      "Think backwards and use 90 degree and 45 degree angles. Can we use the previous idea of prefiring to activate the left sensor while we’re on the right side of the map?",
    ],
    solutions: ["https://youtu.be/cFW-YlUbWw0"],
  },
  "4A": {
    w: 40,
    h: 23,
    hints: [
      "Similar to the last level, how can we use map changes to trigger the red sensor while Lyra is on the right side of the level? 90 and 45 degree angles are similarly helpful for this.",
    ],
    solutions: ["https://youtu.be/4np2XHjblu4", "https://youtu.be/6CJAUNp_7XA"],
  },
  "4B": {
    w: 40,
    h: 23,
    hints: [
      "Can you curve an existing light beam using the white light after the platform goes right to trigger the gray sensor, allowing you to get through?",
    ],
    solutions: ["https://youtu.be/Fi2V49DhXLA"],
  },
};

function Level({ id }: { id: string }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlay, setOverlay] = useState(<></>);

  return (
    <div className="w-full h-auto bg-slate-900 p-4 flex flex-col gap-4">
      <p className="text-xl font-semibold">Level {id}</p>
      <div className="relative">
        <Image
          src={`/level_previews/${id}.png`}
          alt={`Preview for level ${id}`}
          width={META[id].w}
          height={META[id].h}
          unoptimized
          className="[image-rendering:pixelated] max-w-none"
          style={{ width: "100%", height: "auto" }}
        />
        {showOverlay && (
          <div
            className="bg-black bg-opacity-80 absolute w-full h-full top-0 left-0 cursor-pointer p-6 overflow-x-hidden overflow-y-scoll"
            onClick={() => {
              setShowOverlay(false);
            }}
          >
            {overlay}
          </div>
        )}
      </div>
      <div className="w-full gap-4 flex flex-row">
        {META[id].hints.map((hint, ind) => (
          <button
            key={`${id}-hint-${ind}`}
            className="bg-slate-700 px-2 py-1 rounded-lg cursor-pointer"
            onClick={() => {
              setShowOverlay(!showOverlay);
              setOverlay(<p className="text-lg">{hint}</p>);
            }}
          >
            Hint {ind + 1}
          </button>
        ))}
        {META[id].solutions.map((url, ind) => (
          <Link
            key={`${id}-sol-${ind}`}
            className="bg-slate-800 px-2 py-1 rounded-lg"
            href={url}
          >
            Solution {ind + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className={`${outfit.className} w-[100dvw] h-[100dvh] bg-black`}>
      <main className="w-full h-full flex flex-col p-8 gap-8 items-center">
        <div className="text-4xl font-semibold">Lightborne Hints</div>
        <div className="w-full h-auto grid gap-4 grid-cols-[repeat(auto-fill,22rem)] justify-center">
          {Object.keys(META).map((id: string) => (
            <Level id={id} key={id} />
          ))}
        </div>
      </main>
    </div>
  );
}
