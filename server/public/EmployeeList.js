function IssueFilter() {
  return /*#__PURE__*/React.createElement("div", {
    id: "root-3"
  }, /*#__PURE__*/React.createElement("h3", null, "Welcome to IssueFilter"));
}
function IssueRow(props) {
  //props.issue.Id
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: props.style
  }, props.issue.Id), /*#__PURE__*/React.createElement("td", {
    style: props.style
  }, props.issue.Owner), /*#__PURE__*/React.createElement("td", {
    style: props.style
  }, props.issue.Status), /*#__PURE__*/React.createElement("td", {
    style: props.style
  }, new Date(parseInt(props.issue.Created)).toLocaleDateString()), /*#__PURE__*/React.createElement("td", {
    style: props.style
  }, props.issue.Effort), /*#__PURE__*/React.createElement("td", {
    style: props.style
  }, new Date(parseInt(props.issue.Due)).toLocaleDateString()), /*#__PURE__*/React.createElement("td", {
    style: props.style
  }, props.issue.Title));
}
function IssueTable({
  allIssues
}) {
  const style = {
    border: "2px solid black"
  };
  //     const issueList = [
  //         {   
  //             Id:1, 
  //             Owner: "Person-A", 
  //             Status: "Assigned", 
  //             Created: "2023-01-20", 
  //             Effort: 4, 
  //             Due: "2023-02-18", 
  //             Title:"ABC"
  //         },
  //         {
  //             Id:2, 
  //             Owner: "Person-B", 
  //             Status: "Fixes", 
  //             Created: "2023-01-20", 
  //             Effort: 2, 
  //             Due: "2023-02-18", 
  //             Title:"XYZ"
  //         }
  //     ];  

  //     const [allIssues, setAllIssues] = React.useState([]);
  //    // const [counter, setCounter] = React.useState(0);
  //    // console.log(counter);
  //     // Try to simulate an API call

  //     React.useEffect(() => {
  //         setTimeout(() => {
  //             setAllIssues(issueList)
  //            // setCounter(counter + 1);
  //         }, 2000)
  //     },[])

  const AllIssueRow = allIssues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    issue: issue,
    style: style
  }));
  return /*#__PURE__*/React.createElement("div", {
    id: "root-3"
  }, /*#__PURE__*/React.createElement("h3", null, "Welcome to IssueTable"), /*#__PURE__*/React.createElement("table", {
    style: style
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Created"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Due"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, AllIssueRow)));
}
function IssueAdd({
  AddSingleIssue
}) {
  const handleSubmit = e => {
    e.preventDefault();
    let form = document.forms.addIssue;
    let singleIssue = {
      Owner: form.owner.value,
      Status: form.status.value,
      Created: new Date().toUTCString(),
      Effort: parseInt(form.effort.value),
      Due: new Date().toUTCString(),
      Title: form.title.value
    };
    console.log(singleIssue);
    AddSingleIssue(singleIssue);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
    name: "addIssue",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("label", {
    for: "owner"
  }, "Owner"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "owner",
    name: "owner"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "status"
  }, "Status"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "status",
    name: "status"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "effort"
  }, "Effort"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "number",
    id: "effort",
    name: "effort"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    for: "title"
  }, "Title"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "title",
    name: "title"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Submit"), /*#__PURE__*/React.createElement("br", null)));
}
const IssueList = () => {
  let query = `
        query  {
            issueList {
                Id
                Status
                Owner
                Effort
                Created
                Due
                Title
            }
      }
    `;

  // const issueList = [
  //     {   
  //         Id:1, 
  //         Owner: "Person-A", 
  //         Status: "Assigned", 
  //         Created: "2023-01-20", 
  //         Effort: 4, 
  //         Due: "2023-02-18", 
  //         Title:"ABC"
  //     },
  //     {
  //         Id:2, 
  //         Owner: "Person-B", 
  //         Status: "Fixes", 
  //         Created: "2023-01-20", 
  //         Effort: 2, 
  //         Due: "2023-02-18", 
  //         Title:"XYZ"
  //     }
  // ];  

  const [allIssues, setAllIssues] = React.useState([]);
  // const [counter, setCounter] = React.useState(0);
  // console.log(counter);
  // Try to simulate an API call

  // React.useEffect(() => {
  //     setTimeout(() => {
  //         setAllIssues(issueList)
  //        // setCounter(counter + 1);
  //     }, 2000)
  // },[])

  function fetchData() {
    fetch("/graphql", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    }).then(async response => {
      let tempIssues = await response.json();
      let tempList = tempIssues.data.issueList;
      console.log(tempIssues);
      setAllIssues(tempList);
    });
  }
  React.useEffect(function () {
    fetchData();
  }, []);
  const addSingleIssue = newIssue => {
    // let Query = `
    // mutation SetGreetMessage($message: String!) {
    //     setGreetMessage(message: $message);

    // }`

    // fetch("/graphql", {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json'},
    //     body: JSON.stringify({ query, variable: {message: "hii"}, })
    // }).then(async (response)=> {
    //     let temp = await response.json();
    //     console.log(temp);
    // });

    let query = `
            mutation AddSingleIssue($Status: String!, $Owner: String, $Effort: Int, $Title: String) {
                addSingleIssue(Status: $Status, Owner: $Owner, Effort: $Effort, Title: $Title)
            }
        `;
    fetch("/graphql", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {
          Status: newIssue.Status,
          Owner: newIssue.Owner,
          Effort: newIssue.Effort,
          Title: newIssue.Title
        }
      })
    }).then(async response => {
      fetchData();
      let temp = await response.json();
      console.log(temp);
    });
    let issue = allIssues.slice();
    issue.push(newIssue);
    setAllIssues(issue);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
    allIssues: allIssues
  }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, {
    AddSingleIssue: addSingleIssue
  }));
};
const element = ReactDOM.createRoot(document.getElementById("root-1"));
element.render( /*#__PURE__*/React.createElement(IssueList, null));