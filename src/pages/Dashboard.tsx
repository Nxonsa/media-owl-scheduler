import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Star, Calendar, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UsabilitySession {
  id: string;
  amount_paid: number;
  session_date: string;
  session_type: string;
  status: string;
  test_url: string;
}

interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
}

interface VideoProgress {
  video_id: string;
  rating: number;
  feedback: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sessions, setSessions] = useState<UsabilitySession[]>([]);
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  const [progress, setProgress] = useState<Record<string, VideoProgress>>({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch usability sessions
    const { data: sessionsData } = await supabase
      .from('usability_sessions')
      .select('*')
      .eq('user_id', user.id);

    if (sessionsData) {
      setSessions(sessionsData);
    }

    // Fetch training videos and progress
    const { data: videosData } = await supabase
      .from('training_videos')
      .select('*');

    if (videosData) {
      setVideos(videosData);

      // Fetch video progress
      const { data: progressData } = await supabase
        .from('video_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressData) {
        const progressMap: Record<string, VideoProgress> = {};
        progressData.forEach((p) => {
          progressMap[p.video_id] = {
            video_id: p.video_id,
            rating: p.rating,
            feedback: p.feedback,
          };
        });
        setProgress(progressMap);
      }
    }
  };

  const handleRateVideo = async (videoId: string, rating: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;

    const { error } = await supabase
      .from('video_progress')
      .upsert({
        user_id: user.id,
        video_id: videoId,
        rating,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save rating",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Rating saved successfully",
      });
      fetchUserData();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Your Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sessions.map((session) => (
                <div key={session.id} className="mb-4 p-4 border rounded-lg">
                  <div className="font-semibold">
                    {new Date(session.session_date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Amount Paid: ${session.amount_paid}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Status: {session.status}
                  </div>
                  {session.test_url && (
                    <div className="mt-2">
                      <a 
                        href={session.test_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        View Test URL
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Training Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {videos.map((video) => (
                <div key={video.id} className="mb-4 p-4 border rounded-lg">
                  <div className="font-semibold">{video.title}</div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {video.description}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRateVideo(video.id, star)}
                        className={`hover:scale-110 transition-transform ${
                          progress[video.id]?.rating >= star 
                            ? 'text-yellow-500' 
                            : 'text-gray-300'
                        }`}
                      >
                        <Star className="h-5 w-5 fill-current" />
                      </button>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(video.url, '_blank')}
                  >
                    Watch Video
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;