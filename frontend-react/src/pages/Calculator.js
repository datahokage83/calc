

import React, { useState } from 'react';
import './Calculator.css';

export default function Calculator() {
    const [calc, setCalc] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);

    const ops = ['/', '*', '+', '-'];

    const updateCalc = (value) => {
        if (
            (ops.includes(value) && calc === '') ||
            (ops.includes(value) && ops.includes(calc.slice(-1)))
        ) {
            return;
        }

        setCalc((prevCalc) => prevCalc + value);

        if (!ops.includes(value)) {
            try {
                setResult(eval(calc + value).toString());
            } catch (error) {
                setResult('Error');
            }
        }

    };

    const createDigits = () => {
        const digits = [];

        for (let i = 1; i < 10; i++) {
            digits.push(
                <button key={i} onClick={() => updateCalc(i.toString())}>
                    {i}
                </button>
            );
        }

        return digits;
    };


    const calculate = () => {
        try {
            const newResult = eval(calc).toString();
            setCalc(newResult);
            setResult('');
            setHistory((prevHistory) => [...prevHistory, calc + '=' + newResult]);
        } catch (error) {
            setResult('Error');
        }

    };

    const deleteLast = () => {
        if (calc === '') {
            // If calc is empty, reset both calc and result
            setCalc('');
            setResult('');
        } else {
            // Otherwise, remove the last character from calc
            const value = calc.slice(0, -1);
            setCalc(value);
        }

    };

    return (
        <div className="calculator">
            <div className="display">
                {result ? <span>{result}</span> : calc || '0'}
            </div>
            <div className="operators">
            {ops.map((op) => (
                    <button key={op} onClick={() => updateCalc(op)}>
                        {op}
                    </button>
                ))}
                <button onClick={deleteLast}>DEL</button>

            </div>
            <div className="digits">
            {createDigits()}
                <button onClick={() => updateCalc('0')}>0</button>
                <button onClick={() => updateCalc('.')}>.</button>
                <button onClick={calculate}>=</button>

            </div>
            <div className="history">
                <h3 className='h3'>History</h3>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

            </div>
        </div>
    );
}
