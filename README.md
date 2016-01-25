## Angular 2 with TypeScript & Bootstrap 3

## How to run the application

  * clone the code
  * go to the root of the folder and run ```npm install``` and then ``` npm start ```.
  * Go to localhost:3000 ( if not automagicaly redirected there )

##Importing the code in your editor
One thing to note here is that as soon you start the dev server with ``` npm start ``` the folder will be populated with ignored files. This is because typescript code is beeing converted into javascript code. The output folder for these files can be changed. But for this project i chosen to tell my editor to hide files ignored by git.

For atom its as simple as:
Settings > Packages > tree-view > check Hide Ignored VCS names


## Running the test cases

For running the test cases, we currently write two commands in the root. ( one for compiling the code, one for running the tests in the browser ) ```npm run tsc ``` and ```npm test```

The testcases are inside the source folder as the angular dev team wants it. They are called the same as the source file, but with .spec appended to the end.


## Why Angular 2 and why TypeScript?

#### Angular 2
Angular 2 is the next version of Gooles MV* framework for building webb apps. It was announced in October 2014. It embraces futher feb standars as ES6 and dom shadowing. They even say that its 5 times faster than its precursor.
Angular 2 is still in beta, but it looks very promissing i have to say. At least for me :)

#### TypeScript 2
Why TypeScript?? Why not pure js?  Mainly because Angular 2 is quite new and the documentation is at the moment written mostly in TypeScript.
In the end , for me as a developer TypeScript provides me a typed superset of JavaScript.
Existing JavaScript projects can be converted to TypeScript "simply" by renaming the source files from*.js to *.ts.

The TypeScript code here get transpiled into JavaScript with the typescript tool configured as a file watcher.

I had the possibility to use new features out of ES6. For example the code that filters the products on the first page can be written with one line of javascript:


```javascrip

// filter out non maching products with js array.filter + string.includes
this.visibleProducts = this.products.filter(product => product.description.toLowerCase().includes(this.filterVal.toLowerCase()));

```


## LICENSE

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

<http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
