# Trello Clone

A project management app inspired by Trello. Built as a full-stack assessment project.

## What I used

- **Frontend:** React + Vite, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose

## What the app does

- Create and manage boards (like projects)
- Add columns (BoardLists) to each board — e.g. To Do, In Progress, Done
- Add cards (tasks) inside columns
- Move cards between columns
- Assign team members to cards
- Add members to a board
- Delete boards, columns, and cards (with cascade delete)

## Database Design

I went with 4 separate collections:

- **User** — stores name and email
- **Board** — stores name, privacy (PUBLIC/PRIVATE), url, and an array of member user IDs
- **BoardList** — stores name and a reference to its parent Board
- **Card** — stores name, description, a reference to its BoardList, and an optional assigned User

Cards reference their BoardList rather than being embedded, which makes moving cards between lists a simple field update.

## API Endpoints

### Users
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | /api/users | Create a user | { name, email } |
| GET | /api/users | Get all users | — |

### Boards
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | /api/boards | Create a board | { name, privacy } |
| GET | /api/boards | Get all boards | — |
| GET | /api/boards/:id | Get one board | — |
| PUT | /api/boards/:id | Update board | { name, privacy } |
| DELETE | /api/boards/:id | Delete board + its lists + cards | — |
| POST | /api/boards/:id/members | Add user to board | { userId } |

### BoardLists
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | /api/boardlists | Create a boardlist | { name, board } |
| GET | /api/boardlists/board/:boardId | Get all lists for a board | — |
| GET | /api/boardlists/:id | Get one list with its cards | — |
| PUT | /api/boardlists/:id | Update list name | { name } |
| DELETE | /api/boardlists/:id | Delete list + its cards | — |

### Cards
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | /api/cards | Create a card | { name, description, boardList } |
| GET | /api/cards/:id | Get one card | — |
| PUT | /api/cards/:id | Update card | { name, description } |
| DELETE | /api/cards/:id | Delete card | — |
| POST | /api/cards/:id/assign | Assign user to card | { userId } |
| POST | /api/cards/:id/unassign | Unassign user | — |
| POST | /api/cards/:id/move | Move card to another list | { newBoardListId } |

## How to run locally

### Backend
1. Clone the repo and go into the backend folder
2. Run `npm install`
3. Create a `.env` file with your MongoDB connection string and port
4. Run `npm run dev`

### Frontend
1. Go into the frontend folder
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:5173`

## Notes

- Deleting a board cascades and removes all its lists and cards
- Deleting a list removes all cards inside it
- A user can only be assigned to a card if they are already a member of that board
- Board privacy defaults to PUBLIC
- Cards are unassigned by default