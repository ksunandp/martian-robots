# Martian Robot Challenge

## Prepare app

Find input.txt file and enter your input data.

## Run app

Having Node.js installed, two simple commands, answer found in output.txt :

```bash
    npm install
```
```bash
    npm start
```
## Background

Unfortunately I wasn't able to find enough time to do my best work. I do like to get a functional product out first before I go back and clean it up, so at least you can see that first stage.

If I had more time I would:

* Rewrite using es6 classes - Robot instances to better deal with lost robots, and easier movement handling
* Better error handling - I've taken this to assume the input is in the correct format at all times, not a practice I would suggest
* Flexibility/Dynamic - Current input and output file choices are set in place. Some of my code as well is very static and would probably want to strip out those switch statements entirely
* Have unit testing, most likely with Jest