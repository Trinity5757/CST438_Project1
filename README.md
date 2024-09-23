<h1>Dictionary App</h1>

<p><strong>Date</strong>: Sep 22, 2024</p>

<h2>OVERVIEW</h2>
<p>A dictionary app that uses two APIs and two tables in the MySQLite database. On the homepage, the app provides a random word and definition. Once the user is logged in, they will have access to the practice words page.</p>

<h3>APIs</h3>
<ul>
  <li><strong>Random Word API</strong>: <a href="https://random-word-api.herokuapp.com/word">Random Word API</a></li>
  <li><strong>Dictionary API</strong>: <a href="https://api.dictionaryapi.dev/api/v2/entries/en/word">Dictionary API</a> (Note: Replace "word" with the word retrieved by the Random Word API)</li>
</ul>

<h3>Repository Links</h3>
<p>Due to project restarts, there are two repositories:</p>
<ul>
  <li><a href="https://github.com/KobiMurakami/CST438-Project-01">Repository for Iterations 1 & 2</a></li>
  <li><a href="https://github.com/Trinity5757/CST438_Project1">Repository for Iteration 3</a></li>
</ul>

<hr>

<h2>Introduction</h2>
<p>Communication for this project was managed through team meetings and Google chat rooms. Meetings were typically held on Tuesday and Thursday at 6:15 PM depending on necessity.</p>
<ul>
  <li><strong>Planned Stories</strong>: 12</li>
  <li><strong>Executed Stories</strong>: 12 (one story was split into two, and one was removed)</li>
</ul>

<hr>

<h2>Team Retrospective</h2>

<h3>Trinity Stallworth</h3>
<p><strong>Pull Requests:</strong></p>
<ul>
  <li><a href="https://github.com/KobiMurakami/CST438-Project-01/pulls?q=is%3Apr+is%3Aclosed+author%3ATrinity5757">PRs from Iterations 1 & 2</a></li>
  <li><a href="https://github.com/Trinity5757/CST438_Project1/pulls?q=is%3Apr+author%3A%40me+is%3Aclosed">PRs from Iteration 3</a></li>
</ul>

<p><strong>Issues:</strong></p>
<ul>
  <li><a href="https://github.com/KobiMurakami/CST438-Project-01/issues/assigned/Trinity5757">Issues Assigned (Iterations 1 & 2)</a></li>
  <li><a href="https://github.com/Trinity5757/CST438_Project1/issues/assigned/Trinity5757">Issues Assigned (Iteration 3)</a></li>
</ul>

<p><strong>Role/Stories</strong>: Worked on various stories related to user authentication, practice word page, and API integration.</p>

<p><strong>Biggest Challenge</strong>: Restarting the project during the third iteration was difficult despite having a base layout. Converting everything to React Native was challenging, especially with the tight deadline.</p>

<p><strong>Why was it a challenge?</strong>: The project restart required condensing steps into daily tasks. Originally, the process was spread over longer intervals, but the short timeline forced a faster pace.</p>

<p><strong>Favorite/Most Interesting Part</strong>: Discovering the similarities between React Native, HTML, and Java. Though difficult, the language is becoming easier to understand with time.</p>

<p><strong>What would you change?</strong>: I would verify the initial process was aligned with the professor's expectations. We initially attempted to integrate React Native with Android Studio, which was incorrect.</p>

<p><strong>Most Valuable Thing Learned</strong>: Communication. Our team had vastly different schedules, which led to limited communication early on. Overcoming these challenges was key.</p>

<hr>

<h3>Salvatore Eze</h3>
<p><strong>Pull Requests:</strong></p>
<ul>
  <li>Past <a href="https://github.com/KobiMurakami/CST438-Project-01/pulls?q=is%3Apr+is%3Aclosed+author%3Aezesalvatore">link</a></li>
  <li>Current <a href="https://github.com/Trinity5757/CST438_Project1/pulls?q=is%3Apr+author%3A%40me+is%3Aclosed">link</a></li>
</ul>

<p><strong>Issues:</strong></p>
<ul>
  <li>Past github <a href="https://github.com/Trinity5757/CST438_Project1/issues/6">link</a></li>
  <li>Current project <a href="https://github.com/KobiMurakami/CST438-Project-01/issues/assigned/ezesalvatore">link</a></li>
</ul>

<p><strong>Role/Stories</strong>: Created the database, help complete favorite and words page utilizing the recycler viewer, revamped wordsApi so it can integrate the database</p>
<p><strong>Biggest Challenge</strong>: Displaying the words on both the Favorite and Words Page </p>
<p><strong>Why was it a challenge?</strong>: It was hard to get the words from the web API and put them into the user database and display them on the pages.</p>
<p><strong>How was the challenge addressed?</strong>: My solution was to convert the wordsApi.js into a .tsx file. The keyword 'export interface' helped index.tsx know what methods are available and what they return. When receiving the words, I utilized the global import to get an array from the database and display it on the pages.</p>
<p><strong>Favorite/Most Interesting Part</strong>: Learning about React Native and more about JavaScript. React Native is a better tool to create phone applications compared to Android Studio.</p>
<p><strong>What would you change?</strong>: Add more features to the app, there was many ideas scrapped since we had to redo the project</p>
<p><strong>Most Valuable Thing Learned</strong>: Working with a programming group. So far in my academic career in the CSUMB CST program, I hadn't done any group work until my senior year.</p>

<hr>

<h3>Kobi Murakami</h3>
<p><strong>Pull Requests:</strong></p>
<ul>
  <li>(links to Kobi’s PRs)</li>
</ul>

<p><strong>Issues:</strong></p>
<ul>
  <li>(links to Kobi’s issues)</li>
</ul>

<p><strong>Role/Stories</strong>: (details about stories)</p>
<p><strong>Biggest Challenge</strong>: (challenge explanation)</p>
<p><strong>Why was it a challenge?</strong>: (why explanation)</p>
<p><strong>How was the challenge addressed?</strong>: (solution)</p>
<p><strong>Favorite/Most Interesting Part</strong>: (highlights)</p>
<p><strong>What would you change?</strong>: (improvement ideas)</p>
<p><strong>Most Valuable Thing Learned</strong>: (personal learning)</p>

<hr>

<h3>Colton Korhummel</h3>
<p><strong>Pull Requests:</strong></p>
<ul>
  <li><a href="https://github.com/KobiMurakami/CST438-Project-01/pulls?q=is%3Apr+is%3Aclosed+author%3AColtonKor">PRs from Iterations 1 & 2</a></li>
  <li><a href="https://github.com/Trinity5757/CST438_Project1/pulls?q=is%3Apr+is%3Aclosed+author%3AColtonKor">PRs from Iterations 3</a></li>
</ul>

<p><strong>Issues:</strong></p>
<ul>
  <li><a href="https://github.com/KobiMurakami/CST438-Project-01/issues/assigned/ColtonKor">Issues Assigned</a></li>
</ul>

<p><strong>Role/Stories</strong>: I worked on the favorites and practice page. I integrated the working API, that Trinity made, into the page so the words were there. I also helped try to set up the database</p>
<p><strong>Biggest Challenge</strong>: The strongest challenge was getting the database to work. We all tried and every time we would get the same null error. Sal got it to work.</p>
<p><strong>Why was it a challenge?</strong>: It was a challenge for me because everything I looked up would be different from the previous and they would all still not work.</p>
<p><strong>How was the challenge addressed?</strong>: The challenge was fixed by Sal. He ended up doing the database with 'expo-sqlite' while I was trying something else</p>
<p><strong>Favorite/Most Interesting Part</strong>: My favorite part of this project was trying to seeing how react native worked on my own.</p>
<p><strong>What would you change?</strong>: The one thing I would change would be to try and make the app look more like an app.</p>
<p><strong>Most Valuable Thing Learned</strong>: The most valuable thing I learned from this project is integrating API's because I will need to that in other classes.</p>

<hr>

<h2>Conclusion</h2>

<h3>Project Success</h3>
<p>The project was successful for what it was meant to achieve, especially given its simplicity. Through the project, we learned to fully utilize GitHub and follow the Agile workflow for teamwork.</p>

<h3>Largest Victory</h3>
<p>The largest success was rebuilding the project within the remaining time frame. Restarting a project in the later stages is always difficult, but most of the critical bugs were resolved by version 1.0.</p>

<h3>Final Assessment</h3>
<p>This project posed more challenges than expected. The first week was spent aligning communication and navigating React Native as a new language for the team. Our initial approach of starting in Android Studio and integrating with the web API and database was incorrect, leading to a full restart by the third iteration. By the end of the third iteration, we had a much clearer understanding of both communication and workflow, which made the final steps smoother.</p>

<h3><a href="https://youtu.be/bRCl3O-Vg5M">YouTube</a></h3>
