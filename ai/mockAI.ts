/**
 * EduMind AI - Intelligent Mock AI Layer
 * Structured responses that feel real for competition demo.
 * Ready to swap with real xAI/OpenAI calls via env keys.
 */

export type SolveResult = {
  subject: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  steps: string[];
  finalAnswer: string;
  concept: string;
  similarQuestions: string[];
  tips: string[];
};

export type TutorMessage = {
  role: "user" | "assistant";
  content: string;
};

const SUBJECT_KEYWORDS: Record<string, string[]> = {
  Mathematics: ["equation", "quadratic", "algebra", "trig", "calculus", "geometry", "statistics", "probability", "matrix", "vector", "logarithm", "surd", "fraction", "percentage", "ratio"],
  Physics: ["force", "motion", "newton", "energy", "electricity", "optics", "wave", "sound", "heat", "pressure", "gravity", "velocity", "acceleration"],
  Chemistry: ["atom", "molecule", "reaction", "acid", "base", "organic", "inorganic", "periodic", "bond", "oxidation", "reduction", "stoichiometry"],
  Biology: ["cell", "photosynthesis", "respiration", "genetics", "ecology", "human", "plant", "enzyme", "dna", "reproduction", "nutrition"],
  English: ["grammar", "essay", "comprehension", "literature", "vocabulary", "punctuation", "sentence"],
  "Further Mathematics": ["differentiation", "integration", "matrix", "complex", "vector"],
};

function detectSubject(text: string): string {
  const lower = text.toLowerCase();
  let best = "Mathematics";
  let max = 0;
  for (const [subj, kws] of Object.entries(SUBJECT_KEYWORDS)) {
    const score = kws.filter((k) => lower.includes(k)).length;
    if (score > max) {
      max = score;
      best = subj;
    }
  }
  return best;
}

function detectTopic(text: string, subject: string): string {
  const lower = text.toLowerCase();
  if (subject === "Mathematics") {
    if (lower.includes("quadratic") || lower.includes("x²") || lower.includes("x^2")) return "Quadratic Equations";
    if (lower.includes("trig") || lower.includes("sin") || lower.includes("cos") || lower.includes("tan")) return "Trigonometry";
    if (lower.includes("simultaneous")) return "Simultaneous Equations";
    if (lower.includes("log")) return "Logarithms";
    if (lower.includes("geometry") || lower.includes("triangle") || lower.includes("circle")) return "Geometry";
    if (lower.includes("statistic") || lower.includes("mean") || lower.includes("median")) return "Statistics";
    return "Algebra";
  }
  if (subject === "Physics") {
    if (lower.includes("newton") || lower.includes("force") || lower.includes("motion")) return "Newton's Laws of Motion";
    if (lower.includes("electric")) return "Electricity";
    if (lower.includes("energy") || lower.includes("work")) return "Work, Energy & Power";
    return "Mechanics";
  }
  if (subject === "Chemistry") {
    if (lower.includes("acid") || lower.includes("base")) return "Acids, Bases & Salts";
    if (lower.includes("organic")) return "Organic Chemistry";
    return "General Chemistry";
  }
  if (subject === "Biology") {
    if (lower.includes("photo")) return "Photosynthesis";
    if (lower.includes("cell")) return "Cell Biology";
    if (lower.includes("genetic") || lower.includes("dna")) return "Genetics";
    return "General Biology";
  }
  return "General";
}

function detectDifficulty(text: string): "Easy" | "Medium" | "Hard" {
  const lower = text.toLowerCase();
  if (lower.includes("simple") || lower.includes("basic") || text.length < 80) return "Easy";
  if (lower.includes("complex") || lower.includes("prove") || lower.includes("derive") || text.length > 250) return "Hard";
  return "Medium";
}

export async function solveQuestionFromText(questionText: string): Promise<SolveResult> {
  // Simulate processing delay
  await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

  const subject = detectSubject(questionText);
  const topic = detectTopic(questionText, subject);
  const difficulty = detectDifficulty(questionText);

  // Generate structured educational response
  let steps: string[] = [];
  let finalAnswer = "";
  let concept = "";
  let similar: string[] = [];
  let tips: string[] = [];

  if (topic.includes("Quadratic")) {
    steps = [
      "Identify the coefficients a, b, and c in the standard form ax² + bx + c = 0.",
      "Calculate the discriminant D = b² - 4ac to determine the nature of the roots.",
      "Apply the quadratic formula: x = [-b ± √D] / (2a).",
      "Simplify each root carefully, checking for common factors.",
      "Verify by substituting the roots back into the original equation.",
    ];
    finalAnswer = "x = [values from formula]. Always show both roots when they exist.";
    concept = "A quadratic equation is a second-degree polynomial equation of the form ax² + bx + c = 0. The solutions are the values of x that make the equation true. The discriminant tells us whether there are two real roots, one real root, or complex roots.";
    similar = [
      "Solve: 2x² - 5x + 3 = 0",
      "Find the roots of x² + 6x + 9 = 0",
      "If one root of x² - 7x + k = 0 is 3, find k and the other root.",
    ];
    tips = [
      "Always write the equation in standard form first.",
      "Check if it factors easily before using the formula.",
      "Remember ± means two possible answers.",
    ];
  } else if (topic.includes("Trigonometry")) {
    steps = [
      "Recall the relevant trigonometric identity or ratio (SOH-CAH-TOA for right triangles).",
      "Identify known sides or angles in the problem.",
      "Set up the equation using the appropriate trig function.",
      "Solve for the unknown carefully (use inverse functions when needed).",
      "Check if the answer is in the correct quadrant or range required by the question.",
    ];
    finalAnswer = "Use exact values (√3/2, 1/2, etc.) where possible rather than decimal approximations.";
    concept = "Trigonometry studies relationships between side lengths and angles of triangles. In WAEC/JAMB, focus on identities, graphs of sine/cosine, and solving equations in a given range.";
    similar = [
      "If sin θ = 3/5 and θ is acute, find cos θ and tan θ.",
      "Solve: 2 cos²θ - 1 = 0 for 0° ≤ θ ≤ 360°",
      "Prove that (1 + tan²θ) = sec²θ",
    ];
    tips = ["Draw a sketch whenever possible.", "Memorize special angles: 0°, 30°, 45°, 60°, 90°."];
  } else if (topic.includes("Newton")) {
    steps = [
      "Identify all forces acting on the body (draw a free-body diagram).",
      "Resolve forces into components if necessary (horizontal and vertical).",
      "Apply Newton's Second Law: ΣF = ma in the direction of interest.",
      "Solve the resulting equation for the unknown (acceleration, force, mass, etc.).",
      "Check units and whether the direction of acceleration makes physical sense.",
    ];
    finalAnswer = "a = F_net / m (with correct direction).";
    concept = "Newton's Laws: 1st (inertia), 2nd (F=ma), 3rd (action-reaction). Most calculation questions rely on the second law after correctly identifying net force.";
    similar = [
      "A 5 kg mass is pulled by a 20 N force. Find its acceleration (ignore friction).",
      "Two forces 3N and 4N act at right angles. Find the resultant.",
    ];
    tips = ["Always draw the free-body diagram first.", "Watch signs for direction."];
  } else if (topic.includes("Photosynthesis")) {
    steps = [
      "Recall the overall word equation: Carbon dioxide + Water → Glucose + Oxygen (in presence of light and chlorophyll).",
      "Identify the stage asked about (light-dependent or light-independent).",
      "Explain the role of chloroplasts, chlorophyll, and sunlight.",
      "Link to any specific experimental evidence or factors affecting the rate.",
      "Relate to the importance for living organisms (food chain / oxygen).",
    ];
    finalAnswer = "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light & chlorophyll).";
    concept = "Photosynthesis is the process by which green plants convert light energy into chemical energy stored in glucose. It is the foundation of most food chains.";
    similar = [
      "List four factors that affect the rate of photosynthesis.",
      "Explain why plants appear green.",
      "Distinguish between photosynthesis and respiration.",
    ];
    tips = ["Use the balanced chemical equation in exams.", "Mention chlorophyll and light as essential conditions."];
  } else {
    // Generic educational response
    steps = [
      "Read the question carefully and identify what is being asked.",
      "List the known information and the unknown quantity.",
      "Recall the relevant formula, law or definition that applies.",
      "Substitute the known values carefully and solve step by step.",
      "Check your final answer against the question requirements (units, significant figures, etc.).",
    ];
    finalAnswer = "See the worked steps above. Always show your reasoning clearly for full marks.";
    concept = `This question belongs to ${topic} under ${subject}. Understanding the underlying concept is more important than memorising the final number.`;
    similar = [
      `Practice another ${topic} question of similar difficulty.`,
      `Try a slightly harder variation of the same concept.`,
      `Explain the concept of ${topic} in your own words.`,
    ];
    tips = [
      "Focus on understanding rather than rote learning.",
      "Practice past questions under timed conditions.",
      "Review related topics that feed into this one.",
    ];
  }

  return {
    subject,
    topic,
    difficulty,
    question: questionText.trim() || "Question extracted from image",
    steps,
    finalAnswer,
    concept,
    similarQuestions: similar,
    tips,
  };
}

export async function chatWithTutor(
  messages: TutorMessage[],
  context?: { subject?: string; topic?: string }
): Promise<string> {
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

  const last = messages[messages.length - 1]?.content?.toLowerCase() || "";
  const history = messages.map((m) => m.content).join(" ");

  // Detect intent
  if (last.includes("explain") || last.includes("what is") || last.includes("teach me")) {
    const topic = detectTopic(last + " " + history, detectSubject(last));
    return `Of course! Let's break down **${topic}** clearly.

**Core Idea**
${topic} is a fundamental concept. Here's the simplest way to understand it:

1. Start with the definition and why it matters.
2. Look at a concrete everyday example.
3. Then see the formal statement or formula.
4. Finally, try a short practice question together.

Would you like me to:
- Give a simple real-life example first?
- Show the formal definition?
- Or jump straight to a worked example?

Just tell me how you prefer to learn and I'll adapt.`;
  }

  if (last.includes("example") || last.includes("show me")) {
    return `Here's a clear worked example:

**Question**
A simple case that illustrates the idea.

**Solution**
Step 1: Write what we know.
Step 2: Choose the right approach.
Step 3: Calculate carefully.
Step 4: State the final answer with units if needed.

Now try this one yourself (I'll give hints if you get stuck):
"..."

Type your answer or say "hint" if you need help.`;
  }

  if (last.includes("test me") || last.includes("quiz me") || last.includes("question")) {
    return `Great! Let's test your understanding.

**Quick Question**
What is the first thing you should do when you see a quadratic equation?

A) Immediately use the quadratic formula  
B) Check if it can be factorised  
C) Find the discriminant only  
D) Guess the answer

Reply with A, B, C or D and I'll tell you if you're right and explain why.`;
  }

  if (last.includes("hint")) {
    return `Here's a gentle hint without giving the full answer:

Focus on the key relationship or formula that connects the quantities mentioned.  
Ask yourself: "What am I trying to find, and what information do I already have?"

Try one more step, then share what you got.`;
  }

  if (last.includes("harder") || last.includes("difficult")) {
    return `Alright, increasing the challenge a bit.

Here's a tougher version that still builds on the same concept. Take your time and show your working. I'll wait for your attempt before revealing the full solution.`;
  }

  if (last.includes("easier") || last.includes("simpler")) {
    return `No problem — let's make it simpler.

We'll start with the most basic version of the idea, using smaller numbers and a clear everyday analogy. Once this feels solid, we can build up again.

Ready?`;
  }

  // Default encouraging tutor response
  return `I'm here to help you understand, not just get the answer.

You said: "${messages[messages.length - 1]?.content}"

Let me respond as your tutor:
- I can explain the concept step by step
- Give you a worked example
- Ask you questions to check understanding
- Generate practice questions
- Adjust difficulty up or down

What would be most helpful right now? Or just ask me anything about the topic.`;
}

export async function generateQuiz(
  subject: string,
  topic: string,
  difficulty: string,
  count: number
): Promise<
  Array<{
    id: string;
    type: "mcq" | "true_false" | "short";
    question: string;
    options?: string[];
    correct: string;
    explanation: string;
  }>
> {
  await new Promise((r) => setTimeout(r, 1000));

  const questions = [];
  for (let i = 0; i < count; i++) {
    const type = i % 3 === 0 ? "true_false" : i % 3 === 1 ? "short" : "mcq";
    if (type === "mcq") {
      questions.push({
        id: `q-${i + 1}`,
        type: "mcq" as const,
        question: `Sample ${difficulty} question ${i + 1} on ${topic} (${subject}): Which of the following is correct?`,
        options: [
          "Option A – common misconception",
          "Option B – correct answer",
          "Option C – partially true",
          "Option D – unrelated",
        ],
        correct: "Option B – correct answer",
        explanation: `The correct choice is B because it correctly applies the principle of ${topic}. A is a frequent error students make. Always check definitions carefully.`,
      });
    } else if (type === "true_false") {
      questions.push({
        id: `q-${i + 1}`,
        type: "true_false" as const,
        question: `True or False: A key statement about ${topic} in ${subject}.`,
        options: ["True", "False"],
        correct: i % 2 === 0 ? "True" : "False",
        explanation: `This statement is ${i % 2 === 0 ? "true" : "false"} based on the standard definition taught in WAEC/NECO/JAMB syllabuses.`,
      });
    } else {
      questions.push({
        id: `q-${i + 1}`,
        type: "short" as const,
        question: `Briefly explain one important point about ${topic}.`,
        correct: `A concise correct explanation of ${topic}.`,
        explanation: `A good answer should mention the core idea and one practical implication or formula.`,
      });
    }
  }
  return questions;
}

export async function analyzePerformance(data: {
  scores: { subject: string; score: number }[];
  recentTopics: string[];
  weakAreas: string[];
}): Promise<string> {
  await new Promise((r) => setTimeout(r, 700));
  const weak = data.weakAreas[0] || "Trigonometry";
  const strong = data.scores.sort((a, b) => b.score - a.score)[0];
  return `**AI Learning Coach Analysis**

Your recent performance shows clear patterns:

• Strongest area: **${strong?.subject || "Mathematics"}** (${strong?.score || 82}%)
• Biggest opportunity: **${weak}**

**Recommendation for the next 48 hours**
1. Spend 25 focused minutes on a short lesson covering the core idea of ${weak}.
2. Immediately follow with 8–10 targeted practice questions.
3. Review any mistakes with the step-by-step explanations.

Your Algebra improved from 68% → 82% last week — the same approach will work for ${weak}.

Would you like me to generate a mini study plan for today?`;
}

export async function createStudyPlan(input: {
  exam: string;
  examDate: string;
  subjects: string[];
  hoursPerDay: number;
  targetScore: number;
}): Promise<{ day: string; sessions: { time: string; subject: string; topic: string; duration: number }[] }[]> {
  await new Promise((r) => setTimeout(r, 900));
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const plan = days.map((day, idx) => ({
    day,
    sessions: input.subjects.slice(0, 2).map((subj, sIdx) => ({
      time: sIdx === 0 ? "4:00 PM" : "5:15 PM",
      subject: subj,
      topic: idx % 2 === 0 ? "Core Concepts" : "Practice & Past Questions",
      duration: Math.round(input.hoursPerDay * 30 + (sIdx === 0 ? 15 : 0)),
    })),
  }));
  return plan;
}

export async function careerAdvice(interests: string[], subjects: string[]): Promise<string> {
  await new Promise((r) => setTimeout(r, 800));
  return `Based on your interests (${interests.join(", ")}) and strong subjects (${subjects.join(", ")}), here are promising directions to explore:

1. **Engineering / Technology** – especially if you enjoy problem-solving and Mathematics/Physics.
2. **Health Sciences** – if Biology and Chemistry are strengths and you like helping people.
3. **Business / Economics** – if you like analysis, data and real-world impact.
4. **Education / Research** – if explaining concepts comes naturally to you.

These are possibilities, not prescriptions. The best path is the one that matches both your abilities and what energises you. I recommend speaking with teachers, alumni and doing short online explorations of each field.`;
}
