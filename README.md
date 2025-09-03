# Interactive Quiz Study Tool

A comprehensive web-based quiz application designed for studying any subject. Features a GitHub-style attendance tracking system, interactive quiz management, and JSON-based question import functionality.

## 🚀 Quick Deploy

Deploy this quiz tool to Netlify with one click:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/quiz-study-tool)

*Or manually drag and drop the project folder to [Netlify's deploy page](https://app.netlify.com/drop).*

## Features

### 🎯 Core Functionality
- **Interactive Quiz Taking**: Multiple-choice questions with randomized answer order
- **Progress Tracking**: GitHub-style attendance grid showing daily study activity
- **Performance Analytics**: Track current streak, total quizzes completed, and average scores
- **Personal Notes**: "Explain your answer" field for each question to practice reasoning
- **Pass/Fail Grading**: Automatic grading with pass threshold (>3 correct answers)

### 📊 Dashboard
- **Study Streak Tracking**: Visual representation of consecutive study days
- **Statistics Overview**: Current streak, total quizzes, and average score
- **Attendance Grid**: 365-day visual calendar showing study activity
- **Quiz Library**: Collapsible sidebar with all available quizzes

### 📝 Quiz Management
- **JSON Import**: Upload quiz questions via JSON files
- **Drag & Drop**: Easy file upload with drag-and-drop support
- **Quiz Validation**: Automatic validation of JSON structure
- **Retake Functionality**: Ability to retake any quiz multiple times
- **Answer Review**: Detailed review of correct/incorrect answers after completion

### 💾 Data Persistence
- **Local Storage**: All data saved in browser's local storage
- **No Server Required**: Fully client-side application
- **Privacy Focused**: All study data remains on your device

## Getting Started

### Option 1: Deploy to Netlify (Recommended)
1. **One-click deploy**: Use the deploy button above
2. **Manual deploy**: 
   - Download this project as a ZIP file
   - Go to [Netlify's deploy page](https://app.netlify.com/drop)
   - Drag and drop the project folder
   - Your quiz tool will be live instantly!

### Option 2: Local Development
1. Download or clone this repository
2. Open a terminal in the project directory
3. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and navigate to `http://localhost:8000`

## Creating Quiz Content

### Using the LLM Prompt Template
1. Open `llm-prompt-template.md` for detailed instructions
2. Copy the provided prompt template
3. Replace the placeholder with your study material
4. Use any LLM (ChatGPT, Claude, etc.) to generate quiz questions
5. Save the output as a `.json` file
6. Upload to your quiz tool using the "Add New Quiz" button

### JSON Structure
```json
{
  "title": "Quiz Title Here",
  "questions": [
    {
      "question": "Your question text here?",
      "options": [
        "Option A",
        "Option B", 
        "Option C",
        "Option D"
      ],
      "correct_answer": "Option B",
      "explanation_prompt": "Brief prompt for self-explanation"
    }
  ]
}
```

### Sample Quiz
A sample quiz file (`sample-quiz.json`) is included to test the functionality. You can upload this file to see how the system works.

## File Structure

```
quiz-study-tool/
├── index.html              # Main HTML structure
├── styles.css              # CSS styling and responsive design
├── script.js               # JavaScript functionality
├── sample-quiz.json        # Example quiz for testing
├── llm-prompt-template.md  # Guide for generating quiz content
└── README.md               # This file
```

## Technical Details

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Touch-friendly interface

### Data Storage
- Uses browser's localStorage API
- No external dependencies
- Data persists between sessions
- Manual backup recommended (export/import functionality can be added)

### Security & Privacy
- No data sent to external servers
- All processing happens client-side
- No user accounts or authentication required
- Study data remains private on your device

## Customization

### Styling
- Modify `styles.css` to change colors, fonts, or layout
- Greyscale color palette with subtle hover effects
- Responsive design for desktop and mobile

### Functionality
- Edit `script.js` to modify quiz logic or add features
- Adjust pass/fail threshold in the `submitQuiz()` function
- Customize attendance tracking in the `updateAttendance()` function

### Pass/Fail Criteria
Currently set to pass with >3 correct answers. To modify:
1. Open `script.js`
2. Find the line: `const passed = correctAnswers > 3;`
3. Change the number to your desired threshold

## Usage Tips

### Study Strategy
1. **Daily Practice**: Aim for at least one quiz per day to maintain your streak
2. **Explanation Practice**: Always fill out the "Explain your answer" field to reinforce learning
3. **Review Mistakes**: Use the answer review feature to understand incorrect responses
4. **Retake Quizzes**: Retake quizzes periodically to reinforce knowledge

### Content Creation
1. **Quality over Quantity**: Focus on creating well-structured, relevant questions
2. **Mix Difficulty Levels**: Include basic recall, application, and analysis questions
3. **Regular Updates**: Add new quizzes regularly to cover different topics
4. **Peer Review**: Have colleagues or study partners review your quiz questions for accuracy

## Use Cases

### Academic Subjects
- **History**: Dates, events, causes and effects, key figures
- **Science**: Definitions, processes, formulas, experiments
- **Literature**: Themes, characters, literary devices, analysis
- **Mathematics**: Concepts, formulas, problem-solving steps
- **Languages**: Vocabulary, grammar, cultural context

### Professional Development
- **Certification Prep**: Industry certifications, professional exams
- **Skill Building**: Technical skills, soft skills, best practices
- **Compliance Training**: Regulations, policies, procedures

### Personal Learning
- **Hobbies**: Art history, music theory, cooking techniques
- **General Knowledge**: Geography, current events, trivia
- **Self-Improvement**: Psychology, philosophy, personal development

## Troubleshooting

### Common Issues
- **Quiz won't upload**: Ensure JSON file follows the exact structure shown above
- **Attendance not tracking**: Check that you're completing quizzes (not just starting them)
- **Data lost**: Browser data can be cleared; consider regular manual backups
- **Mobile display issues**: Ensure you're using a modern mobile browser

### Browser Storage Limits
- Most browsers allow 5-10MB of localStorage
- Each quiz typically uses <1KB of storage
- Monitor storage usage if you have hundreds of quizzes

## Contributing

This is a standalone educational tool. Feel free to:
- Modify the code for your specific needs
- Add new features (export/import, categories, etc.)
- Improve the UI/UX design
- Create additional quiz templates

## License

This project is provided as-is for educational purposes. Feel free to use, modify, and distribute as needed for your studies.

## Support

For technical issues or feature requests, refer to the code comments in the JavaScript file or modify the application to suit your specific needs.

---

**Happy studying! 📚✨**

