'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Phone, 
  BookOpen, 
  UserPlus,
  Calendar,
  Activity,
  Heart,
  Brain,
  Shield,
  Clock,
  MapPin,
  Mail,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const UniversityAdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [resources, setResources] = useState([
    { id: 1, title: 'Mental Health Helpline', type: 'Hotline', contact: '1800-123-4567', status: 'Active' },
    { id: 2, title: 'Counseling Center', type: 'In-Person', contact: 'counseling@university.edu', status: 'Active' },
    { id: 3, title: 'Crisis Support Chat', type: 'Online', contact: 'Available 24/7', status: 'Active' }
  ]);
  const [counselors, setCounselors] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Anxiety & Depression', availability: 'Mon-Fri 9AM-5PM', caseLoad: 45 },
    { id: 2, name: 'Prof. Michael Chen', specialization: 'Academic Stress', availability: 'Mon-Wed 10AM-6PM', caseLoad: 38 },
    { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Crisis Intervention', availability: 'On-call 24/7', caseLoad: 28 }
  ]);

  // Mock data for charts
  const weeklyEngagementData = [
    { day: 'Mon', sessions: 45, assessments: 23, chatbot: 67 },
    { day: 'Tue', sessions: 52, assessments: 31, chatbot: 74 },
    { day: 'Wed', sessions: 38, assessments: 28, chatbot: 82 },
    { day: 'Thu', sessions: 49, assessments: 35, chatbot: 69 },
    { day: 'Fri', sessions: 41, assessments: 29, chatbot: 71 },
    { day: 'Sat', sessions: 28, assessments: 18, chatbot: 45 },
    { day: 'Sun', sessions: 22, assessments: 15, chatbot: 38 }
  ];

  const moodDistributionData = [
    { mood: 'Very Good', count: 145, color: '#22c55e' },
    { mood: 'Good', count: 189, color: '#84cc16' },
    { mood: 'Neutral', count: 234, color: '#eab308' },
    { mood: 'Poor', count: 98, color: '#f97316' },
    { mood: 'Very Poor', count: 45, color: '#ef4444' }
  ];

  const monthlyTrendsData = [
    { month: 'Jan', anxiety: 65, depression: 45, stress: 78, wellness: 72 },
    { month: 'Feb', anxiety: 58, depression: 42, stress: 73, wellness: 75 },
    { month: 'Mar', anxiety: 62, depression: 48, stress: 85, wellness: 68 },
    { month: 'Apr', anxiety: 55, depression: 39, stress: 79, wellness: 78 },
    { month: 'May', anxiety: 52, depression: 36, stress: 82, wellness: 81 },
    { month: 'Jun', anxiety: 48, depression: 33, stress: 76, wellness: 84 }
  ];

  const crisisIndicatorsData = [
    { indicator: 'High Risk', count: 12, color: '#ef4444' },
    { indicator: 'Medium Risk', count: 34, color: '#f97316' },
    { indicator: 'Low Risk', count: 67, color: '#eab308' },
    { indicator: 'No Risk', count: 598, color: '#22c55e' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">University Mental Health Dashboard</h1>
          <p className="text-gray-600">Anonymous mental health analytics and management portal</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Students</p>
                  <p className="text-3xl font-bold">2,847</p>
                </div>
                <Users className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Active Sessions</p>
                  <p className="text-3xl font-bold">156</p>
                </div>
                <Activity className="w-12 h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Crisis Alerts</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <AlertTriangle className="w-12 h-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Wellness Score</p>
                  <p className="text-3xl font-bold">7.8/10</p>
                </div>
                <Heart className="w-12 h-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 lg:grid-cols-5 h-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Resource Hub
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Emergency
            </TabsTrigger>
            <TabsTrigger value="counselors" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Counselors
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Engagement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Weekly Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyEngagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sessions" fill="#3b82f6" name="Counseling Sessions" />
                      <Bar dataKey="assessments" fill="#10b981" name="Assessments" />
                      <Bar dataKey="chatbot" fill="#8b5cf6" name="AI Chatbot" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Mood Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Current Mood Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={moodDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="count"
                      >
                        {moodDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {moodDistributionData.map((item, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        {item.mood}: {item.count}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Crisis Risk Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Crisis Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {crisisIndicatorsData.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold text-lg mb-2" style={{ backgroundColor: item.color }}>
                        {item.count}
                      </div>
                      <p className="font-semibold">{item.indicator}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Monthly Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Mental Health Trends (6 Months)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={monthlyTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="anxiety" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="depression" stackId="2" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="stress" stackId="3" stroke="#eab308" fill="#eab308" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="wellness" stackId="4" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Detailed Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Peak Usage Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>2PM - 4PM</span>
                        <Badge>Peak</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>10PM - 12AM</span>
                        <Badge variant="outline">High</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>6AM - 8AM</span>
                        <Badge variant="secondary">Low</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Top Concerns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Academic Stress</span>
                        <span className="font-semibold">42%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Anxiety</span>
                        <span className="font-semibold">31%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Depression</span>
                        <span className="font-semibold">18%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Engagement Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>AI Chatbot</span>
                        <span className="font-semibold">89%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Self Assessment</span>
                        <span className="font-semibold">67%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Counseling</span>
                        <span className="font-semibold">45%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Resource Hub Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Mental Health Resources
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Resource
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Resource</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Resource Title" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Resource Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="article">Article</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="hotline">Hotline</SelectItem>
                            <SelectItem value="app">Mobile App</SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea placeholder="Description" />
                        <Input placeholder="Contact/Link" />
                        <Button className="w-full">Add Resource</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{resource.title}</h3>
                        <p className="text-sm text-gray-600">{resource.contact}</p>
                        <Badge variant="outline" className="mt-1">{resource.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={resource.status === 'Active' ? 'default' : 'secondary'}>
                          {resource.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        12 high-risk students require immediate attention
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold">Crisis Hotline</p>
                          <p className="text-sm text-gray-600">1-800-273-8255</p>
                        </div>
                        <Badge>24/7</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold">Campus Security</p>
                          <p className="text-sm text-gray-600">555-0123</p>
                        </div>
                        <Badge>Available</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-semibold">Emergency Services</p>
                          <p className="text-sm text-gray-600">911</p>
                        </div>
                        <Badge variant="destructive">Emergency</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Crisis Response Protocol
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">1</div>
                      <p>Immediate risk assessment</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">2</div>
                      <p>Contact emergency services if needed</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center font-bold">3</div>
                      <p>Notify assigned counselor</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">4</div>
                      <p>Follow-up within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Counselors Tab */}
          <TabsContent value="counselors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Counselor Management
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        Add Counselor
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Counselor</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input placeholder="Full Name" />
                        <Input placeholder="Email Address" />
                        <Input placeholder="Specialization" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fulltime">Full-time</SelectItem>
                            <SelectItem value="parttime">Part-time</SelectItem>
                            <SelectItem value="oncall">On-call</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button className="w-full">Add Counselor</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {counselors.map((counselor) => (
                    <div key={counselor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{counselor.name}</h3>
                        <p className="text-sm text-gray-600">{counselor.specialization}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {counselor.availability}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {counselor.caseLoad} cases
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UniversityAdminDashboard;