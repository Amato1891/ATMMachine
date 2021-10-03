const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange}></input>
       <input type="submit" disabled= {!isValid} width="200" value="Submit" id="submit-input"></input>
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState("");
    const [validTransaction, setValidTransaction] = React.useState(false);
    const[warning, setWarning] = React.useState('');
    const[millionaire, setMillionaire] = React.useState('');
    const divStyle = {
        color: 'gold',
        fontSize:'3em'
    }
    let status = `Account Balance $ ${totalState} `;
    
  
    const handleChange = (event) => {
      if(Number(event.target.value) <= 0) {
        return setValidTransaction(false);
        }
        setWarning('');
        console.log(totalState)
        if (totalState < 1000000) setMillionaire('');
        if(totalState >= 1000000) setMillionaire(`You've done it!!! Finally become a millionaire!!!!!`)
        if(Number(event.target.value) > totalState && totalState > 0 && atmMode === "Cash Back") {
            let diff = totalState - Number(event.target.value);
            setWarning(`Warning! You're attempting to withdraw $${Math.abs(diff)} more than whats available in your account!`)
        }
        if(atmMode === 'Cash Back' && Number(event.target.value) > totalState){
          setValidTransaction(false);
        } else {
          setValidTransaction(true);
        }
      setDeposit(Number(event.target.value));
    };
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(false);
      event.preventDefault();
    };
    const handleModeSelect = (event) => {
      setAtmMode(event.target.value);
      setValidTransaction(false);
      if(event.target.value === 'Deposit'){
        setIsDeposit(true);
        } else{
          setIsDeposit(false);
        }
    };
  
    return (
      <form onSubmit={handleSubmit}>
      <>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      <div id='warning' style={{color:'red'}}>{warning}</div>
        <div id='millionaire' style={divStyle}>{millionaire}</div>
      {atmMode &&(
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
        )}
        </>
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));