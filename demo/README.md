## Magento Bootstrap Install

## Installation:

#### Install prerequisite programs:
* [Node and NPM](https://nodejs.org/): Run .pkg file from the site. (npm is automatically installed with node)
* [Bower](http://bower.io/): Install globally with the following command if you haven't before.
  * `npm install -g bower`
* [SASS 3.4.x](http://sass-lang.com/install)
  * verify the version with `sass--version`
    * if you don't have it yet, `gem install sass`
    * if you have it, update to be sure: `gem update sass`

From /tools run *install.sh*
* Create a database:
    * Name: magento
* Create a MySQL user:

U: magento_user
P: 1234

Import the base DB from the '/tools' folder.

Setup a MAMP host to point at the projects '/web' folder. You will need to run through the Magento install process, but it will be quicker as the database is already configured.

### Front end:

#### Run dependency managers:
`cd REPO_ROOT/demo` (Your path may vary)
`npm install`
`bower install` (If you get an EACCES error, do this and re-run: `cd ~/.cache && sudo chmod -R 777 bower`  )

#### BrowserSync:
* Create a new host in MAMP, and point it to the `REPO_ROOT/web` folder.
* Create a browserSyncConfig.js in the `REPO_ROOT/web` directory that contains:

```
module.exports = {
	path: 'server.name.you.created.in.mamp'
};
```

## Running:
Day to day, you will mainly use only one task that will automatically call almost all the tasks in the Tasks list below.
* *Local Testing with BrowserSync*: `gulp serve`

## Tasks:
* *Local Testing with BrowserSync*: `gulp serve`
* *Build*: `gulp build`
* *Local Testing*: `gulp`
* *Scripts*: `gulp browserify`
* *JSHint*: `gulp eshint`
* *SASS*: `gulp scss`
* *ImageMin*: `gulp images`
