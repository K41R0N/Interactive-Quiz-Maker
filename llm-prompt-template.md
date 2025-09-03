# LLM Prompt Template for Quiz Generation

Use this prompt template with any LLM (ChatGPT, Claude, etc.) to generate quiz questions in the correct JSON format for your Interactive Quiz Study Tool.

## Prompt Template

```
You are an educational expert creating quiz questions for studying any subject. Based on the study material I provide, generate a comprehensive quiz in JSON format.

**Requirements:**
1. Create 8-12 multiple-choice questions based on the provided material
2. Each question should have 4 answer options (A, B, C, D)
3. Only ONE answer should be correct per question
4. Questions should test understanding, not just memorization
5. Include a mix of difficulty levels (basic recall, application, analysis)
6. Focus on the most important concepts and practical applications

**JSON Structure Required:**
```json
{
  "title": "Descriptive Quiz Title Here",
  "questions": [
    {
      "question": "Clear, specific question text here?",
      "options": [
        "First answer option",
        "Second answer option", 
        "Third answer option",
        "Fourth answer option"
      ],
      "correct_answer": "Exact text of the correct answer from options above",
      "explanation_prompt": "Brief prompt to guide student's self-explanation"
    }
  ]
}
```

**Important Guidelines:**
- The "correct_answer" field must EXACTLY match one of the options in the "options" array
- Questions should be clear and unambiguous
- Avoid "all of the above" or "none of the above" options
- Include relevant terminology and concepts from the subject area
- Make incorrect options plausible but clearly wrong to an informed student
- Keep questions focused on the most important concepts from the material

**Study Material:**
[PASTE YOUR STUDY MATERIAL HERE - can be text from textbooks, PDFs, lecture notes, online articles, course materials, etc.]

Please generate the quiz in the exact JSON format specified above.
```

## Usage Instructions

1. **Copy the prompt template** above
2. **Replace the placeholder** `[PASTE YOUR STUDY MATERIAL HERE]` with your actual study content
3. **Paste into your preferred LLM** (ChatGPT, Claude, Gemini, etc.)
4. **Review the generated JSON** to ensure it follows the correct structure
5. **Save the output** as a `.json` file
6. **Upload to your quiz tool** using the "Add New Quiz" button

## Example Study Material Input

Here's an example of how to format your study material:

```
**Study Material:**
Topic: World History - Ancient Civilizations

Ancient Mesopotamia, located between the Tigris and Euphrates rivers, is often called the "Cradle of Civilization." The Sumerians, who lived in this region around 3500 BCE, made numerous groundbreaking innovations including the invention of the wheel, cuneiform writing, and the first known legal code.

The wheel, invented around 3500 BCE, revolutionized transportation and pottery making. Initially used for pottery wheels, it was later adapted for transportation, fundamentally changing how goods and people moved across distances.

Cuneiform writing, developed by the Sumerians, was one of the earliest writing systems. It used wedge-shaped marks pressed into clay tablets and was primarily used for record-keeping, laws, and literature.

The Code of Hammurabi (c. 1750 BCE) was one of the first comprehensive legal codes, establishing the principle of "eye for an eye" justice. It covered various aspects of daily life including trade, property rights, and family relationships.

Key characteristics of ancient civilizations:
- Development of agriculture and permanent settlements
- Social stratification and specialized labor
- Development of writing systems
- Establishment of government and legal systems
- Religious and cultural institutions
```

## Tips for Better Quiz Generation

1. **Provide comprehensive material**: Include definitions, key concepts, historical context, and important facts
2. **Specify focus areas**: If you want questions on specific topics, mention them explicitly
3. **Include context**: Add information about the academic level and specific subject area if relevant
4. **Review and edit**: Always review the generated questions for accuracy and clarity
5. **Test the quiz**: Take the quiz yourself to ensure questions are fair and well-constructed

## Subject-Specific Examples

### For Science Subjects:
- Include definitions, processes, formulas, and applications
- Focus on cause-and-effect relationships
- Include experimental procedures and results

### For History Subjects:
- Include dates, key figures, events, and their significance
- Focus on cause-and-effect relationships in historical events
- Include cultural and social context

### For Literature Subjects:
- Include themes, character analysis, plot elements
- Focus on literary devices and their effects
- Include historical and cultural context of works

### For Language Learning:
- Include vocabulary, grammar rules, and usage examples
- Focus on practical communication scenarios
- Include cultural context and idiomatic expressions

## Troubleshooting

**If the LLM doesn't follow the JSON format:**
- Emphasize the importance of exact JSON structure in your prompt
- Ask it to "double-check that the JSON is valid and follows the exact format"
- Copy and paste the JSON structure again in your follow-up message

**If questions are too easy/hard:**
- Specify the difficulty level you want: "Create intermediate-level questions for college students"
- Ask for a mix: "Include 30% basic recall, 50% application, and 20% analysis questions"

**If the correct_answer doesn't match options:**
- Ask the LLM to "verify that each correct_answer exactly matches one of the options"
- Manually check and fix any mismatches before uploading

## Sample Generated Quiz

Here's an example of what a properly generated quiz should look like:

```json
{
  "title": "World History - Ancient Civilizations",
  "questions": [
    {
      "question": "Which ancient civilization is credited with inventing the wheel?",
      "options": [
        "Ancient Egypt",
        "Mesopotamia (Sumerians)",
        "Ancient Greece",
        "Indus Valley Civilization"
      ],
      "correct_answer": "Mesopotamia (Sumerians)",
      "explanation_prompt": "Explain why the wheel was such an important invention and how it impacted ancient societies."
    },
    {
      "question": "The Code of Hammurabi was one of the earliest examples of:",
      "options": [
        "Religious texts",
        "Written laws",
        "Mathematical formulas",
        "Architectural blueprints"
      ],
      "correct_answer": "Written laws",
      "explanation_prompt": "Discuss the importance of written legal codes in the development of civilization."
    }
  ]
}
```

Save this file and refer to it whenever you need to generate new quiz content for any subject you're studying!

