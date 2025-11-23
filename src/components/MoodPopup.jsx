import { useState, useEffect } from "react";
import api from "../api/axios";
import "../styles/MoodPopup.css";

export default function MoodPopup({ onMusic }) {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Delay popup slightly for nice UX
    setTimeout(() => setShow(true), 800);
  }, []);

  if (!show) return null;

  const questions = {
    1: { q: "How do you feel today?", options: ["Great", "Okay", "Not good", "Terrible"] },
    2: { q: "Your energy right now?", options: ["Full of energy", "Normal", "Low", "Exhausted"] },
    3: { q: "How social do you feel?", options: ["Want to talk", "Neutral", "Prefer silence", "Avoiding people"] },
    4: { q: "What's on your mind today?", options: ["Future possibilities", "Problems", "Nothing special", "Past memories"] },
    5: { q: "How fast are your thoughts?", options: ["Very fast", "Normal", "Slow", "Hard to focus"] },
  };

  const handleSelect = async (answer) => {
    const updatedAnswers = { ...answers, [step]: answer };
    setAnswers(updatedAnswers);

    if (step < 5) {
      setStep(step + 1);
    } else {
      setLoading(true);

      try {
        //  SAME EXACT CALL — just expects video_id now
        const res = await api.post("/ai/generate-music", { answers: updatedAnswers });

        const videoId = res.data.video_id;   
        onMusic(videoId);                    
        setShow(false);
      } catch (err) {
        console.error("Music generation failed:", err);
        alert("Something went wrong generating your music. Try again.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="mood-popup">
      <div className="popup-box">
        {!loading ? (
          <>
            <h3>{questions[step].q}</h3>

            <div className="options">
              {questions[step].options.map((op) => (
                <button
                  className="option-btn"
                  key={op}
                  onClick={() => handleSelect(op)}
                >
                  {op}
                </button>
              ))}
            </div>
          </>
        ) : (
          <h3>Generating your personalised music… 🎵</h3>
        )}
      </div>
    </div>
  );
}
