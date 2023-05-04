require('./db');
const Employee = require('./employee')

let tempEmployees = [
    {   
        FirstName: "Dharmik",
        LastName: "Narola",
        Age: 24,
        DateOfJoining: "2022-02-04",
        Title: "Team Leader",
        Department: "QA",
        EmployeeType: "Full-Time",
        CurrentStatus: 1

    },
    {
        FirstName: "Krunal",
        LastName: "Shah",
        Age: 22,
        DateOfJoining: "2021-04-16",
        Title: "Process Engineer",
        Department: "Automation",
        EmployeeType: "Full-Time",
        CurrentStatus: 1
    }
];  

Employee.insertMany(tempEmployees)
    .then(function(data){
        console.log("Data", data)
})