'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Plus, 
  Edit3, 
  Calendar, 
  Search, 
  Filter,
  BookOpen,
  Trash2,
  Save,
  X,
  Heart,
  Star,
  Coffee,
  Sun,
  Moon,
  Cloud,
  Smile,
  Frown,
  Meh
} from 'lucide-react';
import DynamicStyles from '@/components/DynamicStyle';
import { moodPalettes } from '@/lib/constants';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad' | 'excited' | 'anxious' | 'calm';
  tags: string[];
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  createdAt: string;
  updatedAt: string;
}

interface JournalPrompt {
  id: string;
  text: string;
  category: 'reflection' | 'gratitude' | 'goals' | 'emotions';
}

// Mock journal prompts
const JOURNAL_PROMPTS: JournalPrompt[] = [
  { id: '1', text: 'What are three things I\'m grateful for today?', category: 'gratitude' },
  { id: '2', text: 'How am I feeling right now and why?', category: 'emotions' },
  { id: '3', text: 'What challenge did I overcome today?', category: 'reflection' },
  { id: '4', text: 'What do I want to accomplish tomorrow?', category: 'goals' },
  { id: '5', text: 'What made me smile today?', category: 'gratitude' },
  { id: '6', text: 'What emotions am I struggling with?', category: 'emotions' },
  { id: '7', text: 'What did I learn about myself today?', category: 'reflection' },
  { id: '8', text: 'How can I be kinder to myself?', category: 'goals' },
];

// Mock dummy journals
const DUMMY_JOURNALS: JournalEntry[] = [
  {
    id: '1',
    date: '2025-09-25',
    title: 'A Beautiful Morning',
    content: 'Started my day with a cup of coffee and watched the sunrise. There\'s something magical about those quiet morning moments before the world wakes up. I feel grateful for this peaceful start and the opportunity to reflect on my goals for the day. The weather is perfect, and I\'m looking forward to a productive day ahead.',
    mood: 'happy',
    tags: ['morning', 'gratitude', 'coffee', 'sunrise'],
    timeOfDay: 'morning',
    createdAt: '2025-09-25T07:30:00Z',
    updatedAt: '2025-09-25T07:30:00Z'
  },
  {
    id: '2',
    date: '2025-09-24',
    title: 'Reflections on Growth',
    content: 'Today was challenging but rewarding. I faced a difficult situation at work that initially made me anxious, but I managed to handle it with grace. I\'m learning that growth happens outside our comfort zone. Even though I felt overwhelmed at times, I pushed through and found solutions I didn\'t think I was capable of.',
    mood: 'excited',
    tags: ['work', 'growth', 'challenges', 'resilience'],
    timeOfDay: 'evening',
    createdAt: '2025-09-24T19:45:00Z',
    updatedAt: '2025-09-24T19:45:00Z'
  },
  {
    id: '3',
    date: '2025-09-23',
    title: 'Quiet Evening Thoughts',
    content: 'Feeling a bit overwhelmed today. There\'s a lot on my mind, and I\'m trying to process everything. Sometimes it feels like there\'s too much to handle, but I know these feelings will pass. I\'m grateful for this journal as a space to express myself honestly. Tomorrow is a new day.',
    mood: 'anxious',
    tags: ['overwhelmed', 'processing', 'honesty', 'feelings'],
    timeOfDay: 'evening',
    createdAt: '2025-09-23T21:15:00Z',
    updatedAt: '2025-09-23T21:15:00Z'
  },
  {
    id: '4',
    date: '2025-09-22',
    title: 'Weekend Relaxation',
    content: 'What a peaceful weekend! Spent time reading, taking a long walk in the park, and connecting with friends. These moments of calm help me recharge and remember what\'s truly important. I feel centered and ready for the week ahead. Nature has such a healing effect on my mind.',
    mood: 'calm',
    tags: ['weekend', 'relaxation', 'nature', 'friends', 'reading'],
    timeOfDay: 'afternoon',
    createdAt: '2025-09-22T15:20:00Z',
    updatedAt: '2025-09-22T15:20:00Z'
  },
  {
    id: '5',
    date: '2025-09-21',
    title: 'Mixed Emotions',
    content: 'Today was one of those days where I felt a mix of everything. Started hopeful, hit some roadblocks that frustrated me, but ended with a sense of acceptance. Life isn\'t always linear, and that\'s okay. I\'m learning to sit with uncertainty and trust the process.',
    mood: 'neutral',
    tags: ['mixed feelings', 'acceptance', 'process', 'uncertainty'],
    timeOfDay: 'night',
    createdAt: '2025-09-21T23:10:00Z',
    updatedAt: '2025-09-21T23:10:00Z'
  }
];

const DailyJournalingPage: React.FC = () => {
  const router = useRouter();
  const [journals, setJournals] = React.useState<JournalEntry[]>([]);
  const [currentView, setCurrentView] = React.useState<'list' | 'create' | 'edit' | 'view'>('list');
  const [selectedJournal, setSelectedJournal] = React.useState<JournalEntry | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterMood, setFilterMood] = React.useState<string>('all');
  const [showPrompts, setShowPrompts] = React.useState(false);

  // Form state for creating/editing
  const [formData, setFormData] = React.useState({
    title: '',
    content: '',
    mood: 'neutral' as JournalEntry['mood'],
    tags: [] as string[],
    timeOfDay: 'morning' as JournalEntry['timeOfDay']
  });
  const [newTag, setNewTag] = React.useState('');

  // Get current mood theme
  const [userMood, setUserMood] = React.useState(3);

  React.useEffect(() => {
    // Load mood from localStorage
    const savedMood = localStorage.getItem('userMood');
    if (savedMood) {
      setUserMood(parseInt(savedMood));
    }

    // Load journals from localStorage or initialize with dummy data
    const savedJournals = localStorage.getItem('zenU_journals');
    if (savedJournals) {
      setJournals(JSON.parse(savedJournals));
    } else {
      setJournals(DUMMY_JOURNALS);
      localStorage.setItem('zenU_journals', JSON.stringify(DUMMY_JOURNALS));
    }
  }, []);

  const currentPalette = moodPalettes[userMood];

  const saveJournals = (newJournals: JournalEntry[]) => {
    setJournals(newJournals);
    localStorage.setItem('zenU_journals', JSON.stringify(newJournals));
  };

  const filteredJournals = journals
    .filter(journal => {
      const matchesSearch = journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           journal.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           journal.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesMood = filterMood === 'all' || journal.mood === filterMood;
      return matchesSearch && matchesMood;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="w-4 h-4 text-green-500" />;
      case 'excited': return <Star className="w-4 h-4 text-yellow-500" />;
      case 'calm': return <Heart className="w-4 h-4 text-blue-500" />;
      case 'neutral': return <Meh className="w-4 h-4 text-gray-500" />;
      case 'anxious': return <Cloud className="w-4 h-4 text-orange-500" />;
      case 'sad': return <Frown className="w-4 h-4 text-red-500" />;
      default: return <Meh className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTimeOfDayIcon = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'morning': return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'afternoon': return <Sun className="w-4 h-4 text-orange-500" />;
      case 'evening': return <Cloud className="w-4 h-4 text-purple-500" />;
      case 'night': return <Moon className="w-4 h-4 text-indigo-500" />;
      default: return <Sun className="w-4 h-4" />;
    }
  };

  const handleCreateNew = () => {
    setFormData({
      title: '',
      content: '',
      mood: 'neutral',
      tags: [],
      timeOfDay: 'morning'
    });
    setCurrentView('create');
    setShowPrompts(false);
  };

  const handleEdit = (journal: JournalEntry) => {
    setSelectedJournal(journal);
    setFormData({
      title: journal.title,
      content: journal.content,
      mood: journal.mood,
      tags: [...journal.tags],
      timeOfDay: journal.timeOfDay
    });
    setCurrentView('edit');
  };

  const handleDelete = (journalId: string) => {
    if (confirm('Are you sure you want to delete this journal entry?')) {
      const updatedJournals = journals.filter(j => j.id !== journalId);
      saveJournals(updatedJournals);
    }
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    const now = new Date().toISOString();
    const today = new Date().toISOString().split('T')[0];

    if (currentView === 'create') {
      const newJournal: JournalEntry = {
        id: Date.now().toString(),
        date: today,
        title: formData.title.trim(),
        content: formData.content.trim(),
        mood: formData.mood,
        tags: formData.tags,
        timeOfDay: formData.timeOfDay,
        createdAt: now,
        updatedAt: now
      };
      saveJournals([newJournal, ...journals]);
    } else if (currentView === 'edit' && selectedJournal) {
      const updatedJournal: JournalEntry = {
        ...selectedJournal,
        title: formData.title.trim(),
        content: formData.content.trim(),
        mood: formData.mood,
        tags: formData.tags,
        timeOfDay: formData.timeOfDay,
        updatedAt: now
      };
      const updatedJournals = journals.map(j => j.id === selectedJournal.id ? updatedJournal : j);
      saveJournals(updatedJournals);
    }

    setCurrentView('list');
    setSelectedJournal(null);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const usePrompt = (prompt: JournalPrompt) => {
    setFormData({
      ...formData,
      content: formData.content + (formData.content ? '\n\n' : '') + prompt.text + '\n\n'
    });
    setShowPrompts(false);
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

  const renderJournalList = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Daily Journal</h1>
          <p className="text-muted-foreground">Capture your thoughts and reflections</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-card rounded-lg p-4 space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search journals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={filterMood}
            onChange={(e) => setFilterMood(e.target.value)}
            className="px-4 py-2 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Moods</option>
            <option value="happy">Happy</option>
            <option value="excited">Excited</option>
            <option value="calm">Calm</option>
            <option value="neutral">Neutral</option>
            <option value="anxious">Anxious</option>
            <option value="sad">Sad</option>
          </select>
        </div>
      </div>

      {/* Journal Entries */}
      <div className="space-y-4">
        {filteredJournals.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchTerm || filterMood !== 'all' ? 'No journals found' : 'Start Your Journaling Journey'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterMood !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first journal entry to begin documenting your thoughts and feelings'
              }
            </p>
            <button
              onClick={handleCreateNew}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Create First Entry
            </button>
          </div>
        ) : (
          filteredJournals.map(journal => (
            <div key={journal.id} className="bg-card rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-card-foreground">{journal.title}</h3>
                    <div className="flex items-center space-x-2">
                      {getMoodIcon(journal.mood)}
                      {getTimeOfDayIcon(journal.timeOfDay)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span>{new Date(journal.date).toLocaleDateString()}</span>
                    <span className="capitalize">{journal.mood}</span>
                    <span className="capitalize">{journal.timeOfDay}</span>
                  </div>
                  <p className="text-card-foreground line-clamp-3 mb-3">
                    {journal.content}
                  </p>
                  {journal.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {journal.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(journal)}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(journal.id)}
                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderJournalForm = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {currentView === 'create' ? 'New Journal Entry' : 'Edit Journal Entry'}
          </h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowPrompts(!showPrompts)}
            className="bg-muted text-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/30 transition-colors"
          >
            Prompts
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button
            onClick={() => setCurrentView('list')}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Writing Prompts */}
      {showPrompts && (
        <div className="bg-card rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-card-foreground">Writing Prompts</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {JOURNAL_PROMPTS.map(prompt => (
              <button
                key={prompt.id}
                onClick={() => usePrompt(prompt)}
                className="text-left p-3 bg-muted hover:bg-accent/30 rounded-lg text-sm transition-colors"
              >
                <span className="text-primary font-medium capitalize">{prompt.category}:</span>
                <br />
                <span className="text-card-foreground">{prompt.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-card rounded-lg p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="What's on your mind today?"
            className="w-full px-4 py-3 bg-muted rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Mood and Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Current Mood
            </label>
            <select
              value={formData.mood}
              onChange={(e) => setFormData({ ...formData, mood: e.target.value as JournalEntry['mood'] })}
              className="w-full px-4 py-3 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="happy">😊 Happy</option>
              <option value="excited">⭐ Excited</option>
              <option value="calm">💙 Calm</option>
              <option value="neutral">😐 Neutral</option>
              <option value="anxious">☁️ Anxious</option>
              <option value="sad">😔 Sad</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Time of Day
            </label>
            <select
              value={formData.timeOfDay}
              onChange={(e) => setFormData({ ...formData, timeOfDay: e.target.value as JournalEntry['timeOfDay'] })}
              className="w-full px-4 py-3 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="morning">🌅 Morning</option>
              <option value="afternoon">☀️ Afternoon</option>
              <option value="evening">🌆 Evening</option>
              <option value="night">🌙 Night</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Your Thoughts
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Express yourself freely... What happened today? How are you feeling? What are you thinking about?"
            rows={12}
            className="w-full px-4 py-3 bg-muted rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Tags
          </label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add a tag..."
              className="flex-1 px-4 py-2 bg-muted rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleAddTag}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="flex items-center space-x-1 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
              >
                <span>{tag}</span>
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="text-accent-foreground hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

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

        {currentView === 'list' && renderJournalList()}
        {(currentView === 'create' || currentView === 'edit') && renderJournalForm()}
      </div>
    </div>
  );
};

export default DailyJournalingPage;