# AI Study Assistant

AI Study Assistant is a React web app that helps students understand academic topics quickly. A user enters a study topic, and the app shows a simplified explanation, a multiple-choice quiz question, and a related fun fact.

The product is designed for secondary school students, undergraduate students, and anyone who wants fast, clear study support.

## Features

- Topic input for academic subjects and concepts
- Clear explanation in simple language
- Multiple-choice quiz question
- Four answer options with one correct answer
- Related fun fact
- Loading feedback while content is generated
- Friendly validation and error handling
- Responsive interface for desktop and mobile devices

## MVP Scope

The first version focuses on a simple, accessible learning flow:

1. User enters a topic.
2. App validates the input.
3. App finds or generates study content for the topic.
4. App displays the explanation, quiz, answer, and fun fact.

The MVP does not include user accounts, progress tracking, leaderboards, voice input, multi-language support, or multiple quiz questions.

## Target Users

- Junior secondary school students who need simple explanations of classroom topics
- Senior secondary school students preparing for exams and assignments
- Undergraduate students looking for quick revision and self-assessment

## Tech Stack

- React
- Vite
- CSS
- JavaScript

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## System Flow

```text
User enters topic
        |
        v
Validate input
        |
        v
Find or generate study content
        |
        v
Display explanation, quiz, answer, and fun fact
```

## Main Components

- Header: shows the application title and purpose
- SearchBar: accepts topic input and starts generation
- LoadingScreen: appears while content is being prepared
- ExplanationCard: displays the explanation
- QuizCard: displays the quiz question, options, and answer state
- FunFactCard: displays a related fun fact
- RecentTopics: shows recently explored topics

## Validation Rules

The topic input should:

- Not be empty
- Contain at least 3 characters
- Not exceed 100 characters
- Contain valid text

## Error Handling

The app should handle:

- Empty or invalid topic input
- Missing topic results
- Unexpected response formats

Errors should be clear, friendly, and should allow the user to retry.

## Future Enhancements

- Multiple quiz questions
- Difficulty selection
- Subject categorization
- Topic history
- Bookmark saved topics
- Dark mode
- User accounts
- Learning progress tracking
- Personalized recommendations
- PDF export
- Voice input
- Multi-language support
- AI tutoring chat

## Project Documents

- [PRD.md](./PRD.md): Product requirements, user needs, feature scope, and success metrics
- [TDD.md](./TDD.md): Technical design, system flow, validation, security, and testing strategy
