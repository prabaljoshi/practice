class Calculator 
{
    constructor() {
        this.display = document.getElementById('display');
        this.history = [];
        this.maxLength = 30; 
        this.lastResult = '0';
        this.clearDisplay();
    }

    clearDisplay() {
        this.display.innerText = '0';
        this.currentOperation = '';
    }

    deleteLast() {
        const current = this.display.innerText;
        if (current.length <= 1) {
            this.display.innerText = '0';
        } else {
            this.display.innerText = current.slice(0, -1);
        }
    }

    appendNumber(number) {
        const current = this.display.innerText;
        
        // Prevent multiple decimal points
        if (number === '.' && current.includes('.')) return;
        
        // Prevent exceeding max length
        if (current.length >= this.maxLength) return;

        // Replace initial zero unless it's a decimal
        if (current === '0' && number !== '.') {
            this.display.innerText = number;
        } else {
            this.display.innerText += number;
        }
    }

    appendOperator(operator) {
        const current = this.display.innerText;
        const lastChar = current[current.length - 1];

        // Prevent multiple operators in sequence
        if (['+', '-', '×', '÷'].includes(lastChar)) {
            this.display.innerText = current.slice(0, -1) + operator;
        } else {
            // Prevent exceeding max length
            if (current.length >= this.maxLength) return;
            this.display.innerText += operator;
        }
    }

    calculate() {
        try {
            let expression = this.display.innerText
                .replace(/×/g, '*')
                .replace(/÷/g, '/');

            // Validate expression
            if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
                throw new Error('Invalid characters');
            }

            // Calculate result
            const result = Number(eval(expression).toFixed(8));

            // Handle special cases
            if (!isFinite(result)) {
                throw new Error('Division by zero');
            }

            // Store in history
            this.history.push({
                expression: this.display.innerText,
                result: result
            });

            // Update display
            this.lastResult = result.toString();
            this.display.innerText = this.lastResult;

        } catch (error) {
            this.display.innerText = 'Error';
            setTimeout(() => this.clearDisplay(), 1500);
        }
    }

    // Additional useful features
    toggleSign() {
        const current = this.display.innerText;
        if (current !== '0') {
            this.display.innerText = current.startsWith('-') ? 
                current.slice(1) : '-' + current;
        }
    }

    percentage() {
        const current = parseFloat(this.display.innerText);
        this.display.innerText = (current / 100).toString();
    }

    // Get calculation history
    getHistory() {
        return this.history;
    }

    // Memory functions
    memoryStore() {
        localStorage.setItem('calculatorMemory', this.display.innerText);
    }

    memoryRecall() {
        const memoryValue = localStorage.getItem('calculatorMemory');
        if (memoryValue) {
            this.display.innerText = memoryValue;
        }
    }

    memoryClear() {
        localStorage.removeItem('calculatorMemory');
    }
}

// Initialize calculator
const calculator = new Calculator();

// Event listeners for keyboard input
document.addEventListener('keydown', (event) => {
    const key = event.key;

    // Number keys (0-9) and decimal point
    if (/^[0-9.]$/.test(key)) {
        calculator.appendNumber(key);
    }
    // Operators
    else if (['+', '-', '*', '/', 'x'].includes(key)) {
        const operator = key === '*' || key === 'x' ? '×' : 
                        key === '/' ? '÷' : key;
        calculator.appendOperator(operator);
    }
    // Enter or = for calculation
    else if (key === 'Enter' || key === '=') {
        calculator.calculate();
    }
    // Backspace for delete
    else if (key === 'Backspace') {
        calculator.deleteLast();
    }
    // Escape for clear
    else if (key === 'Escape') {
        calculator.clearDisplay();
    }
}
);
