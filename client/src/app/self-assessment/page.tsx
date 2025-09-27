'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Brain, Heart, CheckCircle, AlertTriangle, MessageCircle, Phone } from 'lucide-react';
import DynamicStyles from '@/components/DynamicStyle';
import { moodPalettes } from '@/lib/constants';

// Mock data for questionnaires
const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed. Or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself"
];

const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen"
];

const RESPONSE_OPTIONS = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" }
];

interface AssessmentResponse {
  questionIndex: number;
  value: number;
}

interface AssessmentResults {
  phq9Score: number;
  gad7Score: number;
  phq9Severity: string;
  gad7Severity: string;
  recommendations: string[];
  riskLevel: 'low' | 'moderate' | 'high' | 'severe';
}

const SelfAssessmentPage: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState<'intro' | 'phq9' | 'gad7' | 'results'>('intro');
  const [phq9Responses, setPhq9Responses] = React.useState<AssessmentResponse[]>([]);
  const [gad7Responses, setGad7Responses] = React.useState<AssessmentResponse[]>([]);
  const [results, setResults] = React.useState<AssessmentResults | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  // Get current mood from localStorage or default to neutral
  const [userMood, setUserMood] = React.useState(3);
  const [currentTheme, setCurrentTheme] = React.useState("okay");

  React.useEffect(() => {
    const savedMood = localStorage.getItem('userMood');
    if (savedMood) {
      const moodValue = parseInt(savedMood);
      setUserMood(moodValue);
      const moodThemes = ["very-sad", "sad", "okay", "good", "great"];
      setCurrentTheme(moodThemes[moodValue] || 'okay');
    }
  }, []);

  const currentPalette = moodPalettes[userMood];

  const handleResponse = (value: number) => {
    if (currentStep === 'phq9') {
      const newResponses = [...phq9Responses];
      const existingIndex = newResponses.findIndex(r => r.questionIndex === currentQuestionIndex);
      
      if (existingIndex >= 0) {
        newResponses[existingIndex].value = value;
      } else {
        newResponses.push({ questionIndex: currentQuestionIndex, value });
      }
      
      setPhq9Responses(newResponses);
      
      if (currentQuestionIndex < PHQ9_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentStep('gad7');
        setCurrentQuestionIndex(0);
      }
    } else if (currentStep === 'gad7') {
      const newResponses = [...gad7Responses];
      const existingIndex = newResponses.findIndex(r => r.questionIndex === currentQuestionIndex);
      
      if (existingIndex >= 0) {
        newResponses[existingIndex].value = value;
      } else {
        newResponses.push({ questionIndex: currentQuestionIndex, value });
      }
      
      setGad7Responses(newResponses);
      
      if (currentQuestionIndex < GAD7_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateResults(phq9Responses, newResponses);
      }
    }
  };

  const calculateResults = (phq9: AssessmentResponse[], gad7: AssessmentResponse[]) => {
    const phq9Score = phq9.reduce((sum, response) => sum + response.value, 0);
    const gad7Score = gad7.reduce((sum, response) => sum + response.value, 0);

    // PHQ-9 severity levels
    let phq9Severity = '';
    if (phq9Score <= 4) phq9Severity = 'Minimal depression';
    else if (phq9Score <= 9) phq9Severity = 'Mild depression';
    else if (phq9Score <= 14) phq9Severity = 'Moderate depression';
    else if (phq9Score <= 19) phq9Severity = 'Moderately severe depression';
    else phq9Severity = 'Severe depression';

    // GAD-7 severity levels
    let gad7Severity = '';
    if (gad7Score <= 4) gad7Severity = 'Minimal anxiety';
    else if (gad7Score <= 9) gad7Severity = 'Mild anxiety';
    else if (gad7Score <= 14) gad7Severity = 'Moderate anxiety';
    else gad7Severity = 'Severe anxiety';

    // Determine overall risk level and recommendations
    let riskLevel: 'low' | 'moderate' | 'high' | 'severe' = 'low';
    let recommendations: string[] = [];

    // Check for suicidal ideation (PHQ-9 question 9)
    const suicidalResponse = phq9.find(r => r.questionIndex === 8);
    const hasSuicidalThoughts = suicidalResponse && suicidalResponse.value > 0;

    if (hasSuicidalThoughts || phq9Score >= 20 || gad7Score >= 15) {
      riskLevel = 'severe';
      recommendations = [
        "Seek immediate professional help through our Crisis Support",
        "Contact a mental health professional as soon as possible",
        "Consider reaching out to a trusted friend or family member",
        "Use our AI chatbot for immediate emotional support"
      ];
    } else if (phq9Score >= 15 || gad7Score >= 10) {
      riskLevel = 'high';
      recommendations = [
        "Consider speaking with a mental health professional",
        "Try our guided meditation and mindfulness exercises",
        "Connect with our AI chatbot for personalized support",
        "Practice self-care activities and maintain a routine"
      ];
    } else if (phq9Score >= 10 || gad7Score >= 5) {
      riskLevel = 'moderate';
      recommendations = [
        "Engage with our AI chatbot for ongoing support",
        "Try our mood tracking and wellness activities",
        "Consider lifestyle changes like regular exercise",
        "Practice stress management techniques"
      ];
    } else {
      riskLevel = 'low';
      recommendations = [
        "Continue monitoring your mental health",
        "Use our daily mood check-ins to stay aware",
        "Explore our wellness resources for prevention",
        "Maintain healthy habits and social connections"
      ];
    }

    const assessmentResults: AssessmentResults = {
      phq9Score,
      gad7Score,
      phq9Severity,
      gad7Severity,
      recommendations,
      riskLevel
    };

    setResults(assessmentResults);
    setCurrentStep('results');
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentStep === 'gad7') {
      setCurrentStep('phq9');
      setCurrentQuestionIndex(PHQ9_QUESTIONS.length - 1);
    }
  };

  const dynamicStyles: React.CSSProperties = {
    '--primary': currentPalette.primary,
    '--primary-foreground': currentPalette.primaryForeground,
    '--background': currentPalette.background,
    '--foreground': currentPalette.foreground,
    '--card': currentPalette.card,
    '--card-foreground': currentPalette.cardForeground,
    '--muted': currentPalette.muted,
    '--muted-foreground': currentPalette.mutedForeground,
    '--accent': currentPalette.accent,
    '--accent-foreground': currentPalette.accentForeground,
    '--border': currentPalette.border,
    '--ring': currentPalette.ring,
    background: currentPalette.gradient
  } as React.CSSProperties;

  const renderIntroStep = () => (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Brain className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Self-Assessment</h1>
        <p className="text-muted-foreground text-sm">
          Take a moment to check in with yourself. This assessment uses standardized questionnaires 
          to help you understand your current mental health status.
        </p>
      </div>

      <div className="bg-card rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-card-foreground">What you'll complete:</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-card-foreground">PHQ-9: Depression screening (9 questions)</span>
          </div>
          <div className="flex items-center space-x-3">
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-card-foreground">GAD-7: Anxiety screening (7 questions)</span>
          </div>
        </div>
      </div>

      <div className="bg-accent/20 rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Important:</strong> This assessment is for informational purposes only and does not 
          replace professional medical advice. If you're experiencing thoughts of self-harm, please 
          seek immediate help.
        </p>
      </div>

      <button
        onClick={() => setCurrentStep('phq9')}
        className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Begin Assessment
      </button>
    </div>
  );

  const renderQuestionStep = () => {
    const isPhq9 = currentStep === 'phq9';
    const questions = isPhq9 ? PHQ9_QUESTIONS : GAD7_QUESTIONS;
    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const assessmentName = isPhq9 ? 'PHQ-9' : 'GAD-7';
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    return (
      <div className="max-w-2xl mx-auto p-2 space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          {(currentQuestionIndex > 0 || currentStep === 'gad7') && (
            <button
              onClick={goToPreviousQuestion}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
          <div className="flex-1">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{assessmentName}</span>
              <span>{currentQuestionIndex + 1} of {totalQuestions}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-4 space-y-6">
          <h2 className="text-xl font-semibold text-card-foreground">
            Over the last 2 weeks, how often have you been bothered by:
          </h2>
          
          <div className="bg-accent/20 rounded-lg p-4">
            <p className="text-lg text-card-foreground font-medium">
              {currentQuestion}
            </p>
          </div>

          <div className="space-y-3">
            {RESPONSE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleResponse(option.value)}
                className="w-full text-left p-4 bg-muted hover:bg-accent/30 rounded-lg transition-colors border border-transparent hover:border-primary/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 border-2 border-primary rounded-full flex-shrink-0" />
                  <span className="text-card-foreground">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderResultsStep = () => {
    if (!results) return null;

    const getRiskColor = () => {
      switch (results.riskLevel) {
        case 'severe': return 'text-red-600';
        case 'high': return 'text-orange-600';
        case 'moderate': return 'text-yellow-600';
        default: return 'text-green-600';
      }
    };

    const getRiskIcon = () => {
      switch (results.riskLevel) {
        case 'severe': return <AlertTriangle className="w-6 h-6 text-red-600" />;
        case 'high': return <AlertTriangle className="w-6 h-6 text-orange-600" />;
        case 'moderate': return <CheckCircle className="w-6 h-6 text-yellow-600" />;
        default: return <CheckCircle className="w-6 h-6 text-green-600" />;
      }
    };

    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            {getRiskIcon()}
          </div>
          <h1 className="text-3xl font-bold text-foreground">Your Assessment Results</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-6 space-y-3">
            <h3 className="text-lg font-semibold text-card-foreground">Depression (PHQ-9)</h3>
            <div className="text-2xl font-bold text-primary">{results.phq9Score}/27</div>
            <p className="text-sm text-muted-foreground">{results.phq9Severity}</p>
          </div>

          <div className="bg-card rounded-lg p-6 space-y-3">
            <h3 className="text-lg font-semibold text-card-foreground">Anxiety (GAD-7)</h3>
            <div className="text-2xl font-bold text-primary">{results.gad7Score}/21</div>
            <p className="text-sm text-muted-foreground">{results.gad7Severity}</p>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-card-foreground">Recommendations</h3>
          <div className="space-y-3">
            {results.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-card-foreground">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {results.riskLevel === 'severe' ? (
            <button
              onClick={() => router.push('/crisis-support')}
              className="flex items-center justify-center space-x-2 bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Crisis Support</span>
            </button>
          ) : (
            <button
              onClick={() => router.push('/ai-chatbot')}
              className="flex items-center justify-center space-x-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat with AI Support</span>
            </button>
          )}
          
          <button
            onClick={() => router.push('/')}
            className="bg-muted text-foreground py-3 px-6 rounded-lg font-medium hover:bg-accent/30 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-accent/20 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            Remember: This assessment provides general guidance. For professional evaluation and 
            personalized treatment recommendations, please consult with a qualified mental health professional.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen fade-in" style={dynamicStyles}>
      <DynamicStyles palette={currentPalette} />
      
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {currentStep === 'intro' && renderIntroStep()}
        {(currentStep === 'phq9' || currentStep === 'gad7') && renderQuestionStep()}
        {currentStep === 'results' && renderResultsStep()}
      </div>
    </div>
  );

};

export default SelfAssessmentPage;