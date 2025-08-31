# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GitHub Pages static website (`ry-zen2.github.io`) that implements a "Star Player Awards" voting application for team validation sessions. The project consists of a single self-contained HTML file with embedded CSS and JavaScript.

## Architecture

The application is a client-side web app built as a single HTML file:

- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript
- **Storage**: Uses browser localStorage for data persistence 
- **Styling**: Custom CSS with dark theme, animations, and responsive design
- **Components**: Modal-based interface with multiple views (voting, results, admin)

Key architectural elements:
- Single-page application with view switching
- Event-driven JavaScript architecture
- Local storage for vote persistence and session management
- Responsive grid layouts for team member selection
- Real-time vote tallying and result visualization

## Core Functionality

The app implements a team voting system with:
- Member check-in system using initials
- Anonymous voting for "star player" awards
- Real-time results with vote percentages and rankings
- Admin controls for session management
- MD (Managing Director) dashboard view
- Export functionality for results

## Development

This is a static site with no build process or dependencies. Development workflow:
- Edit `index.html` directly
- Test locally by opening in browser
- Deploy by pushing to GitHub (GitHub Pages automatically serves the site)

No package managers, bundlers, or build tools are used. All functionality is contained within the single HTML file.

## Key Variables and Configuration

Located in the JavaScript section of `index.html:749-751`:
- `ADMIN_PASSWORD`: Controls admin access
- `ADMIN_INITIALS`: Admin user identifier  
- `MD_INITIALS`: Managing Director identifier

## Data Persistence

The application uses localStorage with these keys:
- `starPlayerVotes`: Vote tallies
- `teamMembers`: Team member names  
- `teamInitials`: Name-to-initials mapping
- `checkedInInitials`: Session attendance
- `votedInitials`: Voting participation tracking
- `votingClosed`: Session state