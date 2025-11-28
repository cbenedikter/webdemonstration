/**
 * POC Motion Decision Tree Logic
 * 
 * This module implements an interactive decision tree for determining the appropriate
 * POC (Proof of Concept) motion based on customer requirements and readiness.
 * 
 * Decision Flow:
 * 1. Clear Use Case → If NO: Guided Trial (end)
 * 2. Developer Resources → If NO: Guided Trial (end)
 * 3. Technical Validation (Coffee Analogy):
 *    - Option A (Basic): Sandbox Trial (end)
 *    - Option B (Quality): Technical Validation POC Tier 1-2 (end)  
 *    - Option C (Complex): Continue to Step 4
 * 4. Competitors Involved → Store competitive context, continue to Step 5
 * 5. Buying Committee Complexity → Compute final result based on stakeholder level + competitive context:
 *    - Executive: Proof of Value (Tier 5)
 *    - Biz-Dev + Competitive: Competitive Bake-Off (Tier 3-4)
 *    - Biz-Dev + No Competition: Technical Validation POC (Tier 2-3)
 *    - Committee + Competitive: Competitive Bake-Off (Tier 4)
 *    - Committee + No Competition: Technical Validation POC (Tier 3-4)
 */

// Decision Tree State Management
let decisionTreeState = {
    currentStep: 1,
    totalSteps: 5,
    responses: {},
    competitiveContext: false,
    stakeholderLevel: null,
    isComplete: false
};

// Question Configuration
const questions = {
    1: {
        title: "Does the customer have a clear use case or problem statement?",
        buttons: [
            { text: "Yes", value: "yes", class: "yes-btn" },
            { text: "No", value: "no", class: "no-btn" }
        ]
    },
    2: {
        title: "Are developer resources committed and available to implement/testing?",
        buttons: [
            { text: "Yes", value: "yes", class: "yes-btn" },
            { text: "No", value: "no", class: "no-btn" }
        ]
    },
    3: {
        title: "Which type of validation does the customer need?",
        subtitle: "Level of Technical Validation (Coffee Analogy)",
        buttons: [
            { 
                text: "Option A: 'Can OneSignal Make Coffee?'", 
                subtitle: "Basic Functionality",
                description: "Validate core functionality only",
                examples: "Send & receive messages, trigger webhooks, SDK installs, simple API requests, basic segments, one journey",
                value: "basic", 
                class: "option-btn option-a" 
            },
            { 
                text: "Option B: 'Can OneSignal Make Good Coffee?'", 
                subtitle: "Quality vs Current Solution",
                description: "Validate improvement over existing system",
                examples: "Higher deliverability, better identity mapping, flexible customization, better analytics, improved automation",
                value: "quality", 
                class: "option-btn option-b" 
            },
            { 
                text: "Option C: 'Can OneSignal Become the Barista?'", 
                subtitle: "Complex Validation",
                description: "Deeper, multi-team, multi-system technical validation",
                examples: "Multi-channel workflows, API triggers & backend integrations, migration feasibility, scale/latency testing, multi-threaded teams, data governance",
                value: "complex", 
                class: "option-btn option-c" 
            }
        ]
    },
    4: {
        title: "Is the customer actively evaluating competitors alongside OneSignal?",
        buttons: [
            { text: "Yes", value: "yes", class: "yes-btn" },
            { text: "No", value: "no", class: "no-btn" }
        ]
    },
    5: {
        title: "What does the customer's buying group look like?",
        buttons: [
            { 
                text: "Option A: Business User + Developer Only", 
                value: "biz-dev", 
                class: "option-btn option-a" 
            },
            { 
                text: "Option B: Cross-Functional Buying Committee", 
                value: "committee", 
                class: "option-btn option-b" 
            },
            { 
                text: "Option C: Executive Sponsor Involved", 
                value: "exec", 
                class: "option-btn option-c" 
            }
        ]
    }
};

// Result Configuration
const results = {
    "guided-trial": {
        motion: "Guided Trial",
        description: "Customer needs more guidance to clarify their use case or lacks the necessary resources. A guided trial will help them explore the platform with support.",
        class: "guided-trial"
    },
    "no-poc": {
        motion: "No-POC / Value Exploration",
        description: "Discovery and education motion when the customer is not ready for a POC.",
        class: "no-poc"
    },
    "sandbox-trial": {
        motion: "Sandbox Trial",
        description: "Lightweight, low-complexity validation to confirm basic functionality.",
        class: "sandbox-trial"
    },
    "technical-validation-tier1-2": {
        motion: "Technical Validation (Tier 3)",
        description: "Focused validation of improvements vs current solution. Does OneSignal make better coffee?",
        class: "technical-validation"
    },
    "technical-validation-tier2-3": {
        motion: "Technical Validation POC (3)",
        description: "For customers comparing capabilities and validating improvements.",
        class: "technical-validation"
    },
    "technical-validation-tier3-4": {
        motion: "Technical Validation POC (Tier 3)",
        description: "For customers comparing capabilities and validating improvements.",
        class: "technical-validation"
    },
    "competitive-bakeoff-tier3-4": {
        motion: "Competitive Bake-Off (Tier 4)",
        description: "For competitive evaluations requiring A/B comparisons.",
        class: "competitive-bakeoff"
    },
    "competitive-bakeoff-tier4": {
        motion: "Competitive Bake-Off (Tier 4)",
        description: "For competitive evaluations requiring A/B comparisons.",
        class: "competitive-bakeoff"
    },
    "proof-of-value": {
        motion: "Proof of Value (Tier 5)",
        description: "Executive-sponsored, strategic POC validating OneSignal as the future-state platform.",
        class: "proof-of-value"
    }
};

/**
 * Opens the POC Decision Tree modal and initializes the wizard
 */
function openPOCDecisionTree() {
    const modal = document.getElementById('poc-decision-tree-modal');
    if (modal) {
        modal.style.display = 'flex';
        resetDecisionTree();
        showCurrentQuestion();
        
        // Add animation class
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

/**
 * Closes the POC Decision Tree modal
 */
function closePOCDecisionTree() {
    const modal = document.getElementById('poc-decision-tree-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

/**
 * Resets the decision tree to initial state
 */
function resetDecisionTree() {
    decisionTreeState = {
        currentStep: 1,
        totalSteps: 5,
        responses: {},
        competitiveContext: false,
        stakeholderLevel: null,
        isComplete: false
    };
    
    // Hide result container and show question container
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'flex';
    
    // Reset navigation buttons
    document.getElementById('back-btn').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'none';
    
    updateProgressIndicator();
}

/**
 * Restarts the decision tree from the beginning
 */
function restartDecisionTree() {
    resetDecisionTree();
    showCurrentQuestion();
}

/**
 * Updates the progress indicator
 */
function updateProgressIndicator() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill && progressText) {
        const percentage = (decisionTreeState.currentStep / decisionTreeState.totalSteps) * 100;
        progressFill.style.width = `${percentage}%`;
        
        if (decisionTreeState.isComplete) {
            progressText.textContent = 'Complete';
        } else {
            progressText.textContent = `Step ${decisionTreeState.currentStep} of ${decisionTreeState.totalSteps}`;
        }
    }
}

/**
 * Displays the current question
 */
function showCurrentQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questionTitle = document.getElementById('question-title');
    const questionButtons = document.getElementById('question-buttons');
    
    if (!questionContainer || !questionTitle || !questionButtons) return;
    
    const currentQuestion = questions[decisionTreeState.currentStep];
    if (!currentQuestion) return;
    
    // Update question title
    if (currentQuestion.subtitle) {
        questionTitle.innerHTML = `<div class="question-subtitle">${currentQuestion.subtitle}</div>${currentQuestion.title}`;
    } else {
        questionTitle.textContent = currentQuestion.title;
    }
    
    // Clear and populate buttons
    questionButtons.innerHTML = '';
    currentQuestion.buttons.forEach(button => {
        const btnElement = document.createElement('button');
        btnElement.className = `question-btn ${button.class}`;
        
        // Handle different button types
        if (button.subtitle && button.description) {
            // Complex button with subtitle and description (Step 3)
            btnElement.innerHTML = `
                <div class="btn-main-text">${button.text}</div>
                <div class="btn-subtitle">${button.subtitle}</div>
                <div class="btn-description">${button.description}</div>
                ${button.examples ? `<div class="btn-examples">${button.examples}</div>` : ''}
            `;
        } else {
            // Simple button (other steps)
            btnElement.textContent = button.text;
        }
        
        btnElement.onclick = () => handleAnswer(button.value);
        questionButtons.appendChild(btnElement);
    });
    
    // Update back button visibility
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.style.display = decisionTreeState.currentStep > 1 ? 'inline-block' : 'none';
    }
    
    updateProgressIndicator();
}

/**
 * Handles user answer and determines next step
 */
function handleAnswer(answer) {
    // Store the response
    decisionTreeState.responses[decisionTreeState.currentStep] = answer;
    
    // Determine next action based on current step and answer
    const result = evaluateAnswer(decisionTreeState.currentStep, answer);
    
    if (result) {
        // End the flow and show result
        showResult(result);
    } else {
        // Continue to next question
        decisionTreeState.currentStep++;
        showCurrentQuestion();
    }
}

/**
 * Evaluates the answer and determines if the flow should end
 */
function evaluateAnswer(step, answer) {
    switch (step) {
        case 1: // Clear Use Case
            if (answer === 'no') {
                return 'guided-trial';
            }
            break;
            
        case 2: // Developer Resources
            if (answer === 'no') {
                return 'guided-trial';
            }
            break;
            
        case 3: // Technical Validation (Coffee Analogy)
            if (answer === 'basic') {
                return 'sandbox-trial';
            } else if (answer === 'quality') {
                return 'technical-validation-tier1-2';
            }
            // If answer === 'complex', continue to next step
            break;
            
        case 4: // Competitors Involved
            // Store competitive context and continue to Step 5
            decisionTreeState.competitiveContext = (answer === 'yes');
            break;
            
        case 5: // Buying Committee Complexity
            // Store stakeholder level and compute final result
            decisionTreeState.stakeholderLevel = answer;
            return computeFinalResult();
    }
    
    return null; // Continue to next question
}

/**
 * Computes the final result based on stakeholder level and competitive context
 */
function computeFinalResult() {
    const { stakeholderLevel, competitiveContext } = decisionTreeState;
    
    // Executive Sponsor Involved → Proof of Value (Tier 5)
    if (stakeholderLevel === 'exec') {
        return 'proof-of-value';
    }
    
    // Business User + Developer Only
    if (stakeholderLevel === 'biz-dev') {
        if (competitiveContext) {
            return 'competitive-bakeoff-tier3-4';
        } else {
            return 'technical-validation-tier2-3';
        }
    }
    
    // Cross-Functional Buying Committee
    if (stakeholderLevel === 'committee') {
        if (competitiveContext) {
            return 'competitive-bakeoff-tier4';
        } else {
            return 'technical-validation-tier3-4';
        }
    }
    
    // Fallback (should not happen)
    return 'technical-validation-tier2-3';
}

/**
 * Displays the final result
 */
function showResult(resultKey) {
    decisionTreeState.isComplete = true;
    
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    const resultMotion = document.getElementById('result-motion');
    const resultDescription = document.getElementById('result-description');
    const restartBtn = document.getElementById('restart-btn');
    const backBtn = document.getElementById('back-btn');
    
    if (!questionContainer || !resultContainer || !resultMotion || !resultDescription) return;
    
    const result = results[resultKey];
    if (!result) return;
    
    // Hide question container and show result container
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'flex';
    
    // Populate result content
    resultMotion.textContent = result.motion;
    resultMotion.className = `result-motion ${result.class}`;
    resultDescription.textContent = result.description;
    
    // Update navigation buttons
    if (restartBtn) restartBtn.style.display = 'inline-block';
    if (backBtn) backBtn.style.display = 'none';
    
    updateProgressIndicator();
    
    // Log result for analytics (optional)
    logDecisionTreeResult(resultKey, decisionTreeState.responses);
}

/**
 * Goes back to the previous step
 */
function goBackStep() {
    if (decisionTreeState.currentStep > 1) {
        decisionTreeState.currentStep--;
        
        // Remove the response for the current step
        delete decisionTreeState.responses[decisionTreeState.currentStep + 1];
        
        // Show the previous question
        showCurrentQuestion();
    }
}

/**
 * Logs the decision tree result for analytics (optional)
 */
function logDecisionTreeResult(resultKey, responses) {
    const logData = {
        timestamp: new Date().toISOString(),
        result: resultKey,
        responses: responses,
        userAgent: navigator.userAgent
    };
    
    // Store in localStorage for now (could be sent to analytics service)
    try {
        const existingLogs = JSON.parse(localStorage.getItem('pocDecisionTreeLogs') || '[]');
        existingLogs.push(logData);
        
        // Keep only the last 50 entries
        if (existingLogs.length > 50) {
            existingLogs.splice(0, existingLogs.length - 50);
        }
        
        localStorage.setItem('pocDecisionTreeLogs', JSON.stringify(existingLogs));
    } catch (error) {
        console.warn('Could not save decision tree log:', error);
    }
    
    console.log('POC Decision Tree Result:', logData);
}

/**
 * Exports the current result as JSON (optional enhancement)
 */
function exportResult() {
    if (!decisionTreeState.isComplete) return;
    
    const exportData = {
        timestamp: new Date().toISOString(),
        responses: decisionTreeState.responses,
        result: getCurrentResult()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `poc-decision-tree-result-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
}

/**
 * Gets the current result based on responses
 */
function getCurrentResult() {
    // Re-evaluate the responses to determine the result
    for (let step = 1; step <= decisionTreeState.totalSteps; step++) {
        const answer = decisionTreeState.responses[step];
        if (answer) {
            const result = evaluateAnswer(step, answer);
            if (result) {
                return result;
            }
        }
    }
    return null;
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking outside
    const modal = document.getElementById('poc-decision-tree-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePOCDecisionTree();
            }
        });
    }
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('poc-decision-tree-modal');
            if (modal && modal.style.display === 'flex') {
                closePOCDecisionTree();
            }
        }
    });
});

// Export functions for global access
window.openPOCDecisionTree = openPOCDecisionTree;
window.closePOCDecisionTree = closePOCDecisionTree;
window.restartDecisionTree = restartDecisionTree;
window.goBackStep = goBackStep;
window.exportResult = exportResult;
