

function App() {
 function setData<T, V>(name: T, age: V): [T, V]{
  console.log(name, age);
  return [name , age];
 } 

 setData("scott", 17);


   


  return (
    <>
     
    </>
  )
}

export default App
