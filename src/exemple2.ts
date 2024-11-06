let count = 0;
const double = () => count * 2;

console.log(double());
count = 10;
console.log(double());
count = 20; // Nothing happens!
