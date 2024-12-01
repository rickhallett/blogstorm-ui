# BlogStorm UI

This is the frontend for [BlogStorm Publish](https://github.com/rickhallett/blogstorm-publish). It provides an interface for submitting content ideas, monitoring their progression through AI enhancement stages, and managing publishing schedules.

## Tech Stack

The application is built with:
- React + TypeScript
- Shadcn UI components 
- TanStack Query for data fetching
- Jest + React Testing Library
- WebSocket for real-time updates

## Getting Started

First, install dependencies:
```bash
npm install
```

Create a `.env.local` file with:
```
LLM_API_URL=http://localhost:3001
PUBLISH_API_URL=http://localhost:3000
```

Start the development server:
```bash
npm run dev
```

## Project Structure

The application is organized into the following directories:

```
src/
├── components/     # Reusable UI components
├── features/      # Main feature implementations
├── hooks/         # Custom React hooks
├── lib/          # Utilities and helpers
├── pages/        # Page components
├── services/     # API integration
└── types/        # TypeScript types
```

## API Integration

The application interacts with two backend services: the Orchestration API and the LLM Pipeline API. Here's how they work together:

### Content Submission
When submitting new content for processing, the UI sends a POST request to `/api/content/submit` with the following structure:

```typescript
interface ContentSubmission {
  content: {
    initialIdeas: string;
    type: 'blog_post';
    preferences: {
      tone: 'casual' | 'professional';
      targetLength: 'short' | 'medium' | 'long';
    };
  };
  scheduling: {
    type: 'immediate' | 'scheduled' | 'recurring';
    publishAt?: string;  // ISO-8601 datetime
    recurrence?: {
      pattern: 'daily' | 'weekly' | 'monthly';
      dayOfWeek?: number;
      timeOfDay: string; // HH:mm format
    };
  };
}
```

### Tracking Content Status
The application maintains real-time content status through two mechanisms:

1. WebSocket Connection: Subscribes to real-time updates about content processing:
```typescript
interface ContentUpdate {
  contentId: string;
  status: 'queued' | 'processing' | 'ready' | 'published' | 'failed';
  currentStage: string;
  progress: {
    completedStages: string[];
    nextStage: string;
    estimatedCompletion: string;
  };
}
```

2. Status Polling: Regular GET requests to `/api/content/status/:id` for detailed status information when WebSocket updates aren't available.

### Queue Management
The UI displays queue information by polling `/api/content/queue`, which returns:
```typescript
interface QueueStatus {
  activeJobs: number;
  queueLength: number;
  estimatedWaitTime: number;
  nextProcessingSlot: string;
}
```

### Schedule Management
Content scheduling is managed through PATCH requests to `/api/content/:id/schedule`:
```typescript
interface ScheduleUpdate {
  newSchedule: {
    publishAt: string;
    recurrence?: {
      pattern: 'daily' | 'weekly' | 'monthly';
      dayOfWeek?: number;
      timeOfDay: string;
    };
  };
}
```

## Development

Run tests:
```bash
npm test              # Run test suite
npm run test:watch    # Watch mode
```

Run linting:
```bash
npm run lint
```

## Features

The application currently provides:

Content Creation:
- Real-time progress tracking of AI enhancements

Schedule Management:
- Calendar interface for content scheduling
- Queue status visualization
- Schedule modification tools