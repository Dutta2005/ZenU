'use client';

import React from 'react';
import { 
  ArrowLeft, 
  Search,
  BookOpen,
  Video,
  FileText,
  Heart,
  Star,
  Clock,
  ExternalLink,
  Eye,
  Filter,
  X,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { MoodPalette } from '@/lib/types';

// Dynamic color palette system
const moodPalettes = {
  1: { // Very Low
    primary: '#8B5A3C',
    primaryForeground: '#FFFFFF',
    background: 'linear-gradient(135deg, #2C1810 0%, #1A0F0A 100%)',
    foreground: '#E5D3C8',
    card: '#3C2415',
    cardForeground: '#E5D3C8',
    muted: '#4A2F1C',
    mutedForeground: '#C4B5A8',
    accent: '#6B4226',
    accentForeground: '#E5D3C8',
    border: '#5C3520',
    ring: '#8B5A3C'
  },
  2: { // Low
    primary: '#B85450',
    primaryForeground: '#FFFFFF',
    background: 'linear-gradient(135deg, #2D1B1A 0%, #1A1010 100%)',
    foreground: '#E8D6D5',
    card: '#3D2424',
    cardForeground: '#E8D6D5',
    muted: '#4A2828',
    mutedForeground: '#C7B6B5',
    accent: '#8B4A47',
    accentForeground: '#E8D6D5',
    border: '#5D3534',
    ring: '#B85450'
  },
  3: { // Neutral
    primary: '#6366F1',
    primaryForeground: '#FFFFFF',
    background: 'linear-gradient(135deg, #1E1B2E 0%, #0F0D1A 100%)',
    foreground: '#E2E8F0',
    card: '#2D2A3E',
    cardForeground: '#E2E8F0',
    muted: '#3A364A',
    mutedForeground: '#94A3B8',
    accent: '#4338CA',
    accentForeground: '#E2E8F0',
    border: '#4C4965',
    ring: '#6366F1'
  },
  4: { // Good
    primary: '#059669',
    primaryForeground: '#FFFFFF',
    background: 'linear-gradient(135deg, #1A2E23 0%, #0D1B13 100%)',
    foreground: '#D1FAE5',
    card: '#243B2F',
    cardForeground: '#D1FAE5',
    muted: '#2F4A38',
    mutedForeground: '#86EFAC',
    accent: '#047857',
    accentForeground: '#D1FAE5',
    border: '#365A42',
    ring: '#059669'
  },
  5: { // Very Good
    primary: '#F59E0B',
    primaryForeground: '#FFFFFF',
    background: 'linear-gradient(135deg, #2E1F0A 0%, #1B1305 100%)',
    foreground: '#FEF3C7',
    card: '#3E2C15',
    cardForeground: '#FEF3C7',
    muted: '#4A3418',
    mutedForeground: '#FDE68A',
    accent: '#D97706',
    accentForeground: '#FEF3C7',
    border: '#5C4220',
    ring: '#F59E0B'
  }
};

const DynamicStyles: React.FC<{ palette: any }> = ({ palette }) => {
  return (
    <style jsx global>{`
      :root {
        --primary: ${palette.primary};
        --primary-foreground: ${palette.primaryForeground};
        --background: ${palette.background};
        --foreground: ${palette.foreground};
        --card: ${palette.card};
        --card-foreground: ${palette.cardForeground};
        --muted: ${palette.muted};
        --muted-foreground: ${palette.mutedForeground};
        --accent: ${palette.accent};
        --accent-foreground: ${palette.accentForeground};
        --border: ${palette.border};
        --ring: ${palette.ring};
      }
      
      .text-primary { color: var(--primary) !important; }
      .text-primary-foreground { color: var(--primary-foreground) !important; }
      .text-foreground { color: var(--foreground) !important; }
      .text-card-foreground { color: var(--card-foreground) !important; }
      .text-muted-foreground { color: var(--muted-foreground) !important; }
      .text-accent-foreground { color: var(--accent-foreground) !important; }
      
      .bg-primary { background-color: var(--primary) !important; }
      .bg-card { background-color: var(--card) !important; }
      .bg-muted { background-color: var(--muted) !important; }
      .bg-accent { background-color: var(--accent) !important; }
      
      .border-border { border-color: var(--border) !important; }
      .border-accent { border-color: var(--accent) !important; }
      
      .hover\\:bg-accent:hover { background-color: var(--accent) !important; }
      .hover\\:text-primary:hover { color: var(--primary) !important; }
      
      .focus\\:ring-primary:focus { 
        --tw-ring-color: var(--primary) !important; 
        box-shadow: 0 0 0 2px var(--primary) !important;
      }
    `}</style>
  );
};

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'blog';
  category: 'anxiety' | 'depression' | 'stress' | 'mindfulness' | 'relationships' | 'academic' | 'self-care' | 'general';
  url: string;
  thumbnail?: string;
  duration?: string;
  rating: number;
  views: number;
  isBookmarked: boolean;
  isFree: boolean;
  tags: string[];
  author: string;
  featured: boolean;
}

// Simplified mock data with only videos, PDFs, and blogs
const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Breathing Techniques for Anxiety',
    description: 'Learn effective breathing exercises to manage anxiety and panic attacks in just 5 minutes.',
    type: 'video',
    category: 'anxiety',
    url: 'https://youtube.com/watch?v=example1',
    thumbnail: '🫁',
    duration: '5:32',
    rating: 4.8,
    views: 125000,
    isBookmarked: false,
    isFree: true,
    tags: ['breathing', 'anxiety', 'quick relief'],
    author: 'Dr. Sarah Chen',
    featured: true
  },
  {
    id: '2',
    title: 'Student Mental Health Guide',
    description: 'Complete guide covering mental health challenges, coping strategies, and resources for students.',
    type: 'pdf',
    category: 'general',
    url: '/resources/student-guide.pdf',
    thumbnail: '📚',
    rating: 4.9,
    views: 89000,
    isBookmarked: true,
    isFree: true,
    tags: ['comprehensive', 'student life', 'coping'],
    author: 'Student Wellness Center',
    featured: true
  },
  {
    id: '3',
    title: 'Mindfulness for Busy Students',
    description: 'Practical mindfulness techniques that fit into your busy student schedule.',
    type: 'blog',
    category: 'mindfulness',
    url: 'https://blog.example.com/mindfulness-students',
    thumbnail: '🧘‍♀️',
    rating: 4.7,
    views: 67000,
    isBookmarked: false,
    isFree: true,
    tags: ['mindfulness', 'meditation', 'time management'],
    author: 'Wellness Blog',
    featured: false
  },
  {
    id: '4',
    title: 'Overcoming Academic Perfectionism',
    description: 'Understanding perfectionism and developing healthier academic mindsets.',
    type: 'blog',
    category: 'academic',
    url: 'https://blog.example.com/perfectionism',
    thumbnail: '🎯',
    rating: 4.6,
    views: 45000,
    isBookmarked: false,
    isFree: true,
    tags: ['perfectionism', 'academic pressure'],
    author: 'Prof. Michael Rodriguez',
    featured: false
  },
  {
    id: '5',
    title: 'Sleep Hygiene Essentials',
    description: 'Essential guide to improving sleep quality for better mental health and academic performance.',
    type: 'pdf',
    category: 'self-care',
    url: '/resources/sleep-guide.pdf',
    thumbnail: '😴',
    rating: 4.7,
    views: 41000,
    isBookmarked: false,
    isFree: true,
    tags: ['sleep', 'health', 'routine'],
    author: 'Health Services',
    featured: false
  },
  {
    id: '6',
    title: 'Managing Study Stress',
    description: 'Video series on effective stress management techniques for academic success.',
    type: 'video',
    category: 'stress',
    url: 'https://youtube.com/watch?v=study-stress',
    thumbnail: '📚',
    duration: '12:45',
    rating: 4.5,
    views: 52000,
    isBookmarked: false,
    isFree: true,
    tags: ['study stress', 'time management'],
    author: 'Academic Success Center',
    featured: false
  },
  {
    id: '7',
    title: 'Building Healthy Relationships',
    description: 'Understanding friendship, romantic relationships, and family dynamics in college.',
    type: 'blog',
    category: 'relationships',
    url: 'https://blog.example.com/healthy-relationships',
    thumbnail: '👥',
    rating: 4.6,
    views: 38000,
    isBookmarked: false,
    isFree: true,
    tags: ['relationships', 'communication'],
    author: 'Campus Counseling',
    featured: false
  },
  {
    id: '8',
    title: 'Depression Support Strategies',
    description: 'Comprehensive video guide on recognizing and managing depression symptoms.',
    type: 'video',
    category: 'depression',
    url: 'https://youtube.com/watch?v=depression-help',
    thumbnail: '💙',
    duration: '18:30',
    rating: 4.8,
    views: 73000,
    isBookmarked: true,
    isFree: true,
    tags: ['depression', 'mental health', 'support'],
    author: 'Dr. Emma Wilson',
    featured: true
  }
];

const ResourcesPage: React.FC = () => {
  const [resources, setResources] = React.useState<Resource[]>(MOCK_RESOURCES);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState<string>('all');
  const [filterCategory, setFilterCategory] = React.useState<string>('all');
  const [showFilters, setShowFilters] = React.useState(false);
  const [userMood, setUserMood] = React.useState(3);

  // Load mood from localStorage on component mount
  React.useEffect(() => {
      // Load mood from localStorage
      const savedMood = localStorage.getItem('userMood');
      if (savedMood) {
        const moodValue = parseInt(savedMood);
        setUserMood(moodValue);
      }
  
      const savedBookmarks = localStorage.getItem('zenU_resource_bookmarks');
      if (savedBookmarks) {
        const bookmarks = JSON.parse(savedBookmarks);
        setResources(prevResources => 
          prevResources.map(resource => ({
            ...resource,
            isBookmarked: bookmarks.includes(resource.id)
          }))
        );
      }
    }, []);
  
    const currentPalette = moodPalettes[userMood];

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video': return Video;
      case 'pdf': return FileText;
      case 'blog': return BookOpen;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: Resource['type']) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'pdf': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'blog': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const filteredResources = resources
    .filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === 'all' || resource.type === filterType;
      const matchesCategory = filterCategory === 'all' || resource.category === filterCategory;
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      // Featured first, then by rating
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });

  const featuredResources = resources.filter(r => r.featured);

  const handleBookmark = (resourceId: string) => {
    const updatedResources = resources.map(resource =>
      resource.id === resourceId
        ? { ...resource, isBookmarked: !resource.isBookmarked }
        : resource
    );
    setResources(updatedResources);
    
    // Save bookmarks to localStorage
    if (typeof window !== 'undefined') {
      const bookmarks = updatedResources.filter(r => r.isBookmarked).map(r => r.id);
      localStorage.setItem('zenU_resource_bookmarks', JSON.stringify(bookmarks));
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
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

  return (
    <div className="min-h-screen fade-in" style={dynamicStyles}>
      <DynamicStyles palette={currentPalette} />
      
      <div className="max-w-6xl mx-auto">
        {/* Mobile Header */}
        <div className="bg-card shadow-sm sticky top-0 z-40 border-b border-border">
          <div className="flex items-center justify-between p-4">
            <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <h1 className="text-lg font-semibold text-foreground">Resources</h1>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 text-muted-foreground hover:bg-muted rounded-lg hover:text-foreground transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-muted rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Mobile Filter Dropdown */}
          {showFilters && (
            <div className="bg-card border-t border-border p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Filters</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full p-2 bg-muted border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="all">All Types</option>
                    <option value="video">Videos</option>
                    <option value="pdf">PDFs</option>
                    <option value="blog">Blogs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full p-2 bg-muted border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="all">All Categories</option>
                    <option value="anxiety">Anxiety</option>
                    <option value="depression">Depression</option>
                    <option value="stress">Stress</option>
                    <option value="mindfulness">Mindfulness</option>
                    <option value="relationships">Relationships</option>
                    <option value="academic">Academic</option>
                    <option value="self-care">Self-Care</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setFilterType('all');
                    setFilterCategory('all');
                    setSearchTerm('');
                  }}
                  className="w-full py-2 text-primary font-medium hover:text-accent-foreground transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:block bg-card p-6 mx-4 mt-4 rounded-lg border border-border">
          <div className="flex flex-wrap gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Types</option>
              <option value="video">Videos</option>
              <option value="pdf">PDFs</option>
              <option value="blog">Blogs</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Categories</option>
              <option value="anxiety">Anxiety</option>
              <option value="depression">Depression</option>
              <option value="stress">Stress</option>
              <option value="mindfulness">Mindfulness</option>
              <option value="relationships">Relationships</option>
              <option value="academic">Academic</option>
              <option value="self-care">Self-Care</option>
              <option value="general">General</option>
            </select>

            <div className="flex-1"></div>
            <span className="text-sm text-muted-foreground py-2">
              {filteredResources.length} resources found
            </span>
          </div>
        </div>

        {/* Featured Resources - Mobile Horizontal Scroll */}
        {featuredResources.length > 0 && (
          <div className="p-4">
            <h2 className="text-xl font-bold text-foreground mb-4">Featured Resources</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
              {featuredResources.map(resource => {
                const TypeIcon = getTypeIcon(resource.type);
                return (
                  <div key={resource.id} className="bg-card rounded-lg p-4 border border-border min-w-[280px] flex-shrink-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-2xl">{resource.thumbnail}</div>
                      <div className="flex-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                          {resource.type.toUpperCase()}
                        </span>
                        <div className="flex items-center space-x-1 mt-1">
                          <div className="flex text-yellow-400">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${star <= Math.floor(resource.rating) ? 'fill-current' : ''}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">({resource.rating})</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2">{resource.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{resource.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        <span>{formatViews(resource.views)}</span>
                        {resource.duration && (
                          <>
                            <Clock className="w-3 h-3 ml-2" />
                            <span>{resource.duration}</span>
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => handleBookmark(resource.id)}
                        className="p-1 text-muted-foreground hover:text-primary transition-colors"
                      >
                        {resource.isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-primary" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Resources List */}
        <div className="p-4">
          <div className="space-y-4">
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No resources found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setFilterCategory('all');
                  }}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredResources.map(resource => {
                const TypeIcon = getTypeIcon(resource.type);
                return (
                  <div key={resource.id} className="bg-card rounded-lg p-4 border border-border hover:border-accent/20 transition-all">
                    <div className="flex space-x-4">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center text-2xl">
                          {resource.thumbnail}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                              <TypeIcon className="w-3 h-3 inline mr-1" />
                              {resource.type.toUpperCase()}
                            </span>
                            {resource.featured && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-full text-xs font-medium">
                                FEATURED
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => handleBookmark(resource.id)}
                            className="p-1 text-muted-foreground hover:text-primary flex-shrink-0 transition-colors"
                          >
                            {resource.isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 text-primary" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        <h3 className="font-semibold text-card-foreground mb-2 leading-tight">{resource.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{resource.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {resource.tags.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                          {resource.tags.length > 2 && (
                            <span className="text-xs text-muted-foreground px-2 py-1">
                              +{resource.tags.length - 2} more
                            </span>
                          )}
                        </div>

                        {/* Bottom Row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <div className="flex text-yellow-400">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <Star
                                    key={star}
                                    className={`w-3 h-3 ${star <= Math.floor(resource.rating) ? 'fill-current' : ''}`}
                                  />
                                ))}
                              </div>
                              <span>({resource.rating})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{formatViews(resource.views)}</span>
                            </div>
                            {resource.duration && (
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{resource.duration}</span>
                              </div>
                            )}
                          </div>

                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                          >
                            <span>View</span>
                             <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Quick Categories - Mobile */}
        <div className="p-4 pb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { category: 'anxiety', icon: '😰', title: 'Anxiety', count: resources.filter(r => r.category === 'anxiety').length },
              { category: 'depression', icon: '💙', title: 'Depression', count: resources.filter(r => r.category === 'depression').length },
              { category: 'stress', icon: '😫', title: 'Stress', count: resources.filter(r => r.category === 'stress').length },
              { category: 'mindfulness', icon: '🧘‍♀️', title: 'Mindfulness', count: resources.filter(r => r.category === 'mindfulness').length }
            ].map(({ category, icon, title, count }) => (
              <button
                key={category}
                onClick={() => {
                  setFilterCategory(category);
                  setSearchTerm('');
                  setShowFilters(false);
                }}
                className="p-3 bg-white rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-sm font-medium text-gray-900">{title}</div>
                <div className="text-xs text-gray-500">{count} resources</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;