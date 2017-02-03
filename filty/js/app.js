var React = require('react');
var SearchBox = require("../../src/components/Filty");

var results = new Array();
results.push("Project Spartan");
results.push("Project Manhattan");
results.push("Project Awesome");

function change(data){
    React.render(<SearchBox
      results={results}
      onChange={change}
      outerContainerClass = "searchBoxDiv" />)

      console.log(JSON.stringify(data));
}

 React.render(<SearchBox
   results={results}
   onChange={change}
   outerContainerClass = "searchBoxDiv"
   inputBoxClass = "inProgress_input"/>, document.getElementById('search-app'));
