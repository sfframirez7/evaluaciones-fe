import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';

function mapStateToProps(state) {
    return {

    };
}

class BtnExportToExcel extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            cargando : false,
            FileName : this.props.FileName,
            Table : this.props.TableSelector
        }

        this.downloadCSV = this.downloadCSV.bind(this)
        this.exportTableToCSV = this.exportTableToCSV.bind(this)
    }

    downloadCSV(csv, filename) {
        var csvFile;
        var downloadLink;
    
        // CSV file
        csvFile = new Blob([csv], {type: "text/csv"});
    
        // Download link
        downloadLink = document.createElement("a");
    
        // File name
        downloadLink.download = filename;
    
        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);
    
        // Hide download link
        downloadLink.style.display = "none";
    
        // Add the link to DOM
        document.body.appendChild(downloadLink);
    
        // Click download link
        downloadLink.click();
    }


    exportTableToCSV() {
        var csv = [];

        this.setState({cargando : true})
        // var rows = document.querySelectorAll("#tbtColaboradoresPendientes tr");
        var rows = document.querySelectorAll(this.state.Table + " tr");
        
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll("td, th");
            
            for (var j = 0; j < cols.length; j++) 
                row.push(cols[j].innerText.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            
            csv.push(row.join(","));        
        }
    
        // Download CSV file
        this.downloadCSV(csv.join("\n"), this.state.FileName );
        this.setState({cargando : false})
    }




    render() {
        return (
            <div>
                <div className="d-inline"> 

                    <Loading  Cargando={this.state.cargando} className="d-inline"></Loading>
                    <button className="btn text-success d-print-none d-inline"
                        onClick={this.exportTableToCSV} >
                        <i className="fa fa-file-excel-o" aria-hidden="true" style={{fontSize: '1.6rem'}}></i>
                    </button> 
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(BtnExportToExcel);