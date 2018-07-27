# TEST SIRENA
Seniority test @ Sirena

# Summary
The test consist on the development of 2 NodeJS apps that will interact between them.

Both applications must:
* Be in Github.
* Have a README file.
* Have a npm command to start it (do not use Grunt or Gulp).
* Have an ESLint configuration and a npm command to run it in all files.
* Documentation (JSDOC) in all methods.
* Will be a plus if both apps have unit tests and coverage report.

# Second App

* The first time that the app starts, it must insert a list of 10 random movies using the public API (first app), checking before that they do not exist.
* Every minute, must increase the viewers of a random movie.
* Every 10 minutes must send a report of the top 5 of movies, based on viewers.
* Every 30 minutes must delete the list of random movies, and create a new one. Except during weekends.

Will be a plus if the app uses:

* Serverless architecture.
* Send a real report using some external email service.
