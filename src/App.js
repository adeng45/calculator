function App() {

  const sideOps = ["+", "-", "*"];

  const generate = () => {

    const buttons = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 1; j < 4; j++) {
        buttons.push(
          <button key={3 * i + j}>{3 * i + j}</button>
        )
      }
      buttons.push(
        <button key={sideOps[i]}>{sideOps[i]}</button>
      )
    }

    return buttons;
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          0
        </div>

        <button>C</button>
        <button>^</button>
        <button>%</button>
        <button>DEL</button>
        
        {generate()}
  
        <button>0</button>
        <button>.</button>
        <button>=</button>
        <button>/</button>

      </div>
    </div>
  );
}


export default App;
