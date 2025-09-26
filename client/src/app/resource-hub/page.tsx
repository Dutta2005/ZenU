"use client"

import * as React from "react"
import { 
  ArrowLeft, 
  BookOpen, 
  Video, 
  FileText, 
  Headphones, 
  Download,
  ExternalLink,
  Play,
  Clock,
  Star,
  Search,
  Heart,
  Brain,
  Users,
  Smartphone,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import DynamicStyles from "@/components/DynamicStyle"
import { moodPalettes } from '@/lib/constants'
import { useRouter } from "next/navigation"


const resourceCategories = [
  { id: 'all', name: 'All', icon: <BookOpen className="h-4 w-4" /> },
  { id: 'anxiety', name: 'Anxiety', icon: <Brain className="h-4 w-4" /> },
  { id: 'depression', name: 'Depression', icon: <Heart className="h-4 w-4" /> },
  { id: 'stress', name: 'Stress', icon: <Users className="h-4 w-4" /> },
  { id: 'self-care', name: 'Self-Care', icon: <Smartphone className="h-4 w-4" /> }
]

const mockResources = [
  {
    id: 1,
    title: "Understanding Anxiety: A Student's Guide",
    description: "Comprehensive guide covering symptoms, coping strategies, and when to seek help for anxiety disorders.",
    type: "pdf",
    category: "anxiety",
    duration: "15 min read",
    rating: 4.8,
    downloads: "2.3k",
    author: "Dr. Sarah Johnson",
    thumbnail: "📄",
    featured: true
  },
  {
    id: 2,
    title: "Mindfulness Exercises for Daily Practice",
    description: "Collection of evidence-based mindfulness techniques for stress reduction and emotional regulation.",
    type: "pdf",
    category: "stress",
    duration: "8 min read",
    rating: 4.6,
    downloads: "1.8k",
    author: "Mindfulness Research Center",
    thumbnail: "🧘"
  },
  {
    id: 3,
    title: "Breathing Techniques for Panic Attacks",
    description: "Learn practical breathing exercises to manage panic attacks and acute anxiety episodes.",
    type: "video",
    category: "anxiety",
    duration: "12:34",
    rating: 4.9,
    views: "45k",
    author: "Mental Health First Aid",
    thumbnail: "🎥",
    featured: true
  },
  {
    id: 4,
    title: "Building Resilience in College",
    description: "Expert tips on developing emotional resilience and bouncing back from academic and personal challenges.",
    type: "video",
    category: "stress",
    duration: "18:45",
    rating: 4.7,
    views: "28k",
    author: "Campus Wellness Initiative",
    thumbnail: "💪"
  },
  {
    id: 5,
    title: "10 Signs You Might Be Experiencing Depression",
    description: "Recognizing the early warning signs and understanding when it's time to reach out for professional support.",
    type: "article",
    category: "depression",
    duration: "6 min read",
    rating: 4.5,
    views: "12k",
    author: "University Health Services",
    thumbnail: "📝",
    featured: true
  },
  {
    id: 6,
    title: "Creating a Self-Care Routine That Actually Works",
    description: "Practical strategies for building sustainable self-care habits that fit into a busy student lifestyle.",
    type: "article",
    category: "self-care",
    duration: "5 min read",
    rating: 4.4,
    views: "8.2k",
    author: "Student Wellness Blog",
    thumbnail: "✨"
  },
  {
    id: 7,
    title: "Sleep Meditation for Students",
    description: "Guided meditation specifically designed to help students relax and improve sleep quality.",
    type: "audio",
    category: "self-care",
    duration: "25:00",
    rating: 4.8,
    plays: "15k",
    author: "Campus Calm Collective",
    thumbnail: "🎧"
  },
  {
    id: 8,
    title: "Managing Academic Pressure",
    description: "Podcast episode discussing strategies for handling academic stress and maintaining mental health.",
    type: "audio",
    category: "stress",
    duration: "32:15",
    rating: 4.6,
    plays: "9.4k",
    author: "Student Mental Health Podcast",
    thumbnail: "🎙️"
  }
]

export default function MentalHealthResources() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [showAllCategories, setShowAllCategories] = React.useState(false)
  const [userMood, setUserMood] = React.useState(3) // Default to Neutral mood
  
  // Filter resources based on category and search
  const filteredResources = mockResources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  React.useEffect(() => {
    // Try to get the user's current mood from localStorage
    const savedMood = localStorage.getItem('userMood')
    if (savedMood) {
      setUserMood(parseInt(savedMood))
    }
  }, [])

  const currentPalette = moodPalettes[userMood]

  const featuredResources = mockResources.filter(resource => resource.featured)

  const getResourceIcon = (type: any) => {
    switch (type) {
      case 'pdf':
      case 'worksheet':
        return <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
      case 'video':
        return <Video className="h-3 w-3 sm:h-4 sm:w-4" />
      case 'article':
        return <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
      case 'audio':
        return <Headphones className="h-3 w-3 sm:h-4 sm:w-4" />
      default:
        return <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
    }
  }

  const getResourceAction = (resource: any) => {
    const iconClass = "h-3 w-3 mr-1"
    const buttonClass = "text-xs px-2 py-1 h-auto"
    
    switch (resource.type) {
      case 'pdf':
      case 'worksheet':
        return (
          <Button size="sm" variant="outline" className={buttonClass}>
            <Download className={iconClass} />
            <span className="hidden sm:inline">Download</span>
            <span className="sm:hidden">Get</span>
          </Button>
        )
      case 'video':
        return (
          <Button size="sm" variant="outline" className={buttonClass}>
            <Play className={iconClass} />
            <span className="hidden sm:inline">Watch</span>
            <span className="sm:hidden">Play</span>
          </Button>
        )
      case 'article':
        return (
          <Button size="sm" variant="outline" className={buttonClass}>
            <BookOpen className={iconClass} />
            Read
          </Button>
        )
      case 'audio':
        return (
          <Button size="sm" variant="outline" className={buttonClass}>
            <Play className={iconClass} />
            <span className="hidden sm:inline">Listen</span>
            <span className="sm:hidden">Play</span>
          </Button>
        )
      default:
        return (
          <Button size="sm" variant="outline" className={buttonClass}>
            <ExternalLink className={iconClass} />
            Open
          </Button>
        )
    }
  }

  const getResourceStats = (resource: any) => {
    if (resource.downloads) return `${resource.downloads} downloads`
    if (resource.views) return `${resource.views} views`
    if (resource.plays) return `${resource.plays} plays`
    return ''
  }

  // Show only first 3 categories on mobile unless expanded
  const visibleCategories = showAllCategories ? resourceCategories : resourceCategories.slice(0, 3)
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
    } as React.CSSProperties

  return (
    <div className="min-h-screen fade-in" style={dynamicStyles}>
      <DynamicStyles palette={currentPalette} />
      
      {/* Header - Mobile Optimized */}
      <div className="content-safe flex items-center space-x-4 py-4 sm:py-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full text-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-headline text-primary font-semibold">Mental Health Resources</h1>
          <p className="text-caption text-primary">Tools for your wellbeing journey</p>
        </div>
      </div>

      {/* Search and Filter - Mobile Optimized */}
      <section className="content-safe pt-4 pb-4 sm:pb-6">
        <div className="space-y-3 sm:space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/30" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-primary-foreground border border-primary/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            />
          </div>

          {/* Category Filter - Mobile Responsive */}
          <div className="space-y-2">
            <div className="flex items-center justify-between sm:hidden">
              <span className="text-sm font-medium text-foreground">Categories</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="text-primary h-auto p-1"
              >
                <span className="text-xs mr-1">
                  {showAllCategories ? 'Show Less' : 'Show All'}
                </span>
                <ChevronDown className={`h-3 w-3 transition-transform ${showAllCategories ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            
            {/* Desktop: Horizontal scroll, Mobile: Grid layout */}
            <div className="hidden sm:flex sm:space-x-2 sm:overflow-x-auto sm:pb-2 category-scroll">
              {resourceCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2 whitespace-nowrap bg-background hover:bg-primary/90 border-primary/70 text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-muted"
                  data-state={selectedCategory === category.id ? "active" : "inactive"}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>

            {/* Mobile: Grid layout */}
            <div className="grid grid-cols-2 gap-2 sm:hidden">
              {visibleCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center justify-center space-x-2 py-3 px-3 text-xs ${
                    selectedCategory === category.id 
                      ? 'bg-primary text-muted border-primary' 
                      : 'bg-background text-foreground border-background hover:bg-muted hover:text-muted-foreground'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </Button>
              ))}
              
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources - Mobile Optimized */}
      {selectedCategory === 'all' && featuredResources.length > 0 && (
        <section className="content-safe pb-4 sm:pb-6">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold text-foreground flex items-center space-x-2">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
              <span>Featured</span>
            </h2>
            
            <div className="grid gap-3 sm:gap-4">
              {featuredResources.map((resource) => (
                <Card key={resource.id} className="bg-background rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="text-2xl sm:text-3xl shrink-0">{resource.thumbnail}</div>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2">{resource.title}</h3>
                          <div className="flex items-center space-x-1 shrink-0">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-primary">{resource.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-primary line-clamp-2 sm:line-clamp-3">{resource.description}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-primary/70">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{resource.duration}</span>
                          </span>
                          <span className="hidden sm:inline">{getResourceStats(resource)}</span>
                          <span className="text-xs text-primary/70 line-clamp-1">by {resource.author}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-primary/90">
                      <div className="flex items-center space-x-2">
                        {getResourceIcon(resource.type)}
                        <span className="text-xs text-primary/70 capitalize">{resource.type}</span>
                      </div>
                      {getResourceAction(resource)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Resources - Mobile Optimized */}
      <section className="content-safe pb-6 sm:pb-8">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">
              {selectedCategory === 'all' ? 'All Resources' : `${resourceCategories.find(cat => cat.id === selectedCategory)?.name} Resources`}
            </h2>
            <span className="text-xs sm:text-sm text-primary/70">
              {filteredResources.length} resources
            </span>
          </div>

          <div className="grid gap-2 sm:gap-3">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="bg-background rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="text-xl sm:text-2xl shrink-0">{resource.thumbnail}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-medium text-sm text-primary line-clamp-2">{resource.title}</h3>
                        <div className="flex items-center space-x-1 shrink-0">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-primary/70">{resource.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-primary/70 line-clamp-2 mb-2">{resource.description}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-primary/70">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{resource.duration}</span>
                        </span>
                        <span className="hidden sm:inline">{getResourceStats(resource)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-primary/90">
                    <div className="flex items-center space-x-2">
                      {getResourceIcon(resource.type)}
                      <span className="text-xs text-primary/70 capitalize">{resource.type}</span>
                      <span className="text-xs text-primary bg-muted px-2 py-1 rounded-full capitalize">
                        {resource.category.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="shrink-0">
                      {getResourceAction(resource)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
              <h3 className="text-base sm:text-lg font-medium text-primary mb-2">No resources found</h3>
              <p className="text-sm text-primary/70 px-4">
                Try adjusting your search or selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Help Footer - Mobile Optimized */}
      <section className="content-safe pb-6 sm:pb-8">
        <Card className="bg-background rounded-lg border-primary/90">
          <div className="p-4 sm:p-6 text-center space-y-2 sm:space-y-3">
            <div className="text-xl sm:text-2xl">💡</div>
            <h3 className="font-medium text-foreground text-sm sm:text-base">Can't find what you're looking for?</h3>
            <p className="text-xs sm:text-sm text-primary/70 px-2">
              Reach out to your campus counseling center for personalized resource recommendations
            </p>
            <Button variant="outline" size="sm" className="bg-background hover:bg-background/50 border-primary/90 text-foreground mt-3">
              <ExternalLink className="h-3 w-3 mr-2" />
              <span className="text-xs sm:text-sm">Contact Campus Support</span>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  )
}