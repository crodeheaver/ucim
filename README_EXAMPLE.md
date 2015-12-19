Bookmarkable
------------
Bookmarkable is a simple, social bookmarking service to help you keep track of your favorite places on the web. It provides a simple and beautiful listing of bookmarks, and the capability to search, sort, tag, favorite, and share a collection of links.

Each bookmark has the following properties:

- id - A String representing the system-generated unique identifier
- title - A String containing a brief description of the bookmarked item
- url - A String containing the URL of the bookmarked item
- description - A String containing a plain-text description of the item
- created - A Date representing the date and time the user created the bookmark

Possible future properties:

- snippet - A String of HTML containing a quote or brief snippet of the item
- thumbnail - A String containing a reference to a small preview image of the item
- archive - A String containing a reference to a permanently archived version of the item.

Features
--------

- Users can create, view, update, and delete bookmarks
- Bookmarks have a URL, a title, and a description
- Users can add a bookmark to a collection
- Users can view a list of bookmarks in a collection
- Collections can be created, updated, and deleted

Approach
--------
Bookmarkable is an Express web application that uses Handlebars for templates and MongoDB to store and search for bookmarks.

Routes
------
- / - The home or 'index' route. Show a list of the bookmarked items
- /bookmarks/add - Show a form to create a new bookmark
- /bookmarks/edit - Show a form to edit an existing bookmark. Also include a button for 'delete'.
- /bookmarks/delete - Handle requests to delete an item. Show a confirmation message and redirect to the home page.

Additional routes will be added as more features are developed.
