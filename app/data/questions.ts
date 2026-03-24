// /data/questions.ts

export const questions = [
  {
    id: "q1",
    question: "How many cats do you have?",
    options: [
      { label: "Just one cat", value: "1" },
      { label: "Two or three cats", value: "2-3" },
      { label: "Four or more cats", value: "4+" },
    ],
  },
  {
    id: "q2",
    question: "What is your biggest problem with your litter box right now?",
    options: [
      { label: "The smell  my home doesn't smell fresh", value: "smell" },
      { label: "Litter everywhere  it tracks all over the floor", value: "tracking" },
      { label: "Too much scooping  I hate cleaning it", value: "scooping" },
      { label: "It takes up too much space", value: "space" },
    ],
  },
  {
    id: "q3",
    question: "Where does your litter box go?",
    options: [
      { label: "Small apartment or studio", value: "apartment" },
      { label: "House — I have a dedicated spot for it", value: "house" },
      { label: "I want it hidden inside furniture or a cabinet", value: "hidden" },
    ],
  },
  {
    id: "q4",
    question: "What is your budget?",
    options: [
      { label: "Under $50", value: "under50" },
      { label: "$50 – 150", value: "50to150" },
      { label: "$150 – 400", value: "150to400" },
      { label: "$400 and above — I want the best option", value: "400plus" },
    ],
  },
  {
    id: "q5",
    question: "Anything we should know about your cat?",
    options: [
      { label: "Senior cat or has difficulty jumping", value: "senior" },
      { label: "Very large breed — over 15 lbs", value: "large" },
      { label: "Anxious or shy, doesn't like enclosed spaces", value: "anxious" },
      { label: "None of the above — normal healthy cat", value: "normal" },
    ],
  },
];