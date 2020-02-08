# liri-node-app

### Description
* The app should take the following input: `<command> <target>`
* There are four commands that are available:
    * `concert-this`
        * It will use target as artist/band name for artist/band event searching using Bands in Town Artist Events API.

    * `spotify-this-song`
        * It will use the `<target>` as song's name for song searching using Spotify API.
    
    * `movie-this`
        * It will use the `<target>` as movie title for movie searching using OMDB AIP.
        * If `<target>` is not provied (empty), it will search `Mr. Nobody` by default.

    * `do-what-it-says`
        * It will read the `random.txt` file and execute each line, which has a `<command>,<target>` structure, in the file.
        * The app will ignore the reaming input after `<command>`.


### Setup
1. Create a JavaScript file named `keys.js` and copy the following code into `keys.js`:
     ```js
     console.log('this is loaded');

     exports.spotify = {
         id: process.env.SPOTIFY_ID,
         secret: process.env.SPOTIFY_SECRET
     };
     ```

2. Create a file named `.env`, and copy the following code into `.env`:
    ```js
    # Spotify API keys

    SPOTIFY_ID=your-spotify-id // TODO: replace to your spotify id
    SPOTIFY_SECRET=your-spotify-secret // TODO: replace to your spotify secret

    ```
3. Go to `https://developer.spotify.com/dashboard/login` to create an account. Follow the instruction to obtain a Spotify client id and a client secret. In `.env` file, replace the spotify id/secret with your own Spotify client id and client secret.

4. Now it is ready to go!


### Demo
* `concert-this`
    ![concert-this-result](/Demo/images/concert-this-result.jpg)

* `spotify-this-song`
    ![spotify-this-song-result](/Demo/images/spotify-this-song-result.jpg)

    (The result is also updated to the log.txt. You can see the previous reuslt (from `concert-this celine dion`))

* `movie-this`
    * If there's no input after `movie-this`, it will search `Mr. Nobody` by default.
    ![movie-this-result](/Demo/images/movie-this-result.jpg)

* `do-what-it-says`
    * You need to first define random.txt in the form of `<command>,<target>`. You have to type `,` even if `<target>` is empty.
    ![toDoList](/Demo/images/toDoList.jpg)

    * Then type `do-what-it-says`
    ![do-what-it-says-result](/Demo/images/do-what-it-says-result.jpg)

    (Noticed that it is a the search functions are asyc call to the APIs, the order of the result depends on the order of executing the line command and how fast the corresponding API responds. You can see the `random.txt` commands' order and the displayed results' order are different.)







