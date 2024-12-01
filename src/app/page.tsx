import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Brain, Clock, Sparkles } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Enhanced Content",
      description: "Transform rough ideas into polished content through our intelligent enhancement pipeline",
      badge: "Real-time tracking"
    },
    {
      icon: <CalendarDays className="w-6 h-6" />,
      title: "Smart Scheduling",
      description: "Plan your content calendar with flexible scheduling options - immediate, scheduled, or recurring",
      badge: "Calendar view"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Queue Management",
      description: "Monitor processing status and estimated completion times for all your content",
      badge: "Live updates"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-16 pb-8 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            BlogStorm <span className="text-blue-600 dark:text-blue-400">UI</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transform your content ideas into publication-ready pieces with AI-powered enhancement
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg">
              Create Content
              <Sparkles className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg">
              View Queue
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    {feature.icon}
                  </div>
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                  {feature.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Status Overview */}
      <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current processing queue and system metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Active Jobs</div>
                <div className="text-2xl font-bold">3</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Queue Length</div>
                <div className="text-2xl font-bold">7</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Est. Wait Time</div>
                <div className="text-2xl font-bold">5min</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Next Slot</div>
                <div className="text-2xl font-bold">12:30</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}