// Global state management
class QuizApp {
    constructor() {
        this.quizzes = [];
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.userExplanations = [];
        this.attendanceData = [];
        this.stats = {
            currentStreak: 0,
            totalQuizzes: 0,
            averageScore: 0
        };
        
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.updateUI();
        this.generateAttendanceGrid();
        this.checkFirstTimeUser();
    }

    checkFirstTimeUser() {
        const hasSeenWelcome = localStorage.getItem('welcomeModalSeen');
        const hasQuizzes = this.quizzes.length > 0;
        
        // Show welcome modal for first-time users or if they have no quizzes
        if (!hasSeenWelcome || !hasQuizzes) {
            setTimeout(() => {
                this.showWelcomeModal();
            }, 500); // Small delay for better UX
        }
    }

    // Local Storage Management
    loadFromStorage() {
        const savedQuizzes = localStorage.getItem('medicalQuizzes');
        const savedAttendance = localStorage.getItem('attendanceData');
        const savedStats = localStorage.getItem('quizStats');

        if (savedQuizzes) {
            this.quizzes = JSON.parse(savedQuizzes);
        }

        if (savedAttendance) {
            this.attendanceData = JSON.parse(savedAttendance);
        }

        if (savedStats) {
            this.stats = JSON.parse(savedStats);
        }
    }

    saveToStorage() {
        localStorage.setItem('medicalQuizzes', JSON.stringify(this.quizzes));
        localStorage.setItem('attendanceData', JSON.stringify(this.attendanceData));
        localStorage.setItem('quizStats', JSON.stringify(this.stats));
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Sidebar toggle
        document.getElementById('toggle-sidebar').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('collapsed');
        });

        // Mobile menu
        document.getElementById('mobile-menu-btn').addEventListener('click', () => {
            this.showMobileMenu();
        });

        document.getElementById('mobile-close-btn').addEventListener('click', () => {
            this.hideMobileMenu();
        });

        document.getElementById('mobile-quiz-overlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('mobile-quiz-overlay')) {
                this.hideMobileMenu();
            }
        });

        // Welcome/Help modal
        document.getElementById('help-btn').addEventListener('click', () => {
            this.showWelcomeModal();
        });

        document.getElementById('close-welcome').addEventListener('click', () => {
            this.hideWelcomeModal();
        });

        document.getElementById('skip-welcome').addEventListener('click', () => {
            this.hideWelcomeModal();
        });

        document.getElementById('get-started').addEventListener('click', () => {
            this.hideWelcomeModal();
            this.showAddQuizModal();
            this.switchUploadTab('paste'); // Direct to paste tab
        });

        document.getElementById('copy-prompt').addEventListener('click', () => {
            this.copyPromptToClipboard();
        });

        // Empty state helper
        document.getElementById('empty-state-help').addEventListener('click', () => {
            this.showWelcomeModal();
        });

        // Mobile add quiz button
        document.getElementById('mobile-add-quiz-btn').addEventListener('click', () => {
            this.hideMobileMenu();
            this.showAddQuizModal();
            this.switchUploadTab('paste'); // Direct to paste tab on mobile
        });

        // Add quiz modal
        document.getElementById('add-quiz-btn').addEventListener('click', () => {
            this.showAddQuizModal();
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            this.hideAddQuizModal();
        });

        document.getElementById('modal-overlay').addEventListener('click', () => {
            this.hideAddQuizModal();
        });

        document.getElementById('cancel-upload').addEventListener('click', () => {
            this.hideAddQuizModal();
        });

        // File upload
        document.getElementById('quiz-file-input').addEventListener('change', (e) => {
            this.handleFileSelect(e);
        });

        document.getElementById('upload-quiz').addEventListener('click', () => {
            this.uploadQuiz();
        });

        // Upload tabs
        document.getElementById('file-tab').addEventListener('click', () => {
            this.switchUploadTab('file');
        });

        document.getElementById('paste-tab').addEventListener('click', () => {
            this.switchUploadTab('paste');
        });

        // JSON paste input
        document.getElementById('json-paste-input').addEventListener('input', (e) => {
            this.handleJsonPaste(e.target.value);
        });

        // Navigation
        document.getElementById('back-to-dashboard').addEventListener('click', () => {
            this.showView('dashboard');
        });

        document.getElementById('back-to-dashboard-results').addEventListener('click', () => {
            this.showView('dashboard');
        });

        // Quiz controls
        document.getElementById('prev-question').addEventListener('click', () => {
            this.previousQuestion();
        });

        document.getElementById('next-question').addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('submit-quiz').addEventListener('click', () => {
            this.submitQuiz();
        });

        // Results actions
        document.getElementById('retake-quiz').addEventListener('click', () => {
            this.retakeQuiz();
        });

        document.getElementById('review-answers').addEventListener('click', () => {
            this.toggleAnswerReview();
        });

        // Explanation input
        document.getElementById('explanation-input').addEventListener('input', (e) => {
            this.saveExplanation(e.target.value);
        });
    }

    // UI Management
    showView(viewName) {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`${viewName}-view`).classList.add('active');
    }

    updateUI() {
        this.updateStats();
        this.updateQuizList();
        this.updateEmptyState();
    }

    updateEmptyState() {
        const emptyStateHelper = document.getElementById('empty-state-helper');
        const hasQuizzes = this.quizzes.length > 0;
        
        if (hasQuizzes) {
            emptyStateHelper.style.display = 'none';
        } else {
            emptyStateHelper.style.display = 'block';
        }
    }

    updateStats() {
        document.getElementById('current-streak').textContent = this.stats.currentStreak;
        document.getElementById('total-quizzes').textContent = this.stats.totalQuizzes;
        document.getElementById('average-score').textContent = `${this.stats.averageScore}%`;
    }

    updateQuizList() {
        const quizList = document.getElementById('quiz-list');
        quizList.innerHTML = '';

        this.quizzes.forEach((quiz, index) => {
            const quizItem = document.createElement('div');
            quizItem.className = 'quiz-item';
            quizItem.innerHTML = `
                <div class="quiz-item-content">
                    <h4>${quiz.title}</h4>
                    <p>${quiz.questions.length} questions</p>
                </div>
                <button class="delete-quiz-btn" data-index="${index}" title="Delete quiz">
                    🗑️
                </button>
            `;
            
            // Add click listener to the content area (not the whole item)
            const content = quizItem.querySelector('.quiz-item-content');
            content.addEventListener('click', () => {
                this.startQuiz(index);
            });
            
            // Add delete functionality
            const deleteBtn = quizItem.querySelector('.delete-quiz-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering quiz start
                this.confirmDeleteQuiz(index);
            });
            
            quizList.appendChild(quizItem);
        });
    }

    // Modal Management
    showAddQuizModal() {
        document.getElementById('add-quiz-modal').classList.add('active');
        document.getElementById('modal-overlay').classList.add('active');
        
        // Auto-switch to paste tab on mobile
        if (window.innerWidth <= 768) {
            this.switchUploadTab('paste');
        }
    }

    hideAddQuizModal() {
        document.getElementById('add-quiz-modal').classList.remove('active');
        document.getElementById('modal-overlay').classList.remove('active');
        document.getElementById('quiz-file-input').value = '';
        document.getElementById('json-paste-input').value = '';
        document.getElementById('file-preview').style.display = 'none';
        document.getElementById('upload-quiz').disabled = true;
        // Reset to file tab
        this.switchUploadTab('file');
    }

    // Upload Tab Management
    switchUploadTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.upload-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Update sections
        document.querySelectorAll('.upload-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${tabName === 'file' ? 'file-upload' : 'json-paste'}-section`).classList.add('active');

        // Update upload button state
        this.updateUploadButtonState();
    }

    // JSON Paste Handling
    handleJsonPaste(value) {
        this.updateUploadButtonState();
        
        if (value.trim() === '') {
            return;
        }

        // Real-time validation feedback could be added here
        try {
            const parsed = JSON.parse(value);
            if (this.validateQuizStructure(parsed)) {
                // Could add visual feedback for valid JSON
                console.log('Valid quiz JSON detected');
            }
        } catch (error) {
            // Could add visual feedback for invalid JSON
            console.log('Invalid JSON');
        }
    }

    updateUploadButtonState() {
        const fileInput = document.getElementById('quiz-file-input');
        const jsonInput = document.getElementById('json-paste-input');
        const uploadButton = document.getElementById('upload-quiz');
        
        const activeTab = document.querySelector('.upload-tab.active').dataset.tab;
        
        if (activeTab === 'file') {
            uploadButton.disabled = !fileInput.files.length;
        } else {
            const jsonValue = jsonInput.value.trim();
            uploadButton.disabled = jsonValue === '';
        }
    }

    // Welcome Modal Management
    showWelcomeModal() {
        document.getElementById('welcome-modal').classList.add('active');
        document.getElementById('modal-overlay').classList.add('active');
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }

    hideWelcomeModal() {
        document.getElementById('welcome-modal').classList.remove('active');
        document.getElementById('modal-overlay').classList.remove('active');
        // Restore body scrolling
        document.body.style.overflow = '';
        // Mark as seen
        localStorage.setItem('welcomeModalSeen', 'true');
    }

    copyPromptToClipboard() {
        const promptText = document.getElementById('llm-prompt').value;
        const copyBtn = document.getElementById('copy-prompt');
        
        navigator.clipboard.writeText(promptText).then(() => {
            // Visual feedback
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅ Copied!';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = promptText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅ Copied!';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    }

    // Mobile Menu Management
    showMobileMenu() {
        document.getElementById('mobile-quiz-overlay').classList.add('active');
        this.updateMobileQuizList();
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }

    hideMobileMenu() {
        document.getElementById('mobile-quiz-overlay').classList.remove('active');
        // Restore body scrolling
        document.body.style.overflow = '';
    }

    updateMobileQuizList() {
        const mobileQuizList = document.getElementById('mobile-quiz-list');
        mobileQuizList.innerHTML = '';

        if (this.quizzes.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.style.cssText = `
                text-align: center;
                padding: 2rem;
                color: var(--color-gray-600);
                font-style: italic;
            `;
            emptyMessage.textContent = 'No quizzes available. Tap "Add New Quiz" to create your first quiz!';
            mobileQuizList.appendChild(emptyMessage);
            return;
        }

        this.quizzes.forEach((quiz, index) => {
            const mobileQuizItem = document.createElement('div');
            mobileQuizItem.className = 'mobile-quiz-item';
            mobileQuizItem.innerHTML = `
                <div class="mobile-quiz-item-content">
                    <h4>${quiz.title}</h4>
                    <p>${quiz.questions.length} questions</p>
                </div>
                <button class="delete-quiz-btn mobile-delete-btn" data-index="${index}" title="Delete quiz">
                    🗑️
                </button>
            `;
            
            // Add click listener to the content area (not the whole item)
            const content = mobileQuizItem.querySelector('.mobile-quiz-item-content');
            content.addEventListener('click', () => {
                this.hideMobileMenu();
                this.startQuiz(index);
            });
            
            // Add delete functionality
            const deleteBtn = mobileQuizItem.querySelector('.delete-quiz-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering quiz start
                this.confirmDeleteQuiz(index);
            });
            
            mobileQuizList.appendChild(mobileQuizItem);
        });
    }

    // Quiz Management
    confirmDeleteQuiz(index) {
        const quiz = this.quizzes[index];
        const confirmation = confirm(`Are you sure you want to delete "${quiz.title}"?\n\nThis action cannot be undone.`);
        
        if (confirmation) {
            this.deleteQuiz(index);
        }
    }

    deleteQuiz(index) {
        // Remove quiz from array
        this.quizzes.splice(index, 1);
        
        // Update storage
        this.saveToStorage();
        
        // Update UI
        this.updateUI();
        this.updateMobileQuizList();
        
        // Show success message
        const deletedQuizTitle = this.quizzes[index] ? this.quizzes[index].title : 'Quiz';
        
        // If user is currently taking the deleted quiz, return to dashboard
        if (this.currentQuiz && this.quizzes.indexOf(this.currentQuiz) === -1) {
            this.showView('dashboard');
            this.currentQuiz = null;
        }
    }

    // File Handling
    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type === 'application/json') {
            document.getElementById('file-name').textContent = file.name;
            document.getElementById('file-preview').style.display = 'block';
            this.updateUploadButtonState();
        } else {
            alert('Please select a valid JSON file.');
            event.target.value = '';
            document.getElementById('file-preview').style.display = 'none';
            this.updateUploadButtonState();
        }
    }

    async uploadQuiz() {
        const activeTab = document.querySelector('.upload-tab.active').dataset.tab;
        let quizData;

        try {
            if (activeTab === 'file') {
                // Handle file upload
                const fileInput = document.getElementById('quiz-file-input');
                const file = fileInput.files[0];

                if (!file) return;

                const text = await file.text();
                quizData = JSON.parse(text);
            } else {
                // Handle JSON paste
                const jsonInput = document.getElementById('json-paste-input');
                const jsonText = jsonInput.value.trim();

                if (!jsonText) return;

                quizData = JSON.parse(jsonText);
            }

            // Validate quiz structure
            if (!this.validateQuizStructure(quizData)) {
                alert('Invalid quiz format. Please check your JSON structure.');
                return;
            }

            // Add quiz to collection
            this.quizzes.push(quizData);
            this.saveToStorage();
            this.updateQuizList();
            this.updateMobileQuizList(); // Update mobile list too
            this.hideAddQuizModal();

            alert(`Quiz "${quizData.title}" added successfully!`);
        } catch (error) {
            const errorMessage = activeTab === 'file' 
                ? 'Error reading file. Please ensure it\'s a valid JSON file.'
                : 'Error parsing JSON. Please check your JSON syntax.';
            alert(errorMessage);
            console.error('Quiz upload error:', error);
        }
    }

    validateQuizStructure(quiz) {
        if (!quiz.title || !quiz.questions || !Array.isArray(quiz.questions)) {
            return false;
        }

        return quiz.questions.every(q => 
            q.question && 
            q.options && 
            Array.isArray(q.options) && 
            q.options.length >= 2 &&
            q.correct_answer &&
            q.options.includes(q.correct_answer)
        );
    }

    // Quiz Logic
    startQuiz(quizIndex) {
        this.currentQuiz = this.quizzes[quizIndex];
        this.currentQuestionIndex = 0;
        this.userAnswers = new Array(this.currentQuiz.questions.length).fill(null);
        this.userExplanations = new Array(this.currentQuiz.questions.length).fill('');

        // Shuffle options for each question
        this.currentQuiz.questions.forEach(question => {
            question.shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
        });

        this.showView('quiz');
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.currentQuiz.questions[this.currentQuestionIndex];
        
        document.getElementById('quiz-title').textContent = this.currentQuiz.title;
        document.getElementById('question-counter').textContent = 
            `Question ${this.currentQuestionIndex + 1} of ${this.currentQuiz.questions.length}`;
        document.getElementById('question-text').textContent = question.question;

        // Display options
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.shuffledOptions.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => {
                this.selectOption(option, optionElement);
            });
            optionsContainer.appendChild(optionElement);
        });

        // Load saved answer if exists
        if (this.userAnswers[this.currentQuestionIndex]) {
            const savedAnswer = this.userAnswers[this.currentQuestionIndex];
            const optionElements = optionsContainer.querySelectorAll('.option');
            optionElements.forEach(el => {
                if (el.textContent === savedAnswer) {
                    el.classList.add('selected');
                }
            });
        }

        // Load saved explanation
        document.getElementById('explanation-input').value = 
            this.userExplanations[this.currentQuestionIndex] || '';

        // Update navigation buttons
        document.getElementById('prev-question').disabled = this.currentQuestionIndex === 0;
        
        const isLastQuestion = this.currentQuestionIndex === this.currentQuiz.questions.length - 1;
        document.getElementById('next-question').style.display = isLastQuestion ? 'none' : 'block';
        document.getElementById('submit-quiz').style.display = isLastQuestion ? 'block' : 'none';
    }

    selectOption(selectedOption, optionElement) {
        // Remove previous selection
        document.querySelectorAll('.option').forEach(el => {
            el.classList.remove('selected');
        });

        // Add selection to clicked option
        optionElement.classList.add('selected');

        // Save answer
        this.userAnswers[this.currentQuestionIndex] = selectedOption;
    }

    saveExplanation(explanation) {
        this.userExplanations[this.currentQuestionIndex] = explanation;
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.currentQuiz.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }
    }

    submitQuiz() {
        // Calculate score
        let correctAnswers = 0;
        this.currentQuiz.questions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correct_answer) {
                correctAnswers++;
            }
        });

        const totalQuestions = this.currentQuiz.questions.length;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        const passed = correctAnswers > 3; // Pass if more than 3 correct

        // Update stats
        this.stats.totalQuizzes++;
        this.updateAverageScore(percentage);
        this.updateAttendance();
        this.saveToStorage();

        // Show results
        this.showResults(correctAnswers, totalQuestions, percentage, passed);
    }

    showResults(correct, total, percentage, passed) {
        document.getElementById('score-display').textContent = `${correct}/${total} Correct`;
        document.getElementById('percentage-display').textContent = `${percentage}% Accuracy`;
        
        const statusIndicator = document.getElementById('pass-fail-indicator');
        statusIndicator.textContent = passed ? 'PASS' : 'FAIL';
        statusIndicator.className = `status-indicator ${passed ? 'pass' : 'fail'}`;

        this.showView('results');
        this.updateUI();
    }

    retakeQuiz() {
        this.startQuiz(this.quizzes.indexOf(this.currentQuiz));
    }

    toggleAnswerReview() {
        const reviewSection = document.getElementById('answer-review');
        const isVisible = reviewSection.style.display !== 'none';
        
        if (isVisible) {
            reviewSection.style.display = 'none';
            document.getElementById('review-answers').textContent = 'Review Answers';
        } else {
            this.generateAnswerReview();
            reviewSection.style.display = 'block';
            document.getElementById('review-answers').textContent = 'Hide Review';
        }
    }

    generateAnswerReview() {
        const reviewSection = document.getElementById('answer-review');
        reviewSection.innerHTML = '<h3>Answer Review</h3>';

        this.currentQuiz.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const correctAnswer = question.correct_answer;
            const isCorrect = userAnswer === correctAnswer;

            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.style.cssText = `
                margin-bottom: 1.5rem;
                padding: 1rem;
                border-radius: 0.5rem;
                background-color: ${isCorrect ? '#f0fff4' : '#fff5f5'};
                border-left: 4px solid ${isCorrect ? '#38a169' : '#e53e3e'};
            `;

            reviewItem.innerHTML = `
                <h4 style="margin-bottom: 0.5rem; color: #1a202c;">Question ${index + 1}</h4>
                <p style="margin-bottom: 1rem; font-weight: 600;">${question.question}</p>
                <p style="margin-bottom: 0.5rem;">
                    <strong>Your answer:</strong> 
                    <span style="color: ${isCorrect ? '#38a169' : '#e53e3e'};">
                        ${userAnswer || 'No answer selected'}
                    </span>
                </p>
                <p style="margin-bottom: 0.5rem;">
                    <strong>Correct answer:</strong> 
                    <span style="color: #38a169;">${correctAnswer}</span>
                </p>
                ${this.userExplanations[index] ? `
                    <p style="margin-top: 1rem;">
                        <strong>Your explanation:</strong><br>
                        <em style="color: #718096;">${this.userExplanations[index]}</em>
                    </p>
                ` : ''}
            `;

            reviewSection.appendChild(reviewItem);
        });
    }

    // Statistics and Attendance
    updateAverageScore(newScore) {
        const totalScores = (this.stats.averageScore * (this.stats.totalQuizzes - 1)) + newScore;
        this.stats.averageScore = Math.round(totalScores / this.stats.totalQuizzes);
    }

    updateAttendance() {
        const today = new Date().toDateString();
        const existingEntry = this.attendanceData.find(entry => entry.date === today);

        if (!existingEntry) {
            this.attendanceData.push({
                date: today,
                quizzesCompleted: 1
            });
        } else {
            existingEntry.quizzesCompleted++;
        }

        this.updateStreak();
        this.generateAttendanceGrid();
    }

    updateStreak() {
        const sortedDates = this.attendanceData
            .map(entry => new Date(entry.date))
            .sort((a, b) => b - a);

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < sortedDates.length; i++) {
            const date = new Date(sortedDates[i]);
            date.setHours(0, 0, 0, 0);
            
            const expectedDate = new Date(today);
            expectedDate.setDate(today.getDate() - i);

            if (date.getTime() === expectedDate.getTime()) {
                streak++;
            } else {
                break;
            }
        }

        this.stats.currentStreak = streak;
    }

    generateAttendanceGrid() {
        const grid = document.getElementById('attendance-grid');
        grid.innerHTML = '';

        // Generate last 365 days
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 364);

        for (let i = 0; i < 365; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dateString = currentDate.toDateString();
            const attendanceEntry = this.attendanceData.find(entry => entry.date === dateString);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'attendance-day';
            
            if (attendanceEntry) {
                if (attendanceEntry.quizzesCompleted >= 3) {
                    dayElement.classList.add('completed');
                } else {
                    dayElement.classList.add('partial');
                }
                
                dayElement.title = `${dateString}: ${attendanceEntry.quizzesCompleted} quiz(es) completed`;
            } else {
                dayElement.title = `${dateString}: No activity`;
            }
            
            grid.appendChild(dayElement);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quizApp = new QuizApp();
});

// Add drag and drop functionality for file upload
document.addEventListener('DOMContentLoaded', () => {
    const fileUploadArea = document.querySelector('.file-upload-label');
    const fileInput = document.getElementById('quiz-file-input');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileUploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileUploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileUploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        fileUploadArea.style.borderColor = '#4a5568';
        fileUploadArea.style.backgroundColor = '#edf2f7';
    }

    function unhighlight(e) {
        fileUploadArea.style.borderColor = '#cbd5e0';
        fileUploadArea.style.backgroundColor = '#f7fafc';
    }

    fileUploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0) {
            fileInput.files = files;
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
        }
    }
});

