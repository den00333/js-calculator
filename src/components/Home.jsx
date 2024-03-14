import {useState} from 'react';
import btnStyles from './styles-folder/CalBtn.module.css'
const Home = () => {

    const [result, setResult] = useState('0');
    const [computationList, setComputation] = useState([]);
    const [clearFLag, setClearFlag]= useState(false);
    const [hasDecimal, setHasDecimal] = useState(false);
    const [hasNegative, setNegative] = useState(false);


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
        localFlag = true;
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
    
    let [leftOverNums, numWithoutOperation] = traverseNumUntilYouHitOperation();
    // console.log(eval('(-72)-(-2)'));
    let reverseNegativeStr = numWithoutOperation.split('').reverse().join('');
    let negativeReversed = '';
    let reverseLeftOver = '';
    if(hasNegative){
      negativeReversed += reverseNegativeStr;
      reverseLeftOver = leftOverNums.slice(1).split('').reverse().join('');
      setNegative(false);
    }else{
      negativeReversed = '-' + reverseNegativeStr;
      reverseLeftOver = leftOverNums.split('').reverse().join('');
      setNegative(true);
    }
    
    let wholeNewStr = reverseLeftOver + negativeReversed;
    setResult(wholeNewStr);
  }

  const handlePercentage = () => {
 
    let [reverserdLeftOverNums, reverserdNumWithoutOperation] = traverseNumUntilYouHitOperation();
    let leftOverNums = reverserdLeftOverNums.split('').reverse().join('');
    let numWithoutOperation = reverserdNumWithoutOperation.split('').reverse().join('');

    if(leftOverNums == ''){
      setResult((numWithoutOperation/100).toString());
    }else if(numWithoutOperation == ''){
      setResult((leftOverNums.slice(0, -1)/100).toString());
    }else{
      setResult(leftOverNums + (numWithoutOperation/100).toString());
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
    // setHasDecimal(true);
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

  const calculateResult = () => {
    try {
      let outcome = eval(result).toString();  
      setResult(outcome);
      setComputation([...computationList, `${result}=${outcome}`]);
      setClearFlag(true);
    } catch (error) {
      setResult('Error');
      setClearFlag(true);
    }
  };

  let reversedList = [...computationList].reverse();

  return (
    <div className=' flex justify-center'>

          <div className="bg-green-500 pb-40 pt-20 px-20 rounded shadow-md m-7">
                <div className="text-2xsl mb-5 h-14 w-64 overflow-y-auto bg-slate-900 text-white flex items-center justify-center">{result}</div>
                <div className="grid grid-cols-4 gap-2 h-64 w-64">
                <button className={btnStyles.button2} onClick={handlePercentage}>%</button>  
                <button className={btnStyles.button2} onClick={clearResult}>AC</button>
                <button className={btnStyles.button2} onClick={clearResult}>C</button>  
                <button className={btnStyles.button2} onClick={deleteNum}>DEL</button>

                <button className={btnStyles.button2} >x²</button>
                <button className={btnStyles.button2} >√</button>
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
                <button onClick={calculateResult} className="text-xl bg-gray-800 text-white rounded-md p-4">=</button>
                {/* <p>{Math.floor(Math.random() * 100)}</p> */}
                </div>
            </div>

            <div className=" bg-gray-100">
              <div className='overflow-y-auto mt-4 h-48 bg-red-400 border border-gray-300'>
                <ul>
                    {
                        reversedList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
              </div>
            </div>

      </div>
    
  );
}

export default Home;