## Run application

In the project directory, you can run:
1. npm i
2. json-server --watch db.json --port 3004

Backend api is mocked with json-server. It is working like real api.
The file used for CRUD operation is in root directory: [db.json](db.json)

### `npm start`

# Known bugs:
1. `Country field` on Create/Edit region:
    - incorrect rendering on the field. It happens to be more than one on create.
    - On smaller devices focus on popup is lost and buttons are unable to be clicked.
    - After open create form and click in right side of the Name field -> then search box from outside is selected.
    - After open create form and click tab -> then another components are on focus
    - After open create form and append more empty countries and click cancel - and reopen create form and click remove -> Then all country fields are removed.
2. `Information popup`:
   - After open create form and click in right side of the Name field -> then search box from outside is selected.
   - If we have region with 5 countries, and they are properly visualised. After that open region with less than 5 countries then additional fields are shown.

3. `Search input`:
   - Not working with exactly match.
   - Will cause performance issues with big data.

   
# Code analysis:
1. Tests are missing
2. Comments are missing
3. More code refactoring needed
4. Extract Table component for `Edit/Info` popups as they have the same structure with the only difference everything is disabled in Info.