import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from "react-router-dom";




class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state={
            employees:[]
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee=this.editEmployee.bind(this);
        this.deleteEmployee=this.deleteEmployee.bind(this);
        this.viewEmployee=this.viewEmployee.bind(this);
    }
    // get data
    componentDidMount(){
        EmployeeService.getEmployees().then((res)=>{
            this.setState({employees:res.data});
        })
    }
    // transfer data 
    addEmployee( ){
        this.props.navigate('/add-employees/-1')
    }
    editEmployee(id){
        this.props.navigate('/add-employees/'+id);
    }
    viewEmployee(id){
        this.props.navigate('/view-employees/'+id);
    }
    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(res=>{
            this.setState({employees:this.state.employees.filter(employee=>employee.id!==id)});
            // this.props.navigate('/employees'); too long for refresh 단지돌아간다고 리스트가 갱신되지않음. 스테이트가 가지고 있기때문
        });
        
    }
    render() {
        return (
            <div>
                <h2 className='text-center'>Employees List</h2>
                <div>
                    <button className='btn btn-primary' onClick={this.addEmployee}>Add Employee</button>
                </div>

                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th> Employee First Name </th>
                                <th> Employee Last Name </th>
                                <th> Employee Email Address </th>
                                <th>Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee => 
                                    <tr key={employee.id}>
                                        <td>{ employee.firstName}</td>
                                        <td>{ employee.lastName}</td>
                                        <td>{ employee.emailId}</td>
                                        <td>
                                            <button onClick={()=>this.editEmployee(employee.id)} className='btn btn-info'>Update </button>
                                            <button style={{marginLeft:"10px"}} onClick={()=>this.viewEmployee(employee.id)} className='btn btn-info'>Details </button>
                                            <button style={{marginLeft:"10px"}} onClick={()=>this.deleteEmployee(employee.id)} className='btn btn-danger'>Delete </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
    
function WithNavigate(props) {
    let navigate = useNavigate();
    return <ListEmployeeComponent {...props} navigate={navigate} />
}
export default WithNavigate
//export default (ListEmployeeComponent);