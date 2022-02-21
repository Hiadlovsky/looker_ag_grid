import { ColDef, Grid } from 'ag-grid-community';
import { connect } from 'http2';

interface IRowData{
    data: any;
    fields

};

interface IdKeys{
    key: string;
    id:  string;

}

interface IQueryResponse {
    fields: {
        dimension_like: Array<IColumDefinition>
        dimensions: Array<IColumDefinition>
        measure_like: Array<IColumDefinition>
        measures: Array<IColumDefinition>
        pivots: Array<any>
    }
    id: string;

}

interface IColumDefinition {
    align: string;
    can_filter: boolean;
    can_time_filter: boolean;
    category: string;
    field_group_variant: string; 
    label_short: string; // displayed name columnDefs.headerName
    lookml_link: string;
    name: string //  identification  name columnDefs.field
    source_file: string;
    source_file_path: string;
    sortable: boolean;
}


let rowData: IRowData[] = [];

let colDefs: ColDef[] = [];


//{ make: 'Toyota', model: 'Celica', price: 35000 },
export const setRowData = (data: Array<any>) => {
    let rowData = [];
     data.forEach( el => {
        let oneRowData = {};
        for (const key in el) {
          const newKey =  key.split('.')[key.split('.').length - 1];
        oneRowData[newKey] = el[key].value;
        }
        rowData.push(oneRowData); 
    });
    return rowData;
};

export const setColDefs = (data: IQueryResponse): ColDef[]  => {
    if (data?.fields) {
        const dim: ColDef[]  = data.fields.dimensions.map(el => {
            return {
              headerName: el.label_short,
              field: el.name.split('.')[el.name.split('.').length - 1], 
              sortable: el.sortable,
              suppressMenu: true,
              resizable: true,
            }
        });
        const mes: ColDef[]  = data.fields.measures.map(el => {
          return {
            headerName: el.label_short,
            field: el.name.split('.')[el.name.split('.').length - 1], 
            sortable: el.sortable,
            suppressMenu: true,
            resizable: true,
          }
        });
        
        return dim.concat( mes);
    }
    else {
        return [];
    }
}