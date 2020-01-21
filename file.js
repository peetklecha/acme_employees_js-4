const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

const findEmployeeByName = (name, employeesArr) => {
    let employee = {};
    for (let i=0; i<employeesArr.length; i++) {
        if (employeesArr[i].name === name) {
            employee = employeesArr[i];
            return employee;
        }
    }
    return employee;
}

const findManagerFor = (employeeObject, employeesArr) => {
    const managerId = employeeObject.managerId;
    let manager = {};
    for (let i=0; i<employeesArr.length; i++) {
        if (employeesArr[i].id === managerId) {
            manager = employeesArr[i];
            return manager;
        }
    }
    return manager;
}

const findCoworkersFor = (employeeObject, employeesArr) => {
    const managerId = employeeObject.managerId;
    const id = employeeObject.id;
    let coworkers = [];
    for (let i=0; i<employeesArr.length; i++) {
        if ((employeesArr[i].managerId === managerId) && (employeesArr[i].id !== id)) {
            coworkers.push(employeesArr[i]);
        }
    }
    return coworkers;
}

const findManagementChainForEmployee = (employeeObject, employeesArr) => {
    let output = [];
    let employee = employeeObject;
    while (Object.keys(employee).includes('managerId')) {
        output.push(findManagerFor(employee, employeesArr));
        employee = findManagerFor(employee, employeesArr);
    }
    return output.reverse();
}

const findEmployees = (employeeObject, employeesArr) => {
    const id = employeeObject.id;
    return employeesArr.reduce((accumulator, currentValue) => {
        if (Object.keys(currentValue).includes('managerId') && currentValue.managerId === id) {
            accumulator.push(currentValue);
        }
        return accumulator;
    }, []);
}

// const generateManagementTree = (employeesArr) => {
//     let root;
//     for (let i=0; i<employeesArr.length; i++) {
//         // find the employee in the array that does not have a manager.
//         // this will be the root node of the tree
//         if (!Object.keys(employeesArr[i]).includes('managerId')) {
//             root = employeesArr[i];
//         } else {
//             root = employeesArr[0];
//         }
//     }
//     let employee = root;

//     employee.reports = [];
//     while (findEmployees(employee, employeesArr).length !== 0) {
//         employee.reports = findEmployees(employee, employeesArr)
//         employee = employee.reports[0];
//         generateManagementTree(employeesArr.slice(1));
//     }
//     return root;
// }

const generateManagementTree = (employeesArr) => {
    let root = [];
    employeesArr.forEach(employee => {
        employee.reports = [];
        if (!Object.keys(employee).includes('managerId')) {
            return root.push(employee);
        }
        const managerIdx = employeesArr.findIndex(employeeIdx => employeeIdx.id === employee.managerId);
        if (employeesArr[managerIdx].reports === undefined) {
            return employeesArr[managerIdx].reports = employee;
        }
        employeesArr[managerIdx].reports.push(employee);
    })
    return root[0];
}

const displayManagementTree = (tree) => {
    // if (tree === undefined) {
    //     return;
    // }
    // let str = '';
    // let employee = tree;
    // console.log(employee.name);
    // while (employee.reports !== undefined && employee.reports.length !== 0) {
    //     str += employee.name;
    //     employee = employee.reports[0];
    //     if (employee.reports === undefined) return;
    //     else displayManagementTree(employee.reports[0]);
    //     // console.log(employee.name);
    // }
    // console.log(str);
    // return str;
    // if (tree !== null)
    // console.log(`${stem}${employee.name}`);
    // stem += '-';
    let employee = tree;
    while (employee.reports !== undefined || employee.reports.length !== 0) {
        console.log(employee.name);
        employee = employee.reports[0];
    }
    // if (employee.reports.length > 0) {
    //     for (let i=0; i<employee.reports.length; i++) {
    //         if (employee.reports[i].name !== undefined) {
    //             console.log(`${stem}${employee.reports[i].name}`);
    //         }
    //         if (employee.reports[i].length > 0) {
    //             for (let j=0; j<employee.reports[i].length; j++) {
    //                 if (employee.reports[i].reports[j].name !== undefined) {
    //                     console.log(`${stem}${employee.reports[i].name}`);
    //                 }
    //             }
    //         }
    //     }
    // }
}

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/
