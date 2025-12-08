// IT 3203 – Milestone 3
// External quiz script


    // IT 3203 Milestone 2 – Quiz logic
    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("quiz-form");
      const resultsContainer = document.getElementById("results");
      const resetBtn = document.getElementById("reset-btn");

      const TOTAL_QUESTIONS = 5;
      const PASSING_SCORE = 4; // 4 out of 5 = pass

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        let score = 0;
        const feedback = [];

        // Q1 – short answer (Tim Berners-Lee)
        const q1Input = document.getElementById("q1");
        const q1Value = q1Input.value.trim();
        let q1Correct = false;
        if (q1Value) {
          const normalized = q1Value.toLowerCase();
          if (normalized.includes("berners") && normalized.includes("lee")) {
            q1Correct = true;
            score++;
          }
        }
        feedback.push({
          question: "1. Who invented the World Wide Web?",
          correct: q1Correct,
          userAnswer: q1Value || "(no answer)",
          correctAnswer: "Tim Berners-Lee"
        });

        // Q2 – single choice
        const q2Selected = document.querySelector('input[name="q2"]:checked');
        const q2Value = q2Selected ? q2Selected.value : "";
        const q2Correct = q2Value === "b";
        if (q2Correct) score++;
        feedback.push({
          question: "2. Web 1.0 characteristics",
          correct: q2Correct,
          userAnswer: q2Selected ? q2Selected.nextSibling.textContent.trim() : "(no answer)",
          correctAnswer: "Mostly static, read-only pages published by organizations."
        });

        // Q3 – single choice
        const q3Selected = document.querySelector('input[name="q3"]:checked');
        const q3Value = q3Selected ? q3Selected.value : "";
        const q3Correct = q3Value === "b";
        if (q3Correct) score++;
        feedback.push({
          question: "3. Web 2.0 interaction",
          correct: q3Correct,
          userAnswer: q3Selected ? q3Selected.nextSibling.textContent.trim() : "(no answer)",
          correctAnswer: "Users could comment, share, and create content on social platforms."
        });

        // Q4 – single choice
        const q4Selected = document.querySelector('input[name="q4"]:checked');
        const q4Value = q4Selected ? q4Selected.value : "";
        const q4Correct = q4Value === "c";
        if (q4Correct) score++;
        feedback.push({
          question: "4. Web 3.0 focus",
          correct: q4Correct,
          userAnswer: q4Selected ? q4Selected.nextSibling.textContent.trim() : "(no answer)",
          correctAnswer: "Decentralizing data and ownership using technologies such as blockchains and smart contracts."
        });

        // Q5 – multi-select
        const q5Checked = Array.from(document.querySelectorAll('input[name="q5"]:checked')).map(
          (input) => input.value
        );
        const correctQ5 = ["a", "c", "d"];
        const q5Correct = setsEqual(q5Checked, correctQ5);
        if (q5Correct) score++;
        feedback.push({
          question: "5. Multi-select – Web 3.0 technologies",
          correct: q5Correct,
          userAnswer: q5Checked.length
            ? q5Checked.map((v) => labelForQ5(v)).join(", ")
            : "(no answer)",
          correctAnswer: "Blockchain-based networks; Smart contracts; Decentralized applications (dApps)."
        });

        const passed = score >= PASSING_SCORE;

        // Build result HTML
        const summaryHtml = `
          <section class="results-summary">
            <h2>Quiz Results</h2>
            <p class="overall ${passed ? "result-pass" : "result-fail"}">
              ${passed ? "Pass ✅" : "Try again ❌"} – You scored
              <strong>${score} / ${TOTAL_QUESTIONS}</strong>.
            </p>
            <p class="score-note">
              Passing score is ${PASSING_SCORE} out of ${TOTAL_QUESTIONS}.
            </p>
          </section>
        `;

        const detailsHtml = `
          <section class="results-details">
            <h3>Question Breakdown</h3>
            <ol class="results-list">
              ${feedback
                .map((item) => {
                  const statusClass = item.correct ? "correct" : "incorrect";
                  const statusLabel = item.correct ? "Correct" : "Incorrect";
                  return `
                    <li class="result-item">
                      <h4>${item.question}</h4>
                      <p class="${statusClass}">
                        <strong>${statusLabel}</strong>
                      </p>
                      <p><strong>Your answer:</strong> ${escapeHtml(item.userAnswer)}</p>
                      <p><strong>Correct answer:</strong> ${escapeHtml(item.correctAnswer)}</p>
                    </li>
                  `;
                })
                .join("")}
            </ol>
          </section>
        `;

        resultsContainer.innerHTML = summaryHtml + detailsHtml;
        resultsContainer.scrollIntoView({ behavior: "smooth" });
      });

      resetBtn.addEventListener("click", () => {
        form.reset();
        resultsContainer.innerHTML = "";
      });

      // Helper: compare two arrays as sets
      function setsEqual(a, b) {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        return sortedA.every((val, idx) => val === sortedB[idx]);
      }

      // Helper: map q5 values to human-readable labels
      function labelForQ5(value) {
        switch (value) {
          case "a":
            return "Blockchain-based networks";
          case "b":
            return "Dial-up modems and static HTML only";
          case "c":
            return "Smart contracts";
          case "d":
            return "Decentralized applications (dApps)";
          default:
            return value;
        }
      }

      // Very small HTML escape to avoid issues when printing answers
      function escapeHtml(text) {
        return String(text)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
    });
