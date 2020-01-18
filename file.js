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
    // iterate through the array of employees
    // where each element in the array is an Object
    // compare the object element's name against the arg name
    // and if so, return that Object
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
    // given an employee, we can find their manager and push them onto the array
    // using recursiion, we can continue doing this until we find an employee with no manager
    // then we flip the array, and return that array
    let output = [];
    let employee = employeeObject;
    while (Object.keys(employee).includes('managerId')) {
        output.push(findManagerFor(employee, employeesArr));
        employee = findManagerFor(employee, employeesArr);
    }
    return output.reverse();
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
