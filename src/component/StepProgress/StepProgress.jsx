import { useState } from "react";
import "./StepProgress.css";

const steps = [
  {
    id: 1,
    title: "Data Collection",
    description: "Gets moods from users.",
  },
  {
    id: 2,
    title: "Data Analysis",
    description: "Analyzes user moods.",
  },
  {
    id: 3,
    title: "Playlist Recommendations",
    description: "Recommends a playlist based on users' moods.",
  },
  {
    id: 4,
    title: "Happy User",
    description: "Elevates users' moods.",
  },
];

export default function StepProgress() {
  const [activeStep, setActiveStep] = useState(1);

  return steps.map((step) => (
    <div
      key={step.id}
      className={`${step.id === activeStep ? "active-step" : "inactive-step"}`}
      onClick={() => setActiveStep(step.id)}
    >
      <h3
        className={`active-font-head ${
          step.id === activeStep ? "active-text" : "inactive-step"
        }`}
      >
        0{step.id}. {step.title}
      </h3>
      {step.id === activeStep && (
        <p className="typing-effect">{step.description}</p>
      )}
    </div>
  ));
}
