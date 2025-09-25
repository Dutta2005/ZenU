'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Plus, 
  Heart, 
  MessageCircle, 
  Share2, 
  Flag,
  Search,
  Filter,
  Users,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Send,
  X,
  User,
  Shield,
  Bookmark,
  BookmarkCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import DynamicStyles from '@/components/DynamicStyle';
import { moodPalettes } from '@/lib/constants';

interface SupportPost {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  isAnonymous: boolean;
  title: string;
  content: string;
  category: 'anxiety' | 'depression' | 'stress' | 'relationships' | 'general' | 'success';
  tags: string[];
  likes: number;
  dislikes: number;
  commentCount: number;
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  avatar: string;
  isAnonymous: boolean;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
}

// Mock users data
const MOCK_USERS = {
  'user1': { username: 'SunshineSeeker', avatar: '🌻' },
  'user2': { username: 'QuietStrength', avatar: '🌙' },
  'user3': { username: 'WaveRider', avatar: '🌊' },
  'user4': { username: 'MountainClimber', avatar: '⛰️' },
  'user5': { username: 'PeacefulMind', avatar: '🕊️' },
  'user6': { username: 'RisingPhoenix', avatar: '🔥' },
  'user7': { username: 'GentleBreeze', avatar: '🍃' },
  'user8': { username: 'StarGazer', avatar: '⭐' },
  'current': { username: 'You', avatar: '😊' }
};

// Mock posts data
const MOCK_POSTS: SupportPost[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'SunshineSeeker',
    avatar: '🌻',
    isAnonymous: false,
    title: 'Finally had a good day after weeks of struggling',
    content: 'I wanted to share some hope with everyone here. After dealing with anxiety for the past month, today I managed to go grocery shopping, call a friend, and even took a short walk. Small victories, but they feel huge right now. To anyone struggling - it does get better, even if it\'s just for a day.',
    category: 'success',
    tags: ['anxiety', 'hope', 'small wins', 'recovery'],
    likes: 127,
    dislikes: 2,
    commentCount: 23,
    isBookmarked: false,
    createdAt: '2025-09-25T10:30:00Z',
    updatedAt: '2025-09-25T10:30:00Z'
  },
  {
    id: '2',
    userId: 'user2',
    username: 'Anonymous',
    avatar: '👤',
    isAnonymous: true,
    title: 'Struggling with social anxiety at work',
    content: 'I\'ve been at my new job for 3 months now and I still get panic attacks before meetings. I feel like everyone thinks I\'m incompetent. Has anyone dealt with workplace anxiety? How did you cope? I\'m considering talking to my manager but I\'m scared it will affect my career.',
    category: 'anxiety',
    tags: ['work anxiety', 'panic attacks', 'social anxiety', 'career'],
    likes: 89,
    dislikes: 0,
    commentCount: 31,
    isBookmarked: true,
    createdAt: '2025-09-24T16:45:00Z',
    updatedAt: '2025-09-24T16:45:00Z'
  },
  {
    id: '3',
    userId: 'user3',
    username: 'WaveRider',
    avatar: '🌊',
    isAnonymous: false,
    title: 'Meditation changed my relationship with negative thoughts',
    content: 'I used to fight my anxious thoughts, which only made them stronger. Through mindfulness meditation, I learned to observe them like clouds passing in the sky. They\'re still there sometimes, but they don\'t control me anymore. If you\'re new to meditation, start with just 5 minutes. The Headspace app helped me get started.',
    category: 'general',
    tags: ['meditation', 'mindfulness', 'negative thoughts', 'apps'],
    likes: 156,
    dislikes: 5,
    commentCount: 18,
    isBookmarked: false,
    createdAt: '2025-09-24T09:15:00Z',
    updatedAt: '2025-09-24T09:15:00Z'
  },
  {
    id: '4',
    userId: 'user4',
    username: 'Anonymous',
    avatar: '👤',
    isAnonymous: true,
    title: 'Feeling like a burden to my family',
    content: 'My depression has been really bad lately and I feel like I\'m just dragging everyone down. My partner tries to be supportive but I can see the exhaustion in their eyes. I don\'t know how to ask for help without feeling guilty. Sometimes I think they\'d be better off without me.',
    category: 'depression',
    tags: ['depression', 'family', 'guilt', 'relationships'],
    likes: 73,
    dislikes: 1,
    commentCount: 42,
    isBookmarked: false,
    createdAt: '2025-09-23T20:30:00Z',
    updatedAt: '2025-09-23T20:30:00Z'
  },
  {
    id: '5',
    userId: 'user5',
    username: 'PeacefulMind',
    avatar: '🕊️',
    isAnonymous: false,
    title: 'How I learned to set boundaries with toxic family',
    content: 'Growing up in a family where emotions were dismissed was tough. I spent years in therapy learning that setting boundaries isn\'t selfish - it\'s necessary for mental health. It was scary at first, but now I can visit family without feeling drained. Remember: you can love someone and still protect your peace.',
    category: 'relationships',
    tags: ['boundaries', 'family', 'therapy', 'self-care'],
    likes: 203,
    dislikes: 12,
    commentCount: 35,
    isBookmarked: true,
    createdAt: '2025-09-23T14:20:00Z',
    updatedAt: '2025-09-23T14:20:00Z'
  },
  {
    id: '6',
    userId: 'user6',
    username: 'RisingPhoenix',
    avatar: '🔥',
    isAnonymous: false,
    title: 'One year clean from self-harm - what I wish I knew earlier',
    content: 'Today marks one year since I last hurt myself. It wasn\'t a straight path - there were relapses and dark days. What helped most was finding healthier coping mechanisms: ice cubes on my skin, intense exercise, and creative outlets. To anyone struggling with self-harm: you\'re not broken, you\'re human. Please reach out for professional help.',
    category: 'success',
    tags: ['self-harm', 'recovery', 'coping strategies', 'one year'],
    likes: 245,
    dislikes: 3,
    commentCount: 67,
    isBookmarked: false,
    createdAt: '2025-09-22T11:00:00Z',
    updatedAt: '2025-09-22T11:00:00Z'
  },
  {
    id: '7',
    userId: 'user7',
    username: 'GentleBreeze',
    avatar: '🍃',
    isAnonymous: false,
    title: 'College stress is overwhelming - any tips?',
    content: 'I\'m a sophomore and this semester feels impossible. Between classes, part-time work, and social pressures, I barely sleep. My grades are slipping and I feel like I\'m failing at everything. My parents have high expectations and I don\'t want to disappoint them. How do you manage when everything feels too much?',
    category: 'stress',
    tags: ['college', 'stress', 'overwhelmed', 'parents', 'grades'],
    likes: 94,
    dislikes: 0,
    commentCount: 28,
    isBookmarked: false,
    createdAt: '2025-09-21T19:45:00Z',
    updatedAt: '2025-09-21T19:45:00Z'
  },
  {
    id: '8',
    userId: 'user8',
    username: 'StarGazer',
    avatar: '⭐',
    isAnonymous: false,
    title: 'Finding purpose after losing my job',
    content: 'Got laid off last month and it hit me harder than expected. I defined myself by my career and now I feel lost. But I\'m trying to see this as an opportunity to reassess what really matters. Started volunteering at an animal shelter and it\'s giving me a sense of purpose. Sometimes life forces us to find new directions.',
    category: 'general',
    tags: ['job loss', 'purpose', 'volunteering', 'career change'],
    likes: 118,
    dislikes: 2,
    commentCount: 22,
    isBookmarked: true,
    createdAt: '2025-09-21T08:30:00Z',
    updatedAt: '2025-09-21T08:30:00Z'
  }
];

// Mock comments data
const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    postId: '1',
    userId: 'user3',
    username: 'WaveRider',
    avatar: '🌊',
    isAnonymous: false,
    content: 'This gives me so much hope! I\'ve been having a tough week and needed to hear this. Thank you for sharing your victory with us. 💙',
    likes: 15,
    dislikes: 0,
    createdAt: '2025-09-25T11:00:00Z'
  },
  {
    id: '2',
    postId: '1',
    userId: 'user5',
    username: 'PeacefulMind',
    avatar: '🕊️',
    isAnonymous: false,
    content: 'Small victories are still victories! I celebrate every time I manage to do something that felt impossible yesterday. You should be proud of yourself. 🌟',
    likes: 23,
    dislikes: 0,
    createdAt: '2025-09-25T11:30:00Z'
  },
  {
    id: '3',
    postId: '2',
    userId: 'user6',
    username: 'Anonymous',
    avatar: '👤',
    isAnonymous: true,
    content: 'I could have written this myself. I\'ve found that talking to a trusted colleague first can help gauge the workplace culture around mental health. Some companies are more supportive than you\'d expect.',
    likes: 31,
    dislikes: 1,
    createdAt: '2025-09-24T17:15:00Z'
  }
];

const PeerSupportPage: React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = React.useState<SupportPost[]>(MOCK_POSTS);
  const [comments, setComments] = React.useState<Comment[]>(MOCK_COMMENTS);
  const [currentView, setCurrentView] = React.useState<'feed' | 'create' | 'post-detail'>('feed');
  const [selectedPost, setSelectedPost] = React.useState<SupportPost | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState<string>('all');
  const [sortBy, setSortBy] = React.useState<'recent' | 'popular'>('recent');

  // Form state for creating posts
  const [newPost, setNewPost] = React.useState({
    title: '',
    content: '',
    category: 'general' as SupportPost['category'],
    tags: [] as string[],
    isAnonymous: false
  });
  const [newTag, setNewTag] = React.useState('');
  const [newComment, setNewComment] = React.useState('');

  // Get current mood theme
  const [userMood, setUserMood] = React.useState(3);

  React.useEffect(() => {
    const savedMood = localStorage.getItem('userMood');
    if (savedMood) {
      setUserMood(parseInt(savedMood));
    }

    // Load posts and comments from localStorage if available
    const savedPosts = localStorage.getItem('zenU_support_posts');
    const savedComments = localStorage.getItem('zenU_support_comments');
    
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      localStorage.setItem('zenU_support_posts', JSON.stringify(MOCK_POSTS));
    }
    
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      localStorage.setItem('zenU_support_comments', JSON.stringify(MOCK_COMMENTS));
    }
  }, []);

  const currentPalette = moodPalettes[userMood];

  const savePosts = (newPosts: SupportPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('zenU_support_posts', JSON.stringify(newPosts));
  };

  const saveComments = (newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem('zenU_support_comments', JSON.stringify(newComments));
  };

  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.likes - b.dislikes) - (a.likes - a.dislikes);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'anxiety': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'depression': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'stress': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'relationships': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const handleLike = (postId: string, isPost: boolean = true) => {
    if (isPost) {
      const updatedPosts = posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      );
      savePosts(updatedPosts);
    }
  };

  const handleBookmark = (postId: string) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    );
    savePosts(updatedPosts);
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    const now = new Date().toISOString();
    const post: SupportPost = {
      id: Date.now().toString(),
      userId: 'current',
      username: newPost.isAnonymous ? 'Anonymous' : 'You',
      avatar: newPost.isAnonymous ? '👤' : '😊',
      isAnonymous: newPost.isAnonymous,
      title: newPost.title.trim(),
      content: newPost.content.trim(),
      category: newPost.category,
      tags: newPost.tags,
      likes: 0,
      dislikes: 0,
      commentCount: 0,
      isBookmarked: false,
      createdAt: now,
      updatedAt: now
    };

    savePosts([post, ...posts]);
    setNewPost({
      title: '',
      content: '',
      category: 'general',
      tags: [],
      isAnonymous: false
    });
    setCurrentView('feed');
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedPost) return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId: selectedPost.id,
      userId: 'current',
      username: 'You',
      avatar: '😊',
      isAnonymous: false,
      content: newComment.trim(),
      likes: 0,
      dislikes: 0,
      createdAt: new Date().toISOString()
    };

    saveComments([...comments, comment]);
    
    // Update comment count on post
    const updatedPosts = posts.map(post => 
      post.id === selectedPost.id 
        ? { ...post, commentCount: post.commentCount + 1 }
        : post
    );
    savePosts(updatedPosts);
    setNewComment('');
  };

  const handleAddTag = () => {
    if (newTag.trim() && !newPost.tags.includes(newTag.trim())) {
      setNewPost({
        ...newPost,
        tags: [...newPost.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
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

  const renderFeed = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Peer Support Community</h1>
          <p className="text-muted-foreground">Share your experiences and support others on their journey</p>
        </div>
        <button
          onClick={() => setCurrentView('create')}
          className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Community Guidelines */}
      <div className="bg-card rounded-lg p-4 border border-accent/20">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-card-foreground">Community Guidelines</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          This is a safe space for sharing experiences and supporting each other. Be kind, respectful, and remember that everyone is fighting their own battles. If you're in crisis, please seek immediate professional help.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-lg p-4 space-y-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Categories</option>
            <option value="anxiety">Anxiety</option>
            <option value="depression">Depression</option>
            <option value="stress">Stress</option>
            <option value="relationships">Relationships</option>
            <option value="success">Success Stories</option>
            <option value="general">General</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'popular')}
            className="px-4 py-2 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Be the first to share your story and support others'
              }
            </p>
            <button
              onClick={() => setCurrentView('create')}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Share Your Story
            </button>
          </div>
        ) : (
          filteredPosts.map(post => (
            <div key={post.id} className="bg-card rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow">
              {/* Post Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-lg">
                    {post.avatar}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-card-foreground">{post.username}</h4>
                      {post.isAnonymous && (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(post.createdAt)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBookmark(post.id)}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  >
                    {post.isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-primary" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-red-500 hover:bg-muted rounded-lg transition-colors">
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Post Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-card-foreground">{post.title}</h3>
                <p className="text-card-foreground leading-relaxed">{post.content}</p>
                
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setCurrentView('post-detail');
                    }}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{post.commentCount}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Heart className="w-3 h-3 text-red-500" />
                  <span>{post.likes} supporters</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderCreatePost = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Share Your Story</h1>
          <p className="text-muted-foreground">Your experience might help someone else feel less alone</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleCreatePost}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button
            onClick={() => setCurrentView('feed')}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card rounded-lg p-6 space-y-6">
        {/* Anonymous Toggle */}
        <div className="flex items-center justify-between p-4 bg-accent/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <EyeOff className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-card-foreground">Post Anonymously</h3>
              <p className="text-sm text-muted-foreground">Your identity will be hidden from other users</p>
            </div>
          </div>
          <button
            onClick={() => setNewPost({ ...newPost, isAnonymous: !newPost.isAnonymous })}
            className={`w-12 h-6 rounded-full transition-colors ${
              newPost.isAnonymous ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              newPost.isAnonymous ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Category
          </label>
          <select
            value={newPost.category}
            onChange={(e) => setNewPost({ ...newPost, category: e.target.value as SupportPost['category'] })}
            className="w-full px-4 py-3 bg-muted rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="general">General Support</option>
            <option value="anxiety">Anxiety</option>
            <option value="depression">Depression</option>
            <option value="stress">Stress & Overwhelm</option>
            <option value="relationships">Relationships</option>
            <option value="success">Success Story</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Title
          </label>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Give your post a meaningful title..."
            className="w-full px-4 py-3 bg-muted rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Share Your Experience
          </label>
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            placeholder="Share your thoughts, experiences, or ask for support. Remember, your story might help someone else feel less alone..."
            rows={8}
            className="w-full px-4 py-3 bg-muted rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Tags (optional)
          </label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder="Add relevant tags..."
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
            {newPost.tags.map(tag => (
              <span
                key={tag}
                className="flex items-center space-x-1 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
              >
                <span>#{tag}</span>
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

        {/* Guidelines Reminder */}
        <div className="bg-accent/20 rounded-lg p-4">
          <h4 className="font-semibold text-card-foreground mb-2">Posting Guidelines</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Be respectful and supportive of others</li>
            <li>• Share your authentic experiences</li>
            <li>• Avoid giving medical advice</li>
            <li>• If in crisis, please seek immediate professional help</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderPostDetail = () => {
    if (!selectedPost) return null;

    const postComments = comments.filter(c => c.postId === selectedPost.id);

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView('feed')}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Discussion</h1>
            <p className="text-muted-foreground">Join the conversation</p>
          </div>
        </div>

        {/* Original Post */}
        <div className="bg-card rounded-lg p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                {selectedPost.avatar}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-card-foreground">{selectedPost.username}</h4>
                  {selectedPost.isAnonymous && (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeAgo(selectedPost.createdAt)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedPost.category)}`}>
                    {selectedPost.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-card-foreground">{selectedPost.title}</h2>
            <p className="text-card-foreground leading-relaxed whitespace-pre-wrap">{selectedPost.content}</p>
            
            {selectedPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4 pt-4 border-t border-border">
            <button
              onClick={() => handleLike(selectedPost.id)}
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm font-medium">{selectedPost.likes}</span>
            </button>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{postComments.length} comments</span>
            </div>
          </div>
        </div>

        {/* Add Comment */}
        <div className="bg-card rounded-lg p-4 space-y-4">
          <h3 className="font-semibold text-card-foreground">Add a supportive comment</h3>
          <div className="flex space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              😊
            </div>
            <div className="flex-1 space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts, support, or similar experiences..."
                rows={3}
                className="w-full px-4 py-3 bg-muted rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>Comment</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Comments ({postComments.length})
          </h3>
          
          {postComments.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h4 className="font-semibold text-foreground mb-2">No comments yet</h4>
              <p className="text-muted-foreground">Be the first to offer support or share your experience</p>
            </div>
          ) : (
            postComments
              .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
              .map(comment => (
                <div key={comment.id} className="bg-card rounded-lg p-4 space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-semibold text-card-foreground text-sm">{comment.username}</h5>
                        <span className="text-xs text-muted-foreground">{formatTimeAgo(comment.createdAt)}</span>
                      </div>
                      <p className="text-card-foreground leading-relaxed">{comment.content}</p>
                      <div className="flex items-center space-x-2 mt-3">
                        <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          <span className="text-xs">{comment.likes}</span>
                        </button>
                        <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
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

        {currentView === 'feed' && renderFeed()}
        {currentView === 'create' && renderCreatePost()}
        {currentView === 'post-detail' && renderPostDetail()}
      </div>
    </div>
  );
};

export default PeerSupportPage;