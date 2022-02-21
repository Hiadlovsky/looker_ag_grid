import { Grid } from 'ag-grid-community';

import '../../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css';
import '../../node_modules/ag-grid-community/dist/styles/ag-grid.css';

// let the grid know which columns and what data to use
let grid = {};
let columnDefs = [];
let rowData = [];
const gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  // domLayout: 'autoHeight',
  suppressHorizontalScroll: true,
  suppressDragLeaveHidesColumns: true,
};



const visObject = {
  id: "dev_ag_grid",
  label: "dev_ag_grid",



  // Set up the initial state of the visualization
  create: function (element, config) {

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `<div id="add_to_me"></div>

      <style>
      #add_to_me {
          height: 100%;
      }

      .ag-header-viewport{
        background-color: #F3BAAE;
      }
      </style>

    `




  },
  // Render in response to the data or settings changing
  updateAsync: function (data, element, config, queryResponse, details, done) {



    // Clear any errors from previous updates
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length == 0) {
      this.addError({ title: "No Dimensions", message: "This chart requires dimensions." });
      return;
    }


    document.getElementById("add_to_me").innerHTML = `<div id="myGrid" style="height: 100%; width:auto;" class="ag-theme-alpine"></div>`;
    grid = new Grid(document.querySelector('#myGrid'), gridOptions);
    console.log(data);
    console.log(queryResponse);
    const def = [];
    for (const key in data[0]) {
      let name = key.split('.');
      name = name[name.length - 1].replace('_', ' ');
      const arr = name.split(/[\s_]+|(?=[A-Z])/);
      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

      }
      const str2 = arr.join(" ");
  //    def.push({ headerName: 'Test of the name' , field: str2, sortable: true, filter: true, resizable: true });
      def.push({ headerName: 'Test of the name' , field: str2, sortable: true, suppressMenu: true, resizable: true });


    }

    let setRowData = [];
    data.forEach(function (d, index) {
      let oneRowData = {};
      let repetition = 0;

      for (const key in d) {
        oneRowData[def[repetition].field] = d[key].value;
        repetition++;
      }
      setRowData.push(oneRowData);
    });


    grid.gridOptions.columnDefs = def;
    grid.gridOptions.defaultColDef = {
      filter: true,
      floatingFilter: true

    };
    grid.gridOptions.rowData = setRowData;
    grid.gridOptions.api.sizeColumnsToFit();
  }
};

looker.plugins.visualizations.add(visObject);


/*
 npm install --save-dev css-loader
  npm install --save ag-grid-community
   set OPENSSL_CONF=C:\OpenSSL-Win64\bin\openssl.cfg
   pyhttps
   config loader to accepsts the files that ends on css 
   and load them   { test: /\.css$/, use: ['style-loader', 'css-loader'] },

*/