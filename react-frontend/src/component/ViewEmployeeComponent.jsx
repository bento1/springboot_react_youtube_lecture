import React, { Component } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.params.id,
            employee:{}

        }
    }
    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res)=>{
            this.setState({employee:res.data})
        })
    }
    render() {
        return (
            <div>
                <h2> View Employee Page </h2>
                    <div className='card col-md-6 offset-md-3'>
                        <h3 className='text-center'> View Employee Details</h3>
                        <div className='car-body'>
                            <div className='row'>
                                <label>Employee First Name : </label>
                                <div>{this.state.employee.firstName}</div>
                            </div>
                            <div className='row'>
                                <label>Employee Last Name : </label>
                                <div>{this.state.employee.lastName}</div>
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
    return <ViewEmployeeComponent {...props} navigate={navigate} params={params} />
}
export default WithNavigate;