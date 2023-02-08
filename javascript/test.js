const persons = [
  {
    name: "Sumit",
    age: 37,
  },
  {
    name: "Saad",
    age: 23,
  },
  {
    name: "Akash",
    age: 22,
  },
];
console.log(persons.reduce((total, person) => total + person));
