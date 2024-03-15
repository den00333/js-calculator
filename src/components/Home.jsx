import {useState} from 'react';
import btnStyles from './styles-folder/CalBtn.module.css'
const Home = () => {

    const [result, setResult] = useState('0');
    const [computationList, setComputation] = useState([]);
    const [clearFLag, setClearFlag]= useState(false);
    const [hasDecimal, setHasDecimal] = useState(false);
    const [hasNegative, setNegative] = useState(false);

    const [hasSquared, setSquared] = useState(true);
    const [hasPercentage, setPercentage] = useState(true);
    const [hasSquareRoot, setSquareRoot] = useState(true);
    
  const traverseNumUntilYouHitOperation = () =>{
    let numWithoutOperation = '';
    let leftOverNums = '';
    let localFlag = false;
    for(let i = result.length-1; i >= 0; i--){
      if(result[i] == '.'){
        if (localFlag){
          leftOverNums += result[i];
        }else{
          numWithoutOperation += result[i];
        }
        continue;
      }
      if(isNaN(parseInt(result[i]))){
        // console.log(result[i]);
        if(result[i] == '(' || result[i] == ')'){
          
          // console.log(result[i] + '()');
        }else if(result[i] == '-' && result[i-1] == '('){
          
          // console.log(result[i] + '(-');
        }else{
          // console.log(result[i] + 'nada');
          localFlag = true;
        }
      }
      if (localFlag){
        leftOverNums += result[i];
      }else{
        numWithoutOperation += result[i];
      }
    }
    return [leftOverNums, numWithoutOperation];
  }

  const positiveOrNegative = () => {
    
    if(isNaN(parseInt(result.slice(-1))) && (result.slice(-1) == '-' || result.slice(-1) == '+' || result.slice(-1) == '/' || result.slice(-1) == '*')){
      return;
    }

    let [leftOverNums, numWithoutOperation] = traverseNumUntilYouHitOperation();
    // console.log(eval('(-72)-(-2)'));
    let reverseNegativeStr = numWithoutOperation.replace(/[()-]/g, '').split('').reverse().join('');
    let negativeReversed = '';
    let reverseLeftOver = '';
    if(hasNegative){
      
      negativeReversed += reverseNegativeStr;
      reverseLeftOver = leftOverNums.split('').reverse().join('');
      setNegative(false);
    }else{
      negativeReversed = '(-' + reverseNegativeStr + ')';
      reverseLeftOver = leftOverNums.split('').reverse().join('');
      setNegative(true);
    }
    
    let wholeNewStr = reverseLeftOver + negativeReversed;
    setResult(wholeNewStr);
  }

  const handleSquare = () => {
    let [reverserdLeftOverNums, reverserdNumWithoutOperation] = traverseNumUntilYouHitOperation();
    let leftOverNums = reverserdLeftOverNums.split('').reverse().join('');
    let numWithoutOperation = reverserdNumWithoutOperation.split('').reverse().join('');
    
    if(hasSquared){
      if(leftOverNums == ''){
        setResult((numWithoutOperation * numWithoutOperation).toString());
      }else if(numWithoutOperation == ''){
        setResult((leftOverNums.slice(0, -1) * leftOverNums.slice(0, -1)).toString() + leftOverNums.slice(-1)); // + leftOverNums.slice(-1)
      }else{
        setResult(leftOverNums + (numWithoutOperation * numWithoutOperation).toString());
      }
      setSquared(false);
    }else{
      if(leftOverNums == ''){
        setResult((Math.sqrt(numWithoutOperation)).toString());
      }else if(numWithoutOperation == ''){
        setResult((Math.sqrt(leftOverNums.slice(0, -1))).toString() + leftOverNums.slice(-1));
      }else{
        setResult(leftOverNums + (Math.sqrt(numWithoutOperation)).toString());
      }
      setSquared(true);
    }
  }

  const handlePercentage = () => {
 
    let [reverserdLeftOverNums, reverserdNumWithoutOperation] = traverseNumUntilYouHitOperation();
    let leftOverNums = reverserdLeftOverNums.split('').reverse().join('');
    let numWithoutOperation = reverserdNumWithoutOperation.split('').reverse().join('');
    
    if(hasPercentage){
      if(leftOverNums == ''){
        setResult((numWithoutOperation/100).toString());
      }else if(numWithoutOperation == ''){
        setResult((leftOverNums.slice(0, -1)/100).toString() + leftOverNums.slice(-1));
      }else{
        setResult(leftOverNums + (numWithoutOperation/100).toString());
      }
      setPercentage(false);
    }else{
      if(leftOverNums == ''){
        setResult((Math.round(numWithoutOperation*100)).toString());
      }else if(numWithoutOperation == ''){
        setResult((Math.round(leftOverNums.slice(0, -1)*100)).toString() + leftOverNums.slice(-1));
      }else{
        setResult(leftOverNums + (Math.round(numWithoutOperation*100)).toString());
      }
      setPercentage(true);
    }
  }

  const handleSqareRoot = () => {
    let [reverserdLeftOverNums, reverserdNumWithoutOperation] = traverseNumUntilYouHitOperation();
    let leftOverNums = reverserdLeftOverNums.split('').reverse().join('');
    let numWithoutOperation = reverserdNumWithoutOperation.split('').reverse().join('');

    if(hasSquareRoot){
      if(leftOverNums == ''){
        setResult((Math.sqrt(numWithoutOperation)).toString());
      }else if(numWithoutOperation == ''){
        setResult((Math.sqrt(leftOverNums.slice(0, -1))).toString() + leftOverNums.slice(-1));
      }else{
        setResult(leftOverNums + (Math.sqrt(numWithoutOperation)).toString());
      }
      setSquareRoot(false);
    }else{
      if(leftOverNums == ''){
        setResult((Math.round(numWithoutOperation * numWithoutOperation)).toString());
      }else if(numWithoutOperation == ''){
        setResult((Math.round(leftOverNums.slice(0, -1) * leftOverNums.slice(0, -1))).toString() + leftOverNums.slice(-1));
      }else{
        setResult(leftOverNums + (Math.round(numWithoutOperation * numWithoutOperation)).toString());
      }
      setSquareRoot(true);
    }
  }

  const handleClick = (value) => {

    if(preventSpammingOperation(value)){return;}
    // prevent spamming zero
    if(result == '0'){
      
      if(value == '-' || value == '+' || value == '/' || value == '*'|| value == '.'){
        setResult(result + value);
        setClearFlag(false);
        console.log('start');
        if(!hasDecimal && value == '.'){
          //prevent spam decimal
          setHasDecimal(true);
        }
      }else{
        setResult(value);
      }
    }else{
      handleClearingNum(value)
    }
  };

  const preventSpammingOperation = (value) => {
    // nagpapalit ng operation, no to spamming operation
    const isPreviousInputOperation = ['+', '-', '*', '/'].includes(result.slice(-1));
    if (isPreviousInputOperation && ['+', '-', '*', '/'].includes(value)) {
      const resultWithoutLast = result.slice(0, -1);
      setResult(resultWithoutLast + value);
      return true;
    }
  }

  const handleClearingNum = (value) => {
    if(clearFLag){
      setClearFlag(false);
      setSquareRoot(true);
      setSquared(true);
      setPercentage(true);
      // setResult(result); //commenting this
      try{
        // after calculating it will be deleted if I click a number else if it is operations/symbols 
        // it will just continue concatenating the value to the results 
        let output = eval(value).toString();
        console.log('hit output');
        clearResult();
        setResult(output);
      }catch{
        console.log('hit catch');
        if(value=='.'){
          //prevent spam decimal
          setResult('0'+value);
        }else{
          setResult(result + value);
        }
        
      }
    }else{
      //prevent spam decimal
      if(value == '+' || value == '-' || value == '*' || value == '/'){
        setHasDecimal(false);
        setNegative(false);
        setResult(result + value);
      }
      if(!hasDecimal && value == '.'){
        setResult(result + value);
        setHasDecimal(true);
      }

      if(!isNaN(parseInt(value))){
        setResult(result + value);
      }
    }
  }

  const clearResult = () => {
    setResult('0');
    setNegative(false);
    
    setSquareRoot(true);
    setSquared(true);
    setPercentage(true);
  };

  const deleteNum = () =>{
    setResult(result => {
      if(result.length == 1){
        return '0';
      }else{
        return result.slice(0, -1);
      }
    });
  }

  const limitDecimal = (number) => {
    if (number.toString().includes('.')) {
      var parts = number.toString().split('.');
      if (parts[1].length > 10) {
          console.log(number);
          return parseFloat(Math.round(number*1e10)/1e10);
      }
    }
    return number;
  }
  
  const calculateResult = () => {
    try {
      console.log('-> ' + result);
      let outcome = eval(result).toString();
      let num = limitDecimal(outcome).toString();
      setResult(num);
      setComputation([...computationList, `${result}=${num}`]);
      setClearFlag(true);
    } catch (error) {
      setResult('Error');
      setClearFlag(true);
    }
  };

  let reversedList = [...computationList].reverse();

  return (
    <div className=' flex flex-col md:justify-center md:flex-row'>

          <div className="bg-green-500 pb-16 md:pb-40 pt-20 md:px-20 rounded shadow-md m-7 flex flex-col justify-center items-center">
                <div className="text-2xsl mb-5 h-14 w-44 md:w-64 overflow-y-auto bg-slate-900 text-white flex items-center justify-center">{result}</div>
                <div className="grid grid-cols-4 gap-2 h-64 w-44 md:w-64">
                <button className={btnStyles.button2} onClick={handlePercentage}>%</button>  
                <button className={btnStyles.button2} onClick={clearResult}>AC</button>
                <button className={btnStyles.button2} onClick={clearResult}>C</button>  
                <button className={btnStyles.button2} onClick={deleteNum}>DEL</button>

                <button className={btnStyles.button2} onClick={handleSquare}>x²</button>
                <button className={btnStyles.button2} onClick={handleSqareRoot}>√</button>
                <button className={btnStyles.button2} onClick={positiveOrNegative}>+/-</button>
                <button className={btnStyles.button2} onClick={() => handleClick('/')}>÷</button>

                <button className={btnStyles.button} onClick={() => handleClick('7')}>7</button>
                <button className={btnStyles.button} onClick={() => handleClick('8')}>8</button>
                <button className={btnStyles.button} onClick={() => handleClick('9')}>9</button>
                <button className={btnStyles.button2} onClick={() => handleClick('*')}>*</button>

                <button className={btnStyles.button} onClick={() => handleClick('4')}>4</button>
                <button className={btnStyles.button} onClick={() => handleClick('5')}>5</button>
                <button className={btnStyles.button} onClick={() => handleClick('6')}>6</button>
                <button className={btnStyles.button2} onClick={() => handleClick('-')}>-</button>

                <button className={btnStyles.button} onClick={() => handleClick('1')}>1</button>
                <button className={btnStyles.button} onClick={() => handleClick('2')}>2</button>
                <button className={btnStyles.button} onClick={() => handleClick('3')}>3</button>
                <button className={btnStyles.button2} onClick={() => handleClick('+')}>+</button>

                <button className={btnStyles.button} onClick={() => handleClick('00')}>00</button>
                <button className={btnStyles.button} onClick={() => handleClick('0')}>0</button>
                <button className={btnStyles.button} onClick={() => handleClick('.')}>.</button>
                <button onClick={calculateResult} className="text-sm md:text-xl bg-gray-800 text-white rounded-md flex items-center justify-center">=</button>
                {/* <p>{Math.floor(Math.random() * 100)}</p> */}
                </div>
            </div>

            <div className="w-44">
              <div className='overflow-y-auto mt-7 h-64 w-screen flex justify-center md:justify-start md:w-44 bg-emerald-700 border border-gray-300 rounded-md shadow-md'>
                
                <ul className='pl-3'>
                  {reversedList.map((item, index) => {
                    const parts = item.split('=');
                    const operation = parts[0]; 
                    const result = '= ' + parts[1];    
                    
                    return (
                      <li className='text-white mt-2' key={index}>
                        <div className="flex flex-col justify-between">
                          <span>{operation}</span>
                          <span>{result}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

      </div>
    
  );
}

export default Home;