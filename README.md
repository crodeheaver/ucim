#UCIM (Union College Intramurals Manager)
------------
The student worker that manages intramurals for Union currently uses excel sheets to keep track of the games, stats, and things pertaining to the intramurals program. My goal is to create a web application using Node.js and Mongoose (Mongodb) to allow for easier management of the intramurals program.

The Mongo database has several collections:
Player
- id - A String representing the system-generated unique identifier
- first name - Players first name
- last name - Players last name
- Sex - Players sex

Game
- id - A String representing the system-generated unique identifier
- winner - team that won the game
- winner points - Number of points winner had
- loser - team that lost the game
- loser - points
- section - (coed, guys, girls)
- date - date and time played

Team
- Name: Team name
- wins: Number of wins
- losses: Number of losses
- section: (coed, guys, girls)
- members: List of players on team

Possible future properties:
There are a lot of things I'd like to change in the future. Particularly in the area of the database and how the sections are handled. It's not terrible, but it's ceratinly not good. It as my first time with Mongo/Mongoose so it was pretty hastily constructed.

- Add AJAX calls in several places to make things dynamic instead of a lot of posts and switching between pages.
- Clean up the database
- Add some validation
- Better error output
- More RESTful oriented

Features
--------

- Users can create, view, update, and delete players, games, and teams
- Basic stats for the games and teams

Approach
--------
UCIM uses a Mongo database to keep track of players, teams, and games for the intramurals program.

Routes
------
Quite a few

Additional routes will be added as more features are developed.
