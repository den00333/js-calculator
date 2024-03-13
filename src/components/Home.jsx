import {useState} from 'react';
import btnStyles from './styles-folder/CalBtn.module.css'
const Home = () => {

    const [result, setResult] = useState('0');
    const [computationList, setComputation] = useState([]);
    const [clearFLag, setClearFlag]= useState(false);  
    const [hasDecimal, setHasDecimal] = useState(false);

  const handleClick = (value) => {

    
    // nagpapalit ng operation, no to spamming operation
    const isPreviousInputNotOperation = !['+', '-', '*', '/'].includes(result.slice(-1));
    if (!isPreviousInputNotOperation && ['+', '-', '*', '/'].includes(value)) {
      const resultWithoutLast = result.slice(0, -1);
      setResult(resultWithoutLast + value);
      return;
    }
    // prevent spamming zero
    if(result == '0'){
      if(value == '-' || value == '+' || value == '/' || value == '*'|| value == '.'){
        setResult(result + value);
        setClearFlag(false);
        
      }else{
        setResult(value);
      }
    }else{
      if(clearFLag){
        setClearFlag(false);
        setResult(result);
        try{
          // after calculating it will be deleted if I click a number else if it is operations/symbols it will just continue
          // concatenating the value to the results 
          let output = eval(value).toString();
          clearResult();
          setResult(output);
        }catch{
          setResult(result + value);
        }
      }else{
        setResult(result + value);
        // if (value == '.') {
        //   if (!hasDecimal) {
        //     setHasDecimal(true);
        //     setResult(result + value);
        //   }
        // } else {
        //   setResult(result + value);
        //   if (value == '+' || value == '-' || value == '*' || value == '/') {
        //     setHasDecimal(false);
        //   }
        // }
      }
    }
  };

  const clearResult = () => {
    setResult('0');
    // setHasDecimal(true);
  };

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

          <div className="bg-green-500 p-20 rounded shadow-md m-10">
                <div className="text-2xsl mb-5 h-14 w-64 overflow-y-auto bg-slate-900 text-white flex items-center justify-center">{result}</div>
                <div className="grid grid-cols-4 gap-2 h-64 w-64">
                <button className={btnStyles.button} onClick={() => handleClick('7')}>7</button>
                <button className={btnStyles.button} onClick={() => handleClick('8')}>8</button>
                <button className={btnStyles.button} onClick={() => handleClick('9')}>9</button>
                <button className={btnStyles.button} onClick={() => handleClick('/')}>/</button>
                <button className={btnStyles.button} onClick={() => handleClick('4')}>4</button>
                <button className={btnStyles.button} onClick={() => handleClick('5')}>5</button>
                <button className={btnStyles.button} onClick={() => handleClick('6')}>6</button>
                <button className={btnStyles.button} onClick={() => handleClick('*')}>*</button>
                <button className={btnStyles.button} onClick={() => handleClick('1')}>1</button>
                <button className={btnStyles.button} onClick={() => handleClick('2')}>2</button>
                <button className={btnStyles.button} onClick={() => handleClick('3')}>3</button>
                <button className={btnStyles.button} onClick={() => handleClick('-')}>-</button>
                <button className={btnStyles.button} onClick={() => handleClick('0')}>0</button>
                <button className={btnStyles.button} onClick={() => handleClick('.')}>.</button>
                <button className={btnStyles.button} onClick={clearResult}>C</button>
                <button className={btnStyles.button} onClick={() => handleClick('+')}>+</button>
                <button onClick={calculateResult} className="col-span-4 bg-gray-800 text-white rounded-md p-4">=</button>
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