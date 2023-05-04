const express = require('express');
const app = new express();
const { ApolloServer } = require('apollo-server-express');
require('./UserModel/db')
const Employee = require('./UserModel/employee')



let greetMessage = "Hello From GraphQL";
let tempEmployees = [
    {   
        FirstName: "Dharmik",
        LastName: "Narola",
        Age: 24,
        DateOfJoining: "2023-03-16",
        Title: "Team Leader",
        Department: "Automation",
        EmployeeType: "Full-Time",
        CurrentStatus: 1

    },
    {
        FirstName: "Kunal",
        LastName: "Bhakhal",
        Age: 23,
        DateOfJoining: "2021-09-06",
        Title: "Process Engineer",
        Department: "QA",
        EmployeeType: "Full-Time",
        CurrentStatus: 1
    }
];  
async function addSingleEmployee (_, {FirstName, LastName, Age, DateOfJoining,Title,Department,EmployeeType}) {
    console.log(FirstName, LastName, Age, DateOfJoining,Title, Department, EmployeeType);
    let singleEmployee = {
        FirstName: FirstName,
        LastName: LastName,
        Age: Age,
        DateOfJoining: DateOfJoining,
        Title: Title,
        Department: Department,
        EmployeeType: EmployeeType,
        CurrentStatus: 1
    }
      return (await Employee.create(singleEmployee));
    }
        



const typeDefs = `

    enum titleType {
        employee, 
        manager, 
        director, 
        VP,
        vp,
        Employee, 
        Manager, 
        Director
    }

    enum depType {
        IT, 
        Marketing, 
        HR, 
        Engineering,
        it,
        marketing,
        hr,
        engineering
    }

    enum empType {
        FullTime, 
        PartTime, 
        Contract, 
        Seasonal,
        fulltime,
        parttime,
        contract,
        seasonal
    }


    type employee {
        _id: String,
        FirstName: String,
        LastName: String,
        Age: Int,
        DateOfJoining: String,
        Title: titleType,
        Department: depType,
        EmployeeType: empType,
        CurrentStatus: Int
    }

    type Query {
        greet: String!
        employeeList(EmployeeType:String,Title:String,Department:String,_id:String): [employee!]
        
    }
    type Mutation {
        setGreetMessage(message: String!): String 
        addSingleEmployee(FirstName: String!, LastName: String, Age: Int, DateOfJoining: String, Title: String,Department: String, EmployeeType: String ) : String
        delEmployee(_id: String) : String
        editEmployee(_id: String, Title: String, Department: String, CurrentStatus: Int ) : String

    }
`;

const resolvers = {
    Query: {
        greet: () => greetMessage,
        employeeList
	        
    },
    Mutation: {
        setGreetMessage,
        addSingleEmployee,
        delEmployee,
        editEmployee
    },
};

function setGreetMessage(_, { message }) {
    return greetMessage = message;
}

async function employeeList(_, {EmployeeType,Title,Department,_id}) {
    
  console.log({EmployeeType,Title,Department,_id});
    var value = {};
    if(EmployeeType){
      value.EmployeeType = EmployeeType;
    }
    if(Title){
      value.Title = Title;
    }
    if(Department){
      value.Department = Department;
    }
    if(_id){
      value._id = _id;
    }
    console.log({value});

    return (await Employee.find(value)) ;
}

async function delEmployee(_, { _id }){
  await Employee.findByIdAndDelete({ _id });
}
async function editEmployee(_, { _id, Title, Department, CurrentStatus }){
  await Employee.findByIdAndUpdate( _id,{Title, Department, CurrentStatus });
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});

app.use(express.static('public'));

server.start()
    .then(function(){
        server.applyMiddleware({app, path:'/graphql', cors: true})
    })

app.get("/", (req, res) => {
    res.render("index.html"); 
})
app.listen(4000, ()  => {
    console.log('App is running');
})