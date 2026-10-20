# CHATBOT backend API
Express.js REST for my react chatbot. The API is connected to a PostgreSQL database that is hosted from Supabase.

## Setup

### Install Dependencies

## API endpoints

### GET /
**Response**
{
  "message": "Chatbot API Server 🤖",
  "version": "1.0.0"
}

### GET /api/threads
**REPONSE**
[
  {
    "id": "uuid",
    "title": "Thread title",
    "created_at": "2025-10-13T10:30:00Z"
  }
]