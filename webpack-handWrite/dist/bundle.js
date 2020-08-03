(function(modules) { // webpackBootstrap
 	var installedModules = {};

    function __webpack_require__(moduleId) {

 		// Check if module is in cache
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		// Execute the module function
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded
 		module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}
    return __webpack_require__(__webpack_require__.s = "./src\index.js");
})
({

   
       "./src\index.js": 
       (function(module, exports, __webpack_require__) {
           eval(`let {
  print
} = __webpack_require__("./src\\b.js");

__webpack_require__("./src\\index.less");

print();
document.body.append('123');`)
       }),
   
       "./src\b.js": 
       (function(module, exports, __webpack_require__) {
           eval(`module.exports = {
  print() {
    console.log('hello Ast');
  }

};`)
       }),
   
       "./src\index.less": 
       (function(module, exports, __webpack_require__) {
           eval(`let style = document.createElement('style');
style.innerHTML = "body {\\n  background-color: red;\\n}\\n";
document.body.append(style);`)
       }),
   
});