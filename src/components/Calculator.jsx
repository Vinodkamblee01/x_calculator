import react from 'react' ; 
import { useState  } from 'react';

import styles from "../components/Calculator.module.css"

 const  Calculator = () =>{
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);

  const handleButtonClick = (value) => {

    if (expression === "" && ['+', '-', '*', '/'].includes(value)) {
      
      return;
    }

    if (
      (value === '+' || value === '-' || value === '*' || value === '/') &&
      (expression === "" || 
       expression[expression.length - 1] === '+' || 
       expression[expression.length - 1] === '-' || 
       expression[expression.length - 1] === '*' || 
       expression[expression.length - 1] === '/')
    ) {
      setExpression((prev) => prev.slice(0, prev.length - 1) + value);
      return; 

    }

    setExpression((prev) => prev + value);  
  };

  const handleClear = () => {
    setExpression("");  
    setResult(null);     
  };



  const handleEvaluate = () => { 

    const sanitizedExpression = expression.replace(/\s+/g, "");


    if (!sanitizedExpression || sanitizedExpression.endsWith('+') || sanitizedExpression.endsWith('-') || sanitizedExpression.endsWith('*') || sanitizedExpression.endsWith('/')) {
      setResult("Error");
      return;
    }

    if (sanitizedExpression.includes('/')) {
      const parts = sanitizedExpression.split('/');
      const denominator = parts[1]; 
      const numerator = parts[0];
  
      if (numerator === '0' && (denominator === '0' || denominator === '-0')) {
        setResult('NaN');
        return;
      }

      if (denominator === '0' || denominator === '-0') {
        setResult( denominator === '-0' ? '-Infinity' :'Infinity');
        return;
      }


    }

    try {  
      
      const evaluatedResult = eval(sanitizedExpression);  
      if (evaluatedResult === Infinity || isNaN(evaluatedResult)) {
        setResult("NaN");  
      } else {
        setResult(evaluatedResult);  
      }
    } catch (error) {
      setResult("Error");  
    }

  };

  const handleDeletekey = (value)=>{
    if(value.key === 'Backspace' ){
      setExpression((prev) => prev.slice(0, -1));
    }
  }

  return (
    <div className={styles['calculator-grid']}>
      <h3   className={styles.h3}>React Calculator</h3> 
      <input type="text" className={styles.input} value={expression} readOnly placeholder="0" onKeyDown={handleDeletekey} /> 
      <div className={styles.output}>
        <span>{result !== null ? result : "0"}</span>
      </div>
         <div  className={styles.buttonContainer}>
              
         <button className={styles.buttons} onClick={() => handleButtonClick('7')}>7</button>
        <button className={styles.buttons}  onClick={() => handleButtonClick('8')} >8</button>
        <button className={styles.buttons} onClick={() => handleButtonClick('9')}>9</button>
        <button className={styles.buttons} onClick={() => handleButtonClick('+')}>+</button>
        <button className={styles.buttons} onClick={() => handleButtonClick('4')}>4</button>
        <button className={styles.buttons} onClick={() => handleButtonClick('5')}>5</button>
        <button className={styles.buttons} onClick={() => handleButtonClick('6')}>6</button>
        <button className={styles.buttons} onClick={() => handleButtonClick('-')}>-</button>
        <button className={styles.buttons} onClick={() => handleButtonClick('1')}>1</button>
        <button className={styles.buttons} onClick={() => handleButtonClick('2')}>2</button>
        <button className={styles.buttons} onClick={() => handleButtonClick('3')}>3</button>
        <button className={styles.buttons} onClick={() => handleButtonClick('*')}>*</button>
        <button className={styles.buttons} onClick={handleClear} >C</button>
        <button className={styles.buttons} onClick={() => handleButtonClick('0')}>0</button>
        <button className={styles.buttons} onClick={handleEvaluate}>=</button>
        <button className={styles.buttons} onClick={() => handleButtonClick('/')}>/</button>
         </div>
    </div>
  );
 };

 export default Calculator ;