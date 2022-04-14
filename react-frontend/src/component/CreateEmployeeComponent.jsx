import React, { Component } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id:this.props.params.id,
            firstName:' ',
            lastName:' ',
            emailId:' '
        }
        this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler=this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler=this.changeEmailIdHandler.bind(this);
        this.saveEmployee=this.saveEmployee.bind(this);
        this.cancel=this.cancel.bind(this);
    }
    componentDidMount(){
        if(this.state.id==-1){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then((res)=>{
                let employee = res.data;
                this.setState({firstName:employee.firstName, lastName:employee.lastName, emailId:employee.emailId})
            })
        }
        
    }

    changeFirstNameHandler(event){
        this.setState({firstName:event.target.value})
    }
    changeLastNameHandler(event){
        this.setState({lastName:event.target.value})
    }
    changeEmailIdHandler(event){
        this.setState({emailId:event.target.value})
    }
    saveEmployee(event){
        event.preventDefault();
        let employee ={firstName:this.state.firstName, lastName:this.state.lastName, emailId:this.state.emailId};
        console.log("employee=>"+JSON.stringify(employee));
        if(this.state.id==-1){
            EmployeeService.createEmployee(employee).then(res=>{
                this.props.navigate("/employees")
            });
        }else{
            EmployeeService.updateEmployee(employee,this.state.id).then(res=>{
                this.props.navigate("/employees")
            });
        }
        
    }
    cancel(event){
        event.preventDefault();
        this.setState({firstName:' ',lastName:' ',emailId:' '})
        console.log("cancel to add employee");
        this.props.navigate('/employees')
    }
    getTitle(){
        if(this.state.id==-1){
            return <h3 className='text-center'>Add Employee</h3>
        }else{
            return <h3 className='text-center'>Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='cart col-md-6 offset-md-3 offset-md-3 '>
                            
                                <div className='card'>
                                    {
                                        this.getTitle()
                                    }
                                    <div className='card-body'>
                                        <form>
                                            <div className='form-group'>
                                                <label>First Name : </label>
                                                <input placeholder='First Name' name='firstName' className='form-control'
                                                    value={this.state.firstName} onChange={event=>this.changeFirstNameHandler(event)}/>
                                            </div>
                                            <div className='form-group'>
                                                <label>Last Name : </label>
                                                <input placeholder='Last Name' name='lastName' className='form-control'
                                                    value={this.state.lastName} onChange={event=>this.changeLastNameHandler(event)}/>
                                            </div>
                                            <div className='form-group'>
                                                <label>Emil Address : </label>
                                                <input placeholder='Email Address' name='emailId' className='form-control'
                                                    value={this.state.emailId} onChange={event=>this.changeEmailIdHandler(event)}/>
                                            </div>
                                            <button className='btn btn-success' onClick={event=>this.saveEmployee(event)}>Save</button>
                                            {/* <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:'10px'}}>Cancel</button> */}
                                            <button className='btn btn-danger' onClick={event=>this.cancel(event)} style={{marginLeft:'10px'}}>Cancel</button>
                                        </form>
                                    </div>
                                </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    let params= useParams();
    return <CreateEmployeeComponent {...props} navigate={navigate} params={params} />
}
export default WithNavigate;